import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../../../services/API.service";
import { NotificationsService } from "angular2-notifications";
import { PLATFORM_URL_SEGMENT, INVALID_TOKEN } from "../../../../app.constants";
import { Store } from "@ngrx/store";
import { InvalidSessionAction } from "../../../../app.actions";

@Component({
  selector: 'add-google-store-setting',
  styleUrls: ['./add-setting.component.scss'],
  templateUrl: './add-setting.component.html',
})
export class AddPlayStoreSettingComponent implements OnInit{
  pStoreForm: FormGroup;
  platform: string = PLATFORM_URL_SEGMENT.pStore;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private notificationService: NotificationsService,
    public dialogRef: MatDialogRef<AddPlayStoreSettingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<any>,
  ) { 
    this.pStoreForm = this.fb.group({
      name: ['', Validators.required ],
      packagename: ['', Validators.required ],
      client_email: ['', Validators.required ],
      private_key: ['', Validators.required ],
      auto_reply: [''],
    });
  }

  ngOnInit() {
    if(this.data) {
      this.pStoreForm.patchValue({
        name: this.data.name,
        packagename: this.data.packagename,
        client_email: this.data.client_email,
        private_key: this.data.private_key,
        auto_reply: this.data.auto_reply,
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  doSubmit() {
    const formData = this.pStoreForm.value;
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