import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TasksService } from '@app/services/tasks.service';
import { Task } from '@app/models';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { DeleteTaskDialogComponent } from '../delete-task-dialog/delete-task-dialog.component';
import { AssignUserDialogComponent } from '../assign-user-dialog/assign-user-dialog.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Output() public deleteRequest: EventEmitter<any> = new EventEmitter<any>();

  constructor(private tasksService: TasksService, public dialog: MatDialog) {
    if(!this.task){
      this.task = new Task("");
    }
  }

  ngOnInit(): void {
  }

  editTaskDialog(){
    const dialogRef = this.dialog.open(EditTaskDialogComponent,{data: this.task});
    dialogRef.afterClosed().subscribe(result => {
      console.log(typeof(result));
      if(result) {
        this.tasksService.editTask(result, this.task.column.id, this.task.order);
      }
    });
  }

  assignUserToTaskDialog(){
    const dialogRef = this.dialog.open(AssignUserDialogComponent,{data: this.task});
    dialogRef.afterClosed().subscribe(result => {
      console.log(typeof(result));
      if(result) {
        this.tasksService.assignUser(this.task, result);
      }
    });
  }

  deleteTaskDialog(){
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {data: this.task});
    dialogRef.afterClosed().subscribe(result => {
      console.log(typeof(result));
      if(result) {
        this.tasksService.deleteTask(this.task.id);
        this.deleteRequest.emit();
      }
    });
  }
}
