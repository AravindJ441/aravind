import {
  Component,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog,} from '@angular/material/dialog';
import { AddApiStoreSettingComponent } from "./add-setting/add-setting.component";
import { ApiService } from "../../../services/API.service";
import { NotificationsService } from "angular2-notifications";
import { PLATFORM_URL_SEGMENT, getDisplayDate, INVALID_TOKEN } from "../../../app.constants";
import { Store } from "@ngrx/store";
import { InvalidSessionAction } from "../../../app.actions";

export interface iStoreSettings {
  name?: string;
  page_id?: string;
  pageAccessToken?: string;
  is_active?: boolean;
  created_at?: string;
}

@Component({
  selector: "apple-store",
  templateUrl: "./api-store.component.html",
  styleUrls: ["./api-store.component.scss"],
})

export class AppleStoreComponent implements OnInit {
  platform: string = PLATFORM_URL_SEGMENT.iStore;
  dataList: iStoreSettings[] = [];
  displayedColumns: string[] = ['is_active', 'name', 'app_id', 'created_at', 'actions'];
  dataSource = new MatTableDataSource<iStoreSettings>(this.dataList);
  displayDate = getDisplayDate;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private notificationService: NotificationsService,
    private store: Store<any>,
  ) {}


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchSettings();
  }

  fetchSettings() {
    this.api.fetchSettings(this.platform).subscribe((response: any) => {
      if(response.success) {
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

  openSettingModal(data: any = null): void {
    const dialogRef = this.dialog.open(AddApiStoreSettingComponent, {
      width: '500px',
      data: data
    });

    dialogRef.afterClosed().subscribe(status => {
      if(status) {
        this.fetchSettings();
      }
    });
  }

  toggleStatus(pageId) {
    this.api.toggleSettingStatus(this.platform, pageId).subscribe((response: any) => {
      if(response.success) {
        this.notificationService.success("Page status updated successfully.");
        this.fetchSettings();
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
}