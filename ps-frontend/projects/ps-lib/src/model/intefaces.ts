import { EventEmitter } from '@angular/core';
import { Call } from './call';
import { Company } from './company';
import { Domain } from './domain';
import { PageConfig } from './domain-type-config';
import { ListTemplateT } from './template';

export enum RolesEnum {
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER',
  SUPER_USER = 'ROLE_SUPER_USER',
  VIEWER = 'ROLE_VIEWER'
}

export enum NoteTypeEnum {
  SYSTEM = 1,
  GENERIC = 2,
  EMAIL = 3
}

export enum DomainTypeEnum {
  GOVERNMENT = 1,
  CONTRACTOR = 2
}

export enum StatusTypes {
  CALL_NEW = 15000,
  CALL_IN_PROGRESS = 25000,
  ORDER_SEND = 40200,
  ORDER_DONE = 60100,
  ORDER_DONE_CLOSED = 90000,
  ORDER_REJECTED = 60300,
  ORDER_REJECTED_CLOSED = 90100,
  ORDER_REJECTED_SMALL = 90900,
  ORDER_KILLED = 99999,
  NOT_UNIQUE = 94000,
  CLOSED = 95000,
  KILLED = 99999
}

export enum ActionTypeEnum {
  ASSIGN_USER = 0,
  ASSIGN_GROUP =  1,
  CALL_CREATE = 2,
  CALL_CLOSE = 3,
  CALL_KILL = 4,
  ORDER_CREATE = 5,
  ORDER_ACCEPT = 6,
  ORDER_REJECT = 7,
  ORDER_DONE = 8,
  ORDER_CLOSE = 9,
  ORDER_DONE_REJECT = 10,
  ORDER_CANCEL = 11,
  BACK = 12,
  CANCEL = 13,
  NEXT = 14,
  ASSIGN_GROUP_AND_USER = 15,
  ORDER_SAVE_TEMP = 16
}

export enum PageLayoutType {
  overview = 'overview',
  page = 'page',
  pageStickyButtons = 'pageStickyButtons'
}

export enum ButtonTypes {
  'containedPrimary',
  'containedSecondary',
  'outlinePrimary',
  'outlineSecondary',
  'blank',
}

export enum PopupETypes {
  'close',
  'cancel',
  'ok'
}

export interface NavigationRoute {
  route: string[];
}

export interface IPopup {
  events: EventEmitter<{event: PopupETypes, data?: any}>;
}

export interface Environment {
  company: Company,
  domain: Domain
}

export interface DynamicBase {
  call: Call;
}

export interface DynamicPanel extends DynamicBase {
  changed: EventEmitter<any>;
  pageConfig: PageConfig;
}

export interface DynamicListPanel extends DynamicBase {
  template: ListTemplateT;
}