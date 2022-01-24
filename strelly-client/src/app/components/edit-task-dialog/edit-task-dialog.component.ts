import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Task} from '@app/models';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss']
})
export class EditTaskDialogComponent{
  form!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public task: Task, public dialogRef: MatDialogRef<EditTaskDialogComponent>, private formBuilder: FormBuilder){
    this.resetData();
  }

  resetData(){
    this.form = this.formBuilder.group({
      name: [this.task.name, Validators.required],
      description: [this.task.description, Validators.required]
    });
  }

  closeDialog() {
    if (this.form.valid) {
      this.task.name = this.form.controls['name'].value;
      this.task.description = this.form.controls['description'].value
      this.dialogRef.close(this.task);
    }
  }
}
