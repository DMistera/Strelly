import { Column, Task} from '@app/models';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ColumnsService } from '@app/services/columns.service';
import { MatDialog } from '@angular/material/dialog';
import { NewColumnDialogComponent } from '../new-column-dialog/new-column-dialog.component';
import { NewTaskDialogComponent } from '../new-task-dialog/new-task-dialog.component';
import { TasksService } from '@app/services/tasks.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnChanges {
  @Input() column: Column;
  @Input() new = false;
  tasks: Task[];

  constructor(private columnsService: ColumnsService, private tasksService: TasksService, public dialog: MatDialog){}

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes"+JSON.stringify(changes));
    if(this.column){
      console.log(JSON.stringify(this.column));
      this.tasksService.getTasks(this.column.id).subscribe(
        (data)=>{
          this.tasks = data[this.column.id];
        }
      );
    }
  }

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
      // console.log(typeof(result));
      if(result) {
        this.tasksService.addTasks(result.name, result.description, this.column.id);
      }
    });
  }

  removeTask(taskId: number){
    this.tasks = this.tasks.filter((t:Task)=> t.id != taskId)
  }
}
