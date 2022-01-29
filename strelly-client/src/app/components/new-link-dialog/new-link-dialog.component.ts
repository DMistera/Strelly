import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Link, Task} from '@app/models';
import { TasksService } from '@app/services/tasks.service';

@Component({
  selector: 'app-new-link-dialog',
  templateUrl: './new-link-dialog.component.html',
  styleUrls: ['./new-link-dialog.component.scss']
})
export class NewLinkDialogComponent{
  form: FormGroup;
  link: Link;

  tasks = [] as any;

  types = [{id:0, name:"blocks"}, {id:1, name:"relate on"}];

  isDirectionFrom: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public task: Task, public dialogRef: MatDialogRef<NewLinkDialogComponent>, private formBuilder: FormBuilder, private tasksService: TasksService){
    this.resetData();
    this.onChanges();

    this.tasksService.getTasks().subscribe(
      (data)=>{
        console.log(data);
        this.tasks = [];
        for(let d of data){
          if(d?.id != task.id){
            this.tasks.push(new Task(d))
          }
        }
      }
    );
  }

  toogleDirection(){
    this.isDirectionFrom=!this.isDirectionFrom;
    this.form.controls['direction'].setValue(!this.isDirectionFrom);
  }

  onChanges(){
    this.form.valueChanges.subscribe(
      (val)=>{
        console.log(val);
        
        if(this.isDirectionFrom==true){
          this.link = new Link({type: val.type, fromTask: this.task, toTask: val.task2});
        }
        else if(this.isDirectionFrom==false){
          this.link = new Link({type: val.type, fromTask: val.task2, toTask: this.task})
        }
      }
    )
  }

  resetData(){
    this.form = this.formBuilder.group({
      type: [0, Validators.required],
      task1: [this.task.name],
      task2: [undefined, Validators.required], 
      direction: [this.isDirectionFrom]
    });
  }

  closeDialog() {
    if (this.form.valid) {
      this.dialogRef.close(this.link);
    }
  }
}
