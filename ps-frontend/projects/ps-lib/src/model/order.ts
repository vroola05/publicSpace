import { ActionType } from './action-type';
import { Category } from './category';
import { ContractSpecificationItem } from './contract-specification-item';
import { Domain } from './domain';
import { Group } from './group';
import { Status } from './status';
import { User } from './user';

export class Order {
  public id?: number;
  public description?: string;
  public getOrderList?: Date;
  public dateCreated?: Date;
  public dateEnded?: Date;

  public contractorDomain?: Domain;
  public categories?: Category[];
  public contractSpecificationItem: ContractSpecificationItem[];

  public actionType?: ActionType;
  public status?: Status;

  public group?: Group;
  public user?: User;
}
