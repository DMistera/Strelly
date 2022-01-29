import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Column, Task, User } from '@app/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': '*/*'
  }),
  observe: 'response' as const
};

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasksSubject = new BehaviorSubject<any>([]);
  private tasks: any = {};

  constructor(private http: HttpClient) {

  }

  public addTask(name: string, description: string, columnId: number){
    this.http.post<any>('/api/tasks', {name, description, columnId}).subscribe(result => {
      const task = new Task(result);
      this.tasks[columnId].push(task);
      this.tasksSubject.next(this.tasks);
      console.log(this.tasks);
      return task;
    });
  }

  public editTask(task: Task, columnId: number, order: number){
    this.http.put<any>('/api/tasks/'+task.id, {name: task.name, description: task.description, columnId: columnId, order: order}).subscribe(result => {
      const task = new Task(result);
      return task;
    });
  }

  public deleteTask(taskId: number) {
    this.http.delete<any>('/api/tasks/'+taskId).subscribe(result => {
      for(let t in this.tasks){
        this.tasks[t].filter((x:Task) => taskId != x.id)
      }
      this.tasksSubject.next(this.tasks);
    })
  }

  public getTasks(cloumnId?: number): Observable<any> {
    if(cloumnId != null){
      return this.http.get<Task[]>('/api/tasks?columnId='+cloumnId).pipe(map(result => {
        // console.log(result);
        this.tasks[cloumnId] = result.map((c: any) => {
          return new Task(c);
        })
        this.tasksSubject.next(this.tasks);
        return this.tasks;
      }));
    }
    else{
      return this.http.get<Task[]>('/api/tasks').pipe(map(result => {
        // console.log(result);
        let tempTasks = [] as any;
        result.forEach((task: any)=>{
          // this.tasks[task.column.id].push(new Task(task));
          tempTasks.push(new Task(task))
        })
        // this.tasksSubject.next(this.tasks);
        return tempTasks;
      }));
    }
  }

  public assignUser(task: Task, user: User){
    this.http.post<any>('/api/tasks/assigns', {taskId: task.id, assigneeId: user.id}).subscribe(result => {
      const task = new Task(result);
      return task;
    });
  }

  public deassignUser(task: Task, user: User){
    const tempOptions = {
      headers: HTTP_OPTIONS.headers,
      observe: HTTP_OPTIONS.observe,
      body: JSON.stringify({
        "taskId": task.id,
        "assigneeId": user.id
      })
    };

    this.http.delete<any>('/api/tasks/assigns', tempOptions).subscribe(result => {
      const task = new Task(result);
      return task;
    });
  }
}
