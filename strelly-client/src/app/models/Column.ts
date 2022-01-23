import { Task } from ".";
export class Column {
  id: number;
  name: string;
  order: number;
  tasks: Task[];

  constructor(object: any) {
    this.id = object?.id || 0;
    this.name = object?.name || '';
    this.order = object?.order || 0;
    this.tasks = [];
    object?.tasks?.forEach((obj:string) => { this.tasks.push(new Task(obj)); }) || [];
  }
}
