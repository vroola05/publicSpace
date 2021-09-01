import { Group } from "./group";

export class Category {
  public id: number;
  public name?: string;
  public startDate?: Date;
  public endDate?: Date;
  public active?: boolean;
  public group?: Group;
}
