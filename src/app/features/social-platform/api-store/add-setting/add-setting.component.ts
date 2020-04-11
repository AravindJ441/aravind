import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../../../services/API.service";
import { NotificationsService } from "angular2-notifications";
import { PLATFORM_URL_SEGMENT, INVALID_TOKEN, COUNTRY_LIST } from "../../../../app.constants";
import { Store } from "@ngrx/store";
import { InvalidSessionAction } from "../../../../app.actions";
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';

@Component({
  selector: 'add-apple-store-setting',
  styleUrls: ['./add-setting.component.scss'],
  templateUrl: './add-setting.component.html',
})
export class AddApiStoreSettingComponent implements OnInit {
  iStoreForm: FormGroup;
  platform: string = PLATFORM_URL_SEGMENT.iStore;
  countryList = COUNTRY_LIST;
  selectedOptions = [];
  selected = this.selectedOptions;
  showError = false;
  errorMessage = 'Select atleast one country';

  @ViewChild(SelectAutocompleteComponent) multiSelect: SelectAutocompleteComponent;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private notificationService: NotificationsService,
    public dialogRef: MatDialogRef<AddApiStoreSettingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<any>,
  ) { 
    this.iStoreForm = this.fb.group({
      name: ['', Validators.required ],
      app_id: ['', Validators.required ],
    });
  }

  ngOnInit() {
    if(this.data) {
      this.iStoreForm.patchValue({
        name: this.data.name,
        app_id: this.data.app_id,
      });
      this.selectedOptions = this.data.country_code.split(",");
      this.selected = this.selectedOptions;
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  doSubmit() {
    /* this.showError = (this.selected.length) ? false : true;
    if(this.showError) {
      return;
    } */
    const selectedCountry = this.selected.join(',');
    const formData = {
      ...this.iStoreForm.value,
      country_code: selectedCountry,
    }
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

  getSelectedOptions(selected) {
    this.showError = (selected.length) ? false : true;
    this.selected = selected;
    this.selectedOptions = selected;
  }
}