import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'info-modal',
  styleUrls: ['./info-modal.component.scss'],
  templateUrl: './info-modal.component.html',
})
export class InfoModalComponent {
  
  constructor(
    public dialogRef: MatDialogRef<InfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}