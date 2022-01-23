import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Column } from '@app/models';

@Component({
  selector: 'app-delete-column-dialog',
  templateUrl: './delete-column-dialog.component.html',
  styleUrls: ['./delete-column-dialog.component.scss']
})
export class DeleteColumnDialogComponent{
  constructor(@Inject(MAT_DIALOG_DATA) public column: Column, public dialogRef: MatDialogRef<DeleteColumnDialogComponent>){}

  closeDialog() {
    this.dialogRef.close(this.column);
  }
}
