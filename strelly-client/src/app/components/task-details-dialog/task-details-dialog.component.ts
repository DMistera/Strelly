import { Component, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Task, User} from '@app/models';
import { Link } from '@app/models/Link';
import { TasksService } from '@app/services/tasks.service';
import { AssignUserDialogComponent } from '../assign-user-dialog/assign-user-dialog.component';
import { DeleteTaskDialogComponent } from '../delete-task-dialog/delete-task-dialog.component';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';

@Component({
  selector: 'app-task-details-dialog',
  templateUrl: './task-details-dialog.component.html',
  styleUrls: ['./task-details-dialog.component.scss']
})
export class TaskDetailsDialogComponent implements OnInit {
  // @Output() public deleteRequest: EventEmitter<any> = new EventEmitter<any>();
  
  links: Link[];
  layout: boolean = false;

  maxUsersNumber = 5;

  isHidden: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public task: Task, public dialogRef: MatDialogRef<TaskDetailsDialogComponent>, public dialog: MatDialog, private tasksService: TasksService) { 
    this.links = [];
    this.links.push(new Link({id:1, type:0}))
    this.links.push(new Link({id:2, type:1}))
    this.links.push(new Link({id:3, type:0}))
    this.links.push(new Link({id:4, type:0}))
  }

  ngOnInit(): void {
  }

  toogle(){
    this.layout = !this.layout
  }

  editTaskDialog(){
    console.log('edit task');

    this.isHidden = true;
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
      console.log(result);
      this.isHidden = false;
      if(result) {
        this.tasksService.editTask(result, this.task.column.id, this.task.order);
      }
    });
  }
  
  deleteTaskDialog(){
    console.log('delete task');
    this.isHidden = true;
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
      console.log(typeof(result));
      this.isHidden = false;
      if(result) {
        this.dialogRef.close({deleteRequest: true});
      }
    });
  }

  


  assignUserToTaskDialog(){
    console.log('assign user');
    this.isHidden = true;
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
      console.log(typeof(result));
      this.isHidden = false;
      if(result) {
        this.tasksService.assignUser(this.task, result);
        this.task.assignees.push(result);
      }
    });
  }

  dismissUser(user: User){
    this.tasksService.deassignUser(this.task, user);
    this.task.assignees = this.task.assignees.filter((u: User)=>u.id!=user.id);
  }
}
