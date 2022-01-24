import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.scss']
})
export class NewTaskDialogComponent{
  form = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });

  constructor(public dialogRef: MatDialogRef<NewTaskDialogComponent>, private formBuilder: FormBuilder) {}

  closeDialog() {
    if (this.form.valid) {
      this.dialogRef.close({name: this.form.controls['name'].value, description: this.form.controls['description'].value});
    }
  }
}
