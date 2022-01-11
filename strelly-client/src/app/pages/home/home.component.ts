import { Observable } from 'rxjs';

import { ColumnsService } from './../../services/columns.service';
import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/User';
import { Column } from '@app/models/Column';
import { AuthService } from '@app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { NewColumnDialogComponent } from '@app/components/new-column-dialog/new-column-dialog.component';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User|null;
  columns: Observable<Column[]>;

  constructor(private authService: AuthService, private columnsService: ColumnsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.userObservable.subscribe(user => {
      this.user = user;
    })
    this.columns = this.columnsService.getColumns();
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

  dateFormat(timestamp: any) {
    return new Date(timestamp)
  }

}
