import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ADMIN_SUGGESTION } from "../../../app.constants";
@Component({
  selector: 'admin-suggestion',
  styleUrls: ['./admin-suggestion.component.scss'],
  templateUrl: './admin-suggestion.component.html',
})
export class AdminSuggestionComponent {
  suggestionList = ADMIN_SUGGESTION;
  constructor(
    public dialogRef: MatDialogRef<AdminSuggestionComponent>,
    @Inject(MAT_DIALOG_DATA) public systemSuggestion: string,
  ) { console.log(this.systemSuggestion); }

  onCloseClicked(): void {
    this.dialogRef.close({action: false});
  }

  onSuggestionClicked(suggestion): void {
    this.dialogRef.close({action: true, output: suggestion});
  }

}