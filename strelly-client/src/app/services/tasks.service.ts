import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '@app/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private tasks: Task[] = [];

  constructor(private http: HttpClient) {

  }

  public addTasks(name: string, description: string, columnId: number) {
    this.http.post<any>('/api/tasks', {name, description, columnId}).subscribe(result => {
      const task = new Task(result)
      this.tasks.push(task)
      this.tasksSubject.next(this.tasks);
    })
  }

  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('/api/tasks').pipe(map(result => {
      console.log(result);
      this.tasks = result.map((c: any) => {
        return new Task(c);
      })
      this.tasksSubject.next(this.tasks);
      return this.tasks;
    }));
  }
}
