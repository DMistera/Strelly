import { Column } from '@app/models/Column';
import { Component, Input, OnInit } from '@angular/core';
import { ColumnsService } from '@app/services/columns.service';
import { MatDialog } from '@angular/material/dialog';
import { NewColumnDialogComponent } from '../new-column-dialog/new-column-dialog.component';
import { NewTaskDialogComponent } from '../new-task-dialog/new-task-dialog.component';
import { TasksService } from '@app/services/tasks.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
  @Input() column: Column;
  @Input() new = false;

  constructor(private columnsService: ColumnsService, private tasksService: TasksService, public dialog: MatDialog) { }

  newColumnDialog() {
    const dialogRef = this.dialog.open(NewColumnDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(typeof(result));
      if(result) {
        this.columnsService.addColumns(result)
      }
    });
  }

  newTask() {
    const dialogRef = this.dialog.open(NewTaskDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(typeof(result));
      if(result) {
        this.tasksService.addTasks(result.name, result.description, this.column.id)
      }
    });
  }
}
