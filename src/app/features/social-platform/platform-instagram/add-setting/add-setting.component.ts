import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../../../services/API.service";
import { NotificationsService } from "angular2-notifications";
import { PLATFORM_URL_SEGMENT, INVALID_TOKEN } from "../../../../app.constants";
import { Store } from "@ngrx/store";
import { InvalidSessionAction } from "../../../../app.actions";

@Component({
  selector: 'add-instagram-setting',
  styleUrls: ['./add-setting.component.scss'],
  templateUrl: './add-setting.component.html',
})
export class AddInstagramSettingComponent {
  instaSettingForm: FormGroup;
  platform: string = PLATFORM_URL_SEGMENT.insta;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private notificationService: NotificationsService,
    public dialogRef: MatDialogRef<AddInstagramSettingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<any>,
  ) { 
    this.instaSettingForm = this.fb.group({
      name: ['', Validators.required ],
      page_id: ['', Validators.required ],
      accesstoken: ['', Validators.required ],
      auto_reply: [''],
    });
  }

  ngOnInit() {
    if(this.data) {
      this.instaSettingForm.patchValue({
        name: this.data.name,
        page_id: this.data.page_id,
        accesstoken: this.data.accessToken,
        auto_reply: this.data.auto_reply,
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  doSubmit() {
    const formData = this.instaSettingForm.value;
    let request$;
    if(this.data) {
      request$ = this.api.updateSetting(this.platform, this.data._id, formData);
    } else {
      request$ = this.api.addSetting(this.platform, formData);
    }
    request$.subscribe((response:any) => {
      if(response.success) {
        const msg = (this.data) ? "Setting updated successfully." : "Setting added successfully.";
        this.notificationService.success(msg);
        this.dialogRef.close(true);
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