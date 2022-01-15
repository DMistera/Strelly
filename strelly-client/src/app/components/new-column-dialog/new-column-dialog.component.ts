import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-column-dialog',
  templateUrl: './new-column-dialog.component.html',
  styleUrls: ['./new-column-dialog.component.scss']
})
export class NewColumnDialogComponent {
  nameFormControl = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<NewColumnDialogComponent>) { }

  closeDialog() {
    if (this.nameFormControl.valid) {
      this.dialogRef.close(this.nameFormControl.value);
    }
  }
}
