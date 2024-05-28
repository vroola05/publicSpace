import { User } from "./user";

export class NoteType {
  public id?: number;
  public name?: string;
}

export class Note {
  public id?: number;
  public content?: string;
  public type?: NoteType;
  public user?: User;
  public dateCreated?: Date;

  public constructor(content: string = '') {
    this.content = content;
  }

}
