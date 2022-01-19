import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TasksService } from '@app/services/tasks.service';
import { Task } from '@app/models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Output() public deleteRequest: EventEmitter<any> = new EventEmitter<any>();

  constructor(private tasksService: TasksService) {
    if(!this.task){
      this.task = new Task("");
    }
  }

  ngOnInit(): void {
  }

  editTask(){
    
  }

  deleteTask(){
    this.tasksService.deleteTasks(this.task.id);
    this.deleteRequest.emit();
  }
}
