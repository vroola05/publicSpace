import { User } from "./user";

export class OrderNote {
  public id?: number;
  public content?: string;
  public user?: User;
  public dateCreated?: Date;
  public definite?: boolean;

  public constructor(content: string = '') {
    this.content = content;
  }

}
