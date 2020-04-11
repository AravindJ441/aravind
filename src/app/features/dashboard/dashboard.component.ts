import {
  Component,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from "../../services/API.service";
import { NotificationsService } from "angular2-notifications";
import { getDisplayDate, PLATFORM_LIST, MY_DATE_FORMATS, INVALID_TOKEN, SUGGESTION_LIST } from "../../app.constants";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import * as moment from "moment";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from "../confirmation-modal/confirmation-modal.component";
import { AdminSuggestionComponent } from "./admin-suggestion/admin-suggestion.component";
import { Router } from '@angular/router';
import { Store } from "@ngrx/store";
import { InvalidSessionAction } from "../../app.actions";

export interface DashboardList {
  source?: string;
  comment?: string;
  autoreply?: string;
}

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})

export class DashboardComponent implements OnInit {
  dataList: DashboardList[] = [];
  displayedColumns: string[] = ['source', 'comment', 'autoreply', 'action'];
  dataSource = new MatTableDataSource<DashboardList>(this.dataList);
  totalRecords: number;
  page: number = 1;
  pageSize: number = 10;
  displayDate = getDisplayDate;
  platformList = PLATFORM_LIST;
  suggestionList = SUGGESTION_LIST;
  filterForm: FormGroup;
  suggestionModalRef;
  maxDate = moment();
  maxStartDate = moment();
  minEndDate = null;
  constructor(
    private api: ApiService,
    private notificationService: NotificationsService,
    private _fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private store: Store<any>,
  ) {
    this.filterForm = this._fb.group({
      fromDate: [''],
      toDate: [''],
      customerName: [''],
      source: [''],
      customer_comment: [''],
      suggestion: [''],
    });
    if(this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state) {
      const state = this.router.getCurrentNavigation().extras.state;
      this.filterForm.patchValue({
        source: state.platform,
        fromDate: (state.fromDate) ? moment(state.fromDate) : null,
        toDate: (state.fromDate) ? moment(state.toDate) : null,
        suggestion: state.suggestion,
      });
    }
  }

  ngOnInit() {
    this.getPageData();
  }

  getPageData(pageNumber: number = 1) {
    this.page = pageNumber;
    const searchQuery = this.getSearchQuery();
    this.api.dashboardListData(this.page, this.pageSize, searchQuery).subscribe((response: any) => {
      if(response.success) {
        //console.log(response);
        this.totalRecords = response.count;
        this.dataList = response.data;
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

  displayAppName(source, appNameString, appLinkString) {
    if(!appNameString.length) {
      return '';
    }
    if(source.toLowerCase() === 'twitter') {
      const handles = appNameString.split(",");
      const links = appLinkString.split(",");
      let returnString = '';
      handles.forEach((element, index) => {
        const nameString = `<span class="anchor app-link"><a href="${links[index]}" target="_blank">${element}</a></span>`;
        if(index == handles.length - 1) {
          returnString += nameString;
        } else {
          returnString += `${nameString}, `;
        }
      });
      return returnString;
    } else {
      return `<span class="anchor app-link"><a href="${appLinkString}" target="_blank">${appNameString}</a></span>`;
    }
  }

  getSearchQuery() {
    const formData = this.filterForm.value;
    let searchQuery: string = '';
    Object.keys(formData).forEach(filter => {
      if(formData[filter] && formData[filter] !== '') {
        if(filter == 'fromDate' || filter == 'toDate') {
          const date = moment(formData[filter]._d).format("MM-DD-YYYY");
          searchQuery += `&${filter}=${date}`;
        } else {
          searchQuery += `&${filter}=${formData[filter]}`;
        }
      }
    });
    return searchQuery;
  }

  openConfirmModal(id, suggestion): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '500px',
      data: {
        title: 'Confirm',
        displayString: `Are you sure you want to update the category to ${suggestion} ?`
      }
    });

    dialogRef.afterClosed().subscribe(status => {
      if(status) {
        this.updateSuggestion(id, suggestion);
      }
    });
  }

  openSuggestionModal(id, suggestion): void {
    this.suggestionModalRef = this.dialog.open(AdminSuggestionComponent, {
      width: '500px',
      data: suggestion
    });

    this.suggestionModalRef.afterClosed().subscribe((resp: any) => {
      if(resp.action) {
        this.openConfirmModal(id, resp.output);
      }
    });
  }

  resetFilter() {
    this.filterForm.patchValue({
      fromDate: '',
      toDate: '',
      customerName: '',
      source: '',
      customer_comment: '',
      suggestion: '',
    });
    this.getPageData();
  }

  updateSuggestion(id, suggestion) {
    this.api.updateAdminRecommendation(id, suggestion).subscribe((response: any) => {
      console.log(response);
      if(response.success) {
        this.notificationService.success('Category updated successfully!');
        this.getPageData(this.page);
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

  onDateChanged(prop, selection) {
    if(prop === "dateTo") {
      this.maxStartDate = moment.min([this.maxDate, selection]);
    } else if(prop === "dateFrom"){
      this.minEndDate = selection;
    }
  }
}