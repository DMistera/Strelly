export class Column {
  id: number;
  name: string;
  date: string;

  constructor(object: any) {
    this.id = object?.id || 0;
    this.name = object?.name || '';
    this.date = object?.date || Date.now();
  }
}
