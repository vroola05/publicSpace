export class Column {
  public index: number;
  public name: string;
  public id: string;
  public type: string;
  public className: string;
  public order: string;

  constructor(name: string, id: string, type: string, className: string) {
    this.name = name;
    this.id = id;
    this.type = type;
    this.className = className;
  }
}
