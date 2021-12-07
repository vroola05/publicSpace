import { Domain } from "./domain";

export class Contract {
  public id: number;
  public dateCreated?: Date;
  public accepted?: boolean;
  public startDate?: Date;
  
  public domain: Domain;
}
