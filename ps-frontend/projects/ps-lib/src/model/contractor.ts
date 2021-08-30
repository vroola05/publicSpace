import {Order} from './order';

export class Contractor {
  public id: number;
  public type: string;
  public name?: string;
  public email?: string;
  public ordertypes?: Order[];
  public contractorGroup?: string;
  public description: string;
  public contractor: any;
}
