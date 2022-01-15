import { Observable } from 'rxjs';
import { ColumnsService } from '@app/services/columns.service';
import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/User';
import { Column } from '@app/models/Column';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User|null;
  columns: Observable<Column[]>;

  constructor(private authService: AuthService, private columnsService: ColumnsService) { }

  ngOnInit(): void {
    this.authService.userObservable.subscribe(user => {
      this.user = user;
    })
    this.columns = this.columnsService.getColumns();
  }


}
