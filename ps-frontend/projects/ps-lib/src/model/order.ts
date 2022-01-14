import { Category } from './category';
import { Domain } from './domain';
import { Status } from './status';

export class Order {
  public id?: number;
  public description?: string;
  public dateCreated?: Date;
  public dateEnded?: Date;

  public contractorDomain?: Domain;
  public categories?: Category[];
  
  public status?: Status;
}
