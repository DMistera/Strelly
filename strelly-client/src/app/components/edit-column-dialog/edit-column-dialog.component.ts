import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Column } from '@app/models';

@Component({
  selector: 'app-edit-column-dialog',
  templateUrl: './edit-column-dialog.component.html',
  styleUrls: ['./edit-column-dialog.component.scss']
})
export class EditColumnDialogComponent{
  form!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public column: Column, public dialogRef: MatDialogRef<EditColumnDialogComponent>, private formBuilder: FormBuilder){
    this.resetData();
  }

  resetData(){
    this.form = this.formBuilder.group({
      name: [this.column.name, Validators.required]
    });
  }

  closeDialog() {
    if (this.form.valid) {
      this.column.name = this.form.controls['name'].value;
      this.dialogRef.close(this.column);
    }
  }
}
