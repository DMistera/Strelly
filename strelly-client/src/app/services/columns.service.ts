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
  public columnsObservable = new Observable<any>();
  private columns: Column[] = [];

  constructor(private http: HttpClient) {
    this.columnsObservable = this.columnsSubject.asObservable();
    this.getColumns().subscribe(
      (data)=>{}
    );
  }

  public addColumn(name: string) {
    this.http.post<any>('/api/columns', {name}).subscribe(result => {
      const column = new Column(result);
      this.columns.push(column);
      this.updateColumns(this.columns);
    })
  }

  public editColumn(column: Column) {
    this.http.put<any>('/api/columns/'+column.id, column).subscribe(result => {
      let index = this.columns.findIndex((element: Column)=> element.id === column.id);
      this.columns[index] = new Column(result);
      this.updateColumns(this.columns);
    })
  }

  public deleteColumn(columnId: number){
    this.http.delete<any>('/api/columns/'+columnId).subscribe(result => {
      this.columns = this.columns.filter((col: Column)=> col.id != columnId);
      this.updateColumns(this.columns);
    })
  }

  public getColumn(columnId: number){
    return this.http.get<Column>('/api/columns/'+columnId).pipe(map(result => {
      return new Column(result);
    }));
  }

  public getColumns(){
    return this.http.get<Column[]>('/api/columns').pipe(map(result => {
      // console.log(result);
      this.columns = result.map((c: any) => {
        return new Column(c);
      })
      this.updateColumns(this.columns);
      return this.columns;
    }));
  }

  updateColumns(data: any){
    this.columnsSubject.next(data);
  }
}
