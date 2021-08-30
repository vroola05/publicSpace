import { Company } from './company';
import { Domain } from './domain';
import { Group } from './group';

export class User {
  public id: number;
  public lastLogin: string;
  public apikey: string;
  public username: string;
  public admin: boolean;
  public email: string;
  public phone: string;
  public mobile: string;
  public name: string;
  public type: string;
  public profilePhoto?: string;
  public roles: string[];
  public groups: Group[];
  public company: Company;
  public domain: Domain;
}

export class UserExtended extends User {
  public password?: string;
  public rePassword?: string;
}
