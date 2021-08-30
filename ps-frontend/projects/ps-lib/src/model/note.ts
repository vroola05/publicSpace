export class Note {
  public id?: number;
  public description?: string;
  public type?: string;
  public supervisor?: string;
  public date?: string;

  public constructor(description: string = '') {
    this.description = description;
  }

}
