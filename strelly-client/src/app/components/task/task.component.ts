import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TasksService } from '@app/services/tasks.service';
import { Task, User } from '@app/models';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { DeleteTaskDialogComponent } from '../delete-task-dialog/delete-task-dialog.component';
import { AssignUserDialogComponent } from '../assign-user-dialog/assign-user-dialog.component';
import { TaskDetailsDialogComponent } from '../task-details-dialog/task-details-dialog.component';
import { NewLinkDialogComponent } from '../new-link-dialog/new-link-dialog.component';
import { LinksService } from '@app/services/links.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Output() public deleteRequest: EventEmitter<any> = new EventEmitter<any>();

  maxUsersNumber = 5;

  constructor(private tasksService: TasksService, public dialog: MatDialog, private linksService: LinksService) {
    if(!this.task){
      this.task = new Task("");
    }
  }

  ngOnInit(): void {
  }

  taskDetailsDialog(){
    const dialogRef = this.dialog.open(TaskDetailsDialogComponent,{
      maxWidth: '1000px',
      width: '90vw',
      autoFocus: false,
      panelClass: 'custom-dialog-container',
      data: this.task
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if(result?.deleteRequest == true){
        this.tasksService.deleteTask(this.task.id);
        this.deleteRequest.emit();
      }
      else if(result?.editRequest ==true){
        this.tasksService.editTask(result.data, this.task.column.id, this.task.order);
      }
    });
  }

  editTaskDialog(){
    const dialogRef = this.dialog.open(EditTaskDialogComponent,
      {
        maxWidth: '600px',
        width: '80vw',
        autoFocus: false,
        panelClass: 'custom-dialog-container',
        data: this.task
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      // console.log(typeof(result));
      if(result) {
        this.tasksService.editTask(result, this.task.column.id, this.task.order);
      }
    });
  }

  assignUserToTaskDialog(){
    const dialogRef = this.dialog.open(AssignUserDialogComponent,
      {
        maxWidth: '600px',
        width: '80vw',
        autoFocus: false,
        panelClass: 'custom-dialog-container',
        data: this.task
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      // console.log(typeof(result));
      if(result) {
        this.tasksService.assignUser(this.task, result);
        this.task.assignees.push(result);
      }
    });
  }

  newLinkDialog(){
    console.log('new link');
    const dialogRef = this.dialog.open(NewLinkDialogComponent,
      {
        maxWidth: '1000px',
        width: '80vw',
        autoFocus: false,
        panelClass: 'custom-dialog-container',
        data: this.task
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      // console.log(typeof(result));
      if(result) {
        // console.log(result);
        this.linksService.addLink(result.type, result.fromTask.id, result.toTask.id);
      }
    });
  }


  dismissUser(user: User){
    this.tasksService.deassignUser(this.task, user);
    this.task.assignees = this.task.assignees.filter((u: User)=>u.id!=user.id);
  }

  deleteTaskDialog(){
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, 
      {
        maxWidth: '600px',
        width: '80vw',
        autoFocus: false,
        panelClass: 'custom-dialog-container',
        data: this.task
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      // console.log(typeof(result));
      if(result) {
        this.tasksService.deleteTask(this.task.id);
        this.deleteRequest.emit();
      }
    });
  }
}
