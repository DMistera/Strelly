import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Column } from '@app/models/Column';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ColumnsService {
  private columnsSubject = new BehaviorSubject<Column[]>([]);
  private columns: Column[] = [];

  constructor(private http: HttpClient) {

  }

  public addColumns(name: string) {
    this.http.post<any>('/api/columns', {name}).subscribe(result => {
      const column = new Column(result)
      this.columns.push(column)
      this.columnsSubject.next(this.columns);
    })
  }

  public getColumns(): Observable<Column[]> {
    return this.http.get<Column[]>('/api/columns').pipe(map(result => {
      console.log(result);
      this.columns = result.map((c: any) => {
        return new Column(c);
      })
      this.columnsSubject.next(this.columns);
      return this.columns;
    }));
  }
}
