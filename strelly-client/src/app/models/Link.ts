import { Task } from ".";

export class Link {
    id: number;
    type: number;
    fromTask: Task;
    toTask: Task;
  
    constructor(object: any) {
      this.id = object?.id || 0;
      this.type = object?.type || 0;
      this.fromTask = new Task(object?.fromTask || '');
      this.toTask = new Task(object?.toTask || '');
    }

    isBlocking(){
        return this.type==0;
    }

    isRelating(){
        return this.type==1;
    }
}