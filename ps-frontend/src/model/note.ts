import { User } from "./user";

export class NoteType {
  public id?: number;
  public name?: string;
}

export class Note {
  public id?: string;
  public content?: string;
  public type?: NoteType;
  public user?: User;
  public public?: boolean = false;
  public dateCreated?: Date;

  public constructor(content: string = '') {
    this.content = content;
  }

}
