import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'confirm-modal',
  styleUrls: ['./confirmation-modal.component.scss'],
  templateUrl: './confirmation-modal.component.html',
})
export class ConfirmModalComponent {
  
  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClicked(): void {
    this.dialogRef.close(false);
  }

  onYesClicked(): void {
    this.dialogRef.close(true);
  }

}