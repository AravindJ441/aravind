import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../../../services/API.service";
import { NotificationsService } from "angular2-notifications";
import { PLATFORM_URL_SEGMENT, INVALID_TOKEN } from "../../../../app.constants";
import { Store } from "@ngrx/store";
import { InvalidSessionAction } from "../../../../app.actions";

@Component({
  selector: 'add-facebook-setting',
  styleUrls: ['./add-setting.component.scss'],
  templateUrl: './add-setting.component.html',
})
export class AddTwitterSettingComponent implements OnInit {
  twitterSettingForm: FormGroup;
  platform: string = PLATFORM_URL_SEGMENT.twitter;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private notificationService: NotificationsService,
    public dialogRef: MatDialogRef<AddTwitterSettingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<any>,
  ) { 
    this.twitterSettingForm = this.fb.group({
      term: ['', Validators.required ],
      auto_reply: [''],
    });
  }

  ngOnInit() {
    if(this.data) {
      this.twitterSettingForm.patchValue({
        term: this.data.term,
        auto_reply: this.data.auto_reply,
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  doSubmit() {
    const formData = this.twitterSettingForm.value;
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