import {Status} from './status';
import {Location} from './location';
import {Order} from './order';
import {Note} from './note';
import {Group} from './group';
import {Person} from './person';
import {User} from './user';
import {Document} from './document';
import { MainCategory } from './main-category';

export class Call {
  public id?: number;
  public description?: string;
  public dateCreated?: Date;
  public dateEnded?: Date;

  public mainCategory?: MainCategory;

  public documents?: Document[];
  
  public informCaller?: boolean;
  public priority?: boolean;
  public confidential?: boolean;
  public channelInfo?: string;
  public channel?: string;
  public callcenter?: string;
  public team?: string;
  public casenumber?: string;
  public status?: Status;
  
  public location?: Location;
  public person?: Person;
  public orders?: Order[];
  public notes?: Note[];
  public user?: User;
  public createdBy?: User;
  public group?: Group;
  public city?: string;
  public postal?: string;
  public street?: string;
  public number?: string;
  public notification?: string;
}

