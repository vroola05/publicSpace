import {Orderitem} from './order-item';
import {Ordertype} from './order-type';
import {Contractor} from './contractor';

import {Status} from './status';
import { User } from './user';
import { OrderitemMisc } from './misc-order-item';

export class Order {
  public id?: number;
  public description?: string; //
  public name?: string; //
  public explanation?: string; //
  public price?: number; //
  public contractor?: Contractor;
  public orderitems?: Orderitem[]; //
  public ordertypes?: Ordertype[]; //
  public miscOrderitems?: OrderitemMisc[]; //
  public dateSend?: string; // ? date? unix time?
  public automatic?: boolean; // ?
  public statusProces?: Status;
  public status?: Status;
  public assignor?: User;
  public executor?: User;
  public isExecuted?: boolean; // ?
}
