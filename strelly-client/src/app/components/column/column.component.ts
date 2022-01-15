import { Column } from '@app/models/Column';
import { Component, Input, OnInit } from '@angular/core';
import { ColumnsService } from '@app/services/columns.service';
import { MatDialog } from '@angular/material/dialog';
import { NewColumnDialogComponent } from '../new-column-dialog/new-column-dialog.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
  @Input() column: Column;
  @Input() new = false;

  constructor(private columnsService: ColumnsService, public dialog: MatDialog) { }

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
    //TODO implement adding new task
    console.error('implement adding new task');
  }

}
