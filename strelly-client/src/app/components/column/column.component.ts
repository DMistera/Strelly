import { Column, Task} from '@app/models';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ColumnsService } from '@app/services/columns.service';
import { MatDialog } from '@angular/material/dialog';
import { NewColumnDialogComponent } from '../new-column-dialog/new-column-dialog.component';
import { NewTaskDialogComponent } from '../new-task-dialog/new-task-dialog.component';
import { TasksService } from '@app/services/tasks.service';
import { Observable } from 'rxjs';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EditColumnDialogComponent } from '../edit-column-dialog/edit-column-dialog.component';
import { DeleteColumnDialogComponent } from '../delete-column-dialog/delete-column-dialog.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnChanges {
  @Input() column: Column;
  @Input() columns: Column[]|null;
  @Input() new = false;

  @Output() public deleteColumnRequest: EventEmitter<any> = new EventEmitter<any>();

  tasks: Task[];
  connectedTo = [] as any;

  constructor(private columnsService: ColumnsService, private tasksService: TasksService, public dialog: MatDialog){}

  ngOnChanges(changes: SimpleChanges){
    if(this.column){
      this.tasksService.getTasks(this.column.id).subscribe(
        (data)=>{
          this.tasks = data[this.column.id];
          this.column.tasks = this.tasks;
        }
      );
    }
    this.getConnectedColumns();
  }

  getConnectedColumns(){
    this.connectedTo = []
    if(this.columns){
      for(let col of this.columns){
        this.connectedTo.push("column-"+col.id)
      }
    }
    return this.connectedTo;
  }

  newColumnDialog() {
    const dialogRef = this.dialog.open(NewColumnDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      // console.log(typeof(result));
      if(result) {
        this.columnsService.addColumn(result)
      }
    });
  }

  editColumnDialog() {
    const dialogRef = this.dialog.open(EditColumnDialogComponent,{data: this.column});
    dialogRef.afterClosed().subscribe(result => {
      // console.log(typeof(result));
      if(result) {
        this.columnsService.editColumn(result, result.order)
      }
    });
  }

  deleteColumnDialog() {
    const dialogRef = this.dialog.open(DeleteColumnDialogComponent, {data: this.column});
    dialogRef.afterClosed().subscribe(result => {
      // console.log(typeof(result));
      if(result) {
        this.columnsService.deleteColumn(this.column.id);
        this.deleteColumnRequest.emit();
      }
    });
  }

  newTask() {
    const dialogRef = this.dialog.open(NewTaskDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      // console.log(typeof(result));
      if(result) {
        this.tasksService.addTask(result.name, result.description, this.column.id);
      }
    });
  }

  removeTask(taskId: number){
    this.tasks = this.tasks.filter((t:Task)=> t.id != taskId)
    this.column.tasks = this.tasks;
  }

  removeColumn(){
    this.columnsService.deleteColumn(this.column.id);
    this.deleteColumnRequest.emit();
  }

  drop(event: CdkDragDrop<any[]>) {
    // console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.tasksService.editTask(event.container.data[event.currentIndex], Number(event.container.id.split("-")[1]), event.currentIndex)
  }
}
