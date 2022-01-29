import { Component, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Task, User} from '@app/models';
import { Link } from '@app/models/Link';
import { LinksService } from '@app/services/links.service';
import { TasksService } from '@app/services/tasks.service';
import { AssignUserDialogComponent } from '../assign-user-dialog/assign-user-dialog.component';
import { DeleteTaskDialogComponent } from '../delete-task-dialog/delete-task-dialog.component';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { NewLinkDialogComponent } from '../new-link-dialog/new-link-dialog.component';

@Component({
  selector: 'app-task-details-dialog',
  templateUrl: './task-details-dialog.component.html',
  styleUrls: ['./task-details-dialog.component.scss']
})
export class TaskDetailsDialogComponent implements OnInit {
  
  links: Link[];
  layout: boolean = false;

  maxUsersNumber = 5;

  isHidden: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public task: Task, public dialogRef: MatDialogRef<TaskDetailsDialogComponent>, public dialog: MatDialog, private tasksService: TasksService, private linksService: LinksService) { 
    this.links = [];
    this.linksService.getLinks(this.task.id).subscribe(
      (data)=>{
        this.links = data;
      }
    )
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
      // console.log(result);
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
      // console.log(typeof(result));
      if(result) {
        this.dialogRef.close({deleteRequest: true});
      }
      else{
        this.isHidden = false;
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
      // console.log(typeof(result));
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

  newLinkDialog(){
    console.log('new link');
    this.isHidden = true;
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
      this.isHidden = false;
      if(result) {
        console.log(result);
        this.linksService.addLink(result.type, result.fromTask.id, result.toTask.id);
        this.links.push(result);
      }
    });
  }

  removeLink(link: Link){
    this.linksService.deleteLink(link.id);
    this.links = this.links.filter((l: Link)=>l.id!=link.id);
  }
}
