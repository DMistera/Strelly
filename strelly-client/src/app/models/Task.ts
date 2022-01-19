import { User, Column } from ".";

export class Task {
    id: number;
    name: string;
    description: string;
    column: Column;
    createTime: string;
    updateTime: string;
    assignees: User[];
  
    constructor(object: any) {
      this.id = object?.id || 0;
      this.name = object?.name || '';
      this.description = object?.description || '';
      this.column = new Column(object?.column || '');
      this.createTime = object?.createTime || '';
      this.updateTime = object?.updateTime || '';

      this.assignees = [];
      object?.assignees?.forEach((obj:string) => { this.assignees.push(new User(obj)); }) || [];
    }
  }