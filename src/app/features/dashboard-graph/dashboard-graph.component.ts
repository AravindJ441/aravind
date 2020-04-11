import {
  Component,
  OnInit
} from "@angular/core";
import { ApiService } from "../../services/API.service";
import { NotificationsService } from "angular2-notifications";
import { FormGroup, FormBuilder } from "@angular/forms";
import { PLATFORM_DISP_NAME, PLATFORM_NAME_REV_MAP, MY_DATE_FORMATS, ADMIN_SUGGESTION } from "../../app.constants";
import { ScriptLoaderService } from "angular-google-charts"
import { Router } from '@angular/router';
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import * as moment from "moment";
declare let google: any;
import { Store } from "@ngrx/store";
import { InvalidSessionAction } from "../../app.actions";
import { INVALID_TOKEN } from "../../app.constants";
import { MOCK_GRAPH_DATA } from "./mock-data";
import { forkJoin } from 'rxjs';

@Component({
  selector: "dashboard-graph",
  templateUrl: "./dashboard-graph.component.html",
  styleUrls: ["./dashboard-graph.component.scss"],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})

export class DashboardGraphComponent implements OnInit {
  platformDispName = PLATFORM_DISP_NAME;
  platformNameRevMap = PLATFORM_NAME_REV_MAP;
  filterForm: FormGroup;
  maxDate = moment();
  maxStartDate = moment();
  minEndDate = null;
  constructor(
    private api: ApiService,
    private notificationService: NotificationsService,
    private _fb: FormBuilder,
    private loaderService: ScriptLoaderService,
    private router: Router,
    private store: Store<any>,
  ) {
    this.filterForm = this._fb.group({
      fromDate: [''],
      toDate: [''],
    });
  }

  ngOnInit() {
    this.fetchPlatformGraphData();
    this.fetchGroupData();
  }

  fetchPlatformGraphData() {
    const searchQuery = this.getSearchQuery();
    this.api.dashboardGraphData(searchQuery).subscribe((response: any) => {
      if(response.success) {
        console.log(response);
        this.renderPlatformReviewGraph(response.data);
        this.renderSuggestionReviewGraph(response.data);
      } else {
        if(response.error === INVALID_TOKEN) {
          return this.store.dispatch(new InvalidSessionAction());
        }
        this.notificationService.error(response.error);
      }
    }, error => {
      this.notificationService.error(error.error.error);
    });
  }

  renderPlatformReviewGraph(data) {
    const graphWidth = (<any>document.getElementById("platformPieChart")).offsetWidth;
    const graphHeight = (<any>document.getElementById("platformPieChart")).offsetHeight;
    const options = {
      title: "Platform wise Review Grouping",
      width: graphWidth || 600,
      height: graphHeight || 550,
      legend: { position: 'right' },
      pieSliceText: 'value',
      tooltip: { isHtml: true },
      colors: ['#00E972', '#1AA9F4', '#1C4B95', '#53A8E7', '#C7255E']
    };

    //data = MOCK_GRAPH_DATA;
    let graphData = {
      'PLAYSTORE': 0,
      'APPSTORE': 0,
      'FACEBOOK': 0,
      'TWITTER': 0,
      'INSTAGRAM': 0,
    };

    data.forEach(platform => {
      graphData[platform.source] = platform.total;
    });

    this.loaderService.onReady.subscribe(() => {
      this.loaderService.loadChartPackages(['corechart']).subscribe(() => {
        let chartData = new google.visualization.DataTable();
        chartData.addColumn('string', 'Platform');
        chartData.addColumn('number', 'Reviews');
        chartData.addColumn({type: 'string', role: 'tooltip', 'p': {'html': true}});

        Object.keys(graphData).forEach(platform => {
          let platformConf = data.filter(datum => datum.source == platform);
          chartData.addRow([
            this.platformDispName[platform], graphData[platform], this.createHtmlTooltip(platform, platformConf)
          ]);
        });

        /* Instantiate and draw our chart, passing in some options. */
        let chart = new google.visualization.PieChart(document.getElementById('platformPieChart'));
        google.visualization.events.addListener(chart, 'select', () => {
          this.selectHandler('platform', chart, chartData);
        });
        chart.draw(chartData, options);
      });
    });
  }

