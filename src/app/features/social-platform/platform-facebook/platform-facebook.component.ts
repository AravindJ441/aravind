import {
  Component,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog,} from '@angular/material/dialog';
import { AddFacebookSettingComponent } from "./add-setting/add-setting.component";
import { ApiService } from "../../../services/API.service";
import { NotificationsService } from "angular2-notifications";
import { PLATFORM_URL_SEGMENT, getDisplayDate, INVALID_TOKEN } from "../../../app.constants";
import { InfoModalComponent } from "../../info-modal/info-modal.component";
import { Store } from "@ngrx/store";
import { InvalidSessionAction } from "../../../app.actions";

export interface FbSettings {
  name?: string;
  page_id?: string;
  pageAccessToken?: string;
  is_active?: boolean;
  created_at?: string;
}

@Component({
  selector: "platform-facebook",
  templateUrl: "./platform-facebook.component.html",
  styleUrls: ["./platform-facebook.component.scss"],
})

export class PlatformFacebookComponent implements OnInit {
  platform: string = PLATFORM_URL_SEGMENT.fb;
  dataList: FbSettings[] = [];
  displayedColumns: string[] = ['is_active', 'name', 'page_id', 'pageAccessToken', 'created_at', 'auto_reply', 'actions'];
  dataSource = new MatTableDataSource<FbSettings>(this.dataList);
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
    const dialogRef = this.dialog.open(AddFacebookSettingComponent, {
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

  openInfoModal(accessToken) {
    this.dialog.open(InfoModalComponent, {
      width: '500px',
      data: {
        displayData: accessToken,
        title: 'Page Access Token'
      }
    });
  }
}