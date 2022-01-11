import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Column } from '@app/models/Column';

@Injectable({
  providedIn: 'root'
})
export class ColumnsService {
  private columnsSubject = new BehaviorSubject<Column[]>([]);
  private columns: Column[] = [];

  constructor() { }

  public addColumns(name: string) {
    const data = {name, data: Date.now()};
    const column = new Column(data)
    this.columns.push(column)
    this.columnsSubject.next(this.columns);
  }

  public getColumns(): Observable<Column[]> {
    return this.columnsSubject.asObservable();
  }
}
