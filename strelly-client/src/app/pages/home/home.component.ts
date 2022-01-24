import { Observable } from 'rxjs';
import { ColumnsService } from '@app/services/columns.service';
import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/User';
import { Column } from '@app/models/Column';
import { AuthService } from '@app/services/auth.service';
import { ThrowStmt } from '@angular/compiler';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User|null;
  columns: Column[]|null;

  constructor(private authService: AuthService, private columnsService: ColumnsService) {}

  ngOnInit(): void {
    this.authService.userObservable.subscribe(user => {
      this.user = user;
    })
    this.columnsService.columnsObservable.subscribe(
      (data)=>{
        this.columns = data;
      }
    );
    this.columnsService.getColumns();
  }

  removeColumn(columnId: number){
    if(this.columns){
      this.columns = this.columns?.filter((c:Column)=> c.id != columnId)
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    // console.log(event);
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
    this.columnsService.editColumn(event.container.data[event.currentIndex], event.currentIndex+1)
  }
}
