export class Column {
  id: number;
  name: string;

  constructor(object: any) {
    this.id = object?.id || 0;
    this.name = object?.name || '';
  }
}