  renderSuggestionReviewGraph(data) {
    const graphWidth = (<any>document.getElementById("suggestionPieChart")).offsetWidth;
    const graphHeight = (<any>document.getElementById("suggestionPieChart")).offsetHeight;
    const options = {
      title: "Suggestion wise Review Grouping",
      width: graphWidth || 600,
      height: graphHeight || 550,
      legend: { position: 'right' },
      pieSliceText: 'value',
      tooltip: { isHtml: true },
      colors: ['#00E972', '#1AA9F4', '#1C4B95']
    };

    data = this.getSuggestionReviewData(data);
    //data = this.getSuggestionReviewData(MOCK_GRAPH_DATA);
    //console.log("data", data);
    
    this.loaderService.onReady.subscribe(() => {
      this.loaderService.loadChartPackages(['corechart']).subscribe(() => {
        let suggestionChartData = new google.visualization.DataTable();
        suggestionChartData.addColumn('string', 'Suggestion');
        suggestionChartData.addColumn('number', 'Reviews');
        suggestionChartData.addColumn({type: 'string', role: 'tooltip', 'p': {'html': true}});

        Object.keys(data).forEach(suggestion => {
          suggestionChartData.addRow([
            suggestion, data[suggestion].count, this.createSuggestionTooltip(suggestion, data[suggestion].data)
          ]);
        });

        /* Instantiate and draw our chart, passing in some options. */
        let suggestionChart = new google.visualization.PieChart(document.getElementById('suggestionPieChart'));
        google.visualization.events.addListener(suggestionChart, 'select', () => {
          this.selectHandler('suggestion', suggestionChart, suggestionChartData);
        });
        suggestionChart.draw(suggestionChartData, options);
      });
    });
  }

  getSuggestionReviewData(data) {
    let suggestionGraphData : any = {};
    data.forEach(platform => {
      platform.data.forEach(datum => {
        if(suggestionGraphData.hasOwnProperty(datum.suggestion)) {
          suggestionGraphData[datum.suggestion].count += datum.count;
          suggestionGraphData[datum.suggestion].data.push({source: datum.source, count: datum.count});
        } else {
          suggestionGraphData[datum.suggestion] = {
            count: datum.count,
            data: [{source: datum.source, count: datum.count}]
          }
        }
      });
    });
    return suggestionGraphData;
  }

  selectHandler(type: string, chart, chartData) {
    const formData = this.filterForm.value;
    let selectedItem = chart.getSelection()[0];
    let platform;
    let suggestion;
    if (selectedItem) {
      switch(type) {
        case 'platform':
          const selectedPlatform = chartData.getValue(selectedItem.row, 0);
          platform = this.platformNameRevMap[selectedPlatform].toLowerCase();
          break;
        case 'suggestion':
          const selectedSuggestion = chartData.getValue(selectedItem.row, 0);
          suggestion = selectedSuggestion.toLowerCase();
          break;
      }
      
      this.router.navigate([`dashboard/list`], {
        state: { 
          platform: platform,
          fromDate: (formData.fromDate) ? moment(formData['fromDate']._d).format("MM-DD-YYYY") : null,
          toDate: (formData.toDate) ? moment(formData['toDate']._d).format("MM-DD-YYYY") : null,
          suggestion: suggestion,
        }
      });
    }
  }

  createHtmlTooltip(platform, platformConf) {
    let detailString = '';
    if(platformConf.length) {
      platformConf = platformConf[0].data;
      platformConf.forEach(conf => {
        detailString += `<p><span>${conf.suggestion}:</span> ${conf.count}</p>`;
      });
    }
    
    return `<div style="padding:5px 5px 5px 5px;">
            <h5>${platform}</h5>
            ${detailString}
            </div>`;
  }

  createSuggestionTooltip(suggestion, data) {
    let detailString = '';
    if(data.length) {
      data.forEach(conf => {
        detailString += `<p><span>${conf.source}:</span> ${conf.count}</p>`;
      });
    }

    return `<div style="padding:5px 5px 5px 5px;">
            <h5>${suggestion}</h5>
            ${detailString}
            </div>`;
  }

  getSearchQuery() {
    const formData = this.filterForm.value;
    let searchQuery: string = '';
    Object.keys(formData).forEach(filter => {
      if(formData[filter] && formData[filter] !== '') {
        const date = moment(formData[filter]._d).format("MM-DD-YYYY");
        searchQuery += `&${filter}=${date}`;
      }
    });
    return searchQuery;
  }

  resetFilter() {
    this.filterForm.patchValue({
      fromDate: '',
      toDate: '',
    });
    this.fetchPlatformGraphData();
  }

  onDateChanged(prop, selection) {
    if(prop === "dateTo") {
      this.maxStartDate = moment.min([this.maxDate, selection]);
    } else if(prop === "dateFrom"){
      this.minEndDate = selection;
    }
  }

  fetchGroupData() {
    let searchQuery = this.getSearchQuery();
    if(searchQuery.length) searchQuery = `&${searchQuery}`;
    forkJoin([
      this.api.dashboardGraphData(`group=appstore${searchQuery}`),
      this.api.dashboardGraphData(`group=facebook${searchQuery}`),
      this.api.dashboardGraphData(`group=instagram${searchQuery}`),
      this.api.dashboardGraphData(`group=playstore${searchQuery}`),
      this.api.dashboardGraphData(`group=twitter${searchQuery}`),
    ]).subscribe(results => {
      this.renderPlatformGraph('appstore', results[0]);
      this.renderPlatformGraph('facebook', results[1]);
      this.renderPlatformGraph('instagram', results[2]);
      this.renderPlatformGraph('playstore', results[3]);
      this.renderPlatformGraph('twitter', results[4]);
    }, error => {
      console.log("error", error);
    });
  }

  renderPlatformGraph(platform, data) {
    const platformData = (data.data.length) ? data.data[0].data[0] : [];
    console.log(platformData);
    const graphWrapper = `${platform}Wrapper`;
    const graphWidth = (<any>document.getElementById(graphWrapper)).offsetWidth;
    const graphHeight = (<any>document.getElementById(graphWrapper)).offsetHeight;
    const options = {
      title: `${platform} reviews`,
      width: graphWidth || 200,
      height: graphHeight || 300,
      legend: { position: 'bottom' },
      pieSliceText: 'value',
      tooltip: { isHtml: true },
      titleTextStyle: {fontSize: 12}
    };

    this.loaderService.onReady.subscribe(() => {
      this.loaderService.loadChartPackages(['corechart']).subscribe(() => {
        let chartData = new google.visualization.DataTable();
        chartData.addColumn('string', 'App Name');
        chartData.addColumn('number', 'Reviews');
        chartData.addColumn({type: 'string', role: 'tooltip', 'p': {'html': true}});

        Object.keys(platformData).forEach(appName => {
          chartData.addRow([
            appName, platformData[appName].total, this.createPlatformTooltip(appName, platformData[appName])
          ]);
        });
        /* platformData.forEach(datum => {
          let reviews = 0;
          ADMIN_SUGGESTION.forEach(suggestion => {
            reviews += datum[suggestion] || 0; 
          });
          chartData.addRow([
            datum.app_name, reviews, this.createPlatformTooltip(datum)
          ]);
        }); */

        /* Instantiate and draw our chart, passing in some options. */
        let chart = new google.visualization.PieChart(document.getElementById(graphWrapper));
        chart.draw(chartData, options);
      });
    });
  }

  createPlatformTooltip(appName, appData) {
    let detailString = '';
    ADMIN_SUGGESTION.forEach(suggestion => {
      if(appData.hasOwnProperty(suggestion)) {
        detailString += `<p><span>${suggestion}:</span> ${appData[suggestion]}</p>`;
      }
    });
    
    return `<div style="padding:5px 5px 5px 5px;">
            <h5>${appName}</h5>
            ${detailString}
            </div>`;
  }
}