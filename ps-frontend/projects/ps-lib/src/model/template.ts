import { Action } from './action';
import { ActionType } from './action-type';
import { Company } from './company';
import { Domain } from './domain';
import { ButtonTypes, PageLayoutType } from './intefaces';
import { Page } from './page';
import { PageButton } from './page-button';
import { PageOverviewColumns } from './page-overview-columns';
import { Status } from './status';

export interface KeyValueT {
  key: any;
  value: string;
}

export interface DomainPageT {
  buttonsLeft?: ButtonT[];
  buttonsRight?: ButtonT[];
  pageType?: PageLayoutType;
}

export interface LoginT {
  idp: number;

  login?: LoginPageT;
  resetAccount?: ResetAccountPageT;
}

export interface LoginPageT {
  endpoint?: string;
  route?: string;
}
export interface ResetAccountPageT {
  endpoint?: string;
  route?: string;
}

export interface LocationPageT extends DomainPageT {
  listTemplate?: ListTemplateT;
}

export interface ChangeT {
  location?: DomainPageT;
  information?: DomainPageT;
  confirmation?: DomainPageT;
}

export interface OverviewPageT {
  listSize?: number;
  panelType?: 'call' | 'order';
  listTemplate?: ListTemplateT[];
}

export interface OrderCreationPageT {
  
  buttonsLeft?: ButtonT[];
  buttonsRight?: ButtonT[];
  pageType?: PageLayoutType;
}

export interface OrderT {
  creation?: OrderCreationPageT;
  information?: DomainPageT;
  confirmation?: DomainPageT;
  handle?: DomainPageT;
  handleNoLogin?: DomainPageT;
}

export interface RoleT {
  role: string;
  allow: boolean;
}

export interface ConditionT {
  field: string;
  operator: 'eq' | 'neq' | 'lt' | 'le' | 'gt' | 'ge';
  value: string;
}

export interface ButtonT {
  name?: string;
  route?: string;
  action?: ActionType;
  type?: ButtonTypes;
  roles?: RoleT[];
  conditions?: ConditionT[];
}

export interface HeaderMenuItemT extends ButtonT {
  id?: number;
  icon?: string;
  api: string;
  notification?: string;
  selected?: boolean;
  menuType?: 'main' | 'group';
}

export interface ListTemplateT {
  id?: string;
  toggle?: boolean;
  route?: string;
  buttonsLeft?: PageButton[];
  buttonsRight?: PageButton[];
  priority?: boolean;
  notification?: string;
  columns: PageOverviewColumns[];
}

export interface ListTemplateColumnT {
  id: string;
  name: string;
  filter?: string;
  type: string;
  pipes?: string;
  css?: string;
  mobile?: string;
}

export interface MailT {
  id: string;
  title: string;
  template: string;
  endpoint: string;
  label: string;
  buttonsLeft?: ButtonT[];
  buttonsRight?: ButtonT[];
}

export interface DefaultsT {
  apiKey: string;
  prefix?: string;
  logo?: string;
  favicon?: string;
  favicon32?: string;
  favicon512?: string;
}

export interface HeaderT {
  headerMenu?: HeaderMenuItemT[];
  group?: HeaderMenuItemT;
}

export interface ComponentsT {
  detailsHeader?: ListTemplateColumnT[];
  header?: HeaderT;
  filter?: Map<string, KeyValueT[]>;
}

export interface InfoT {
  prefix?: string;
  apikey?: string;
  logo?: string;
  favicon?: string;
  favicon32?: string;
  favicon512?: string;
  status: Status[]
}

export interface EndpointT {
  endpoint: string;
  roles?: string[];
}

export interface EndpointsT {
  postLogin?: EndpointT;
  getLoginReset?: EndpointT;
  getCheckToken?: EndpointT;
  getImages?: EndpointT;
  getImage?: EndpointT;
  postImage?: EndpointT;
  postNote?: EndpointT;

  getProfileImage?: EndpointT;
  getNotifications?: EndpointT;
  getClearNotification?: EndpointT;
  getListCall?: EndpointT;
  getDetailCall?: EndpointT;
  putCall?: EndpointT;
  postCallAbort?: EndpointT;
  postCallClose?: EndpointT;

  getLocationsByStreet?: EndpointT;

  getNewLocationByStreetNameAndNumber?: EndpointT;
  getNewLocationByCoordinates?: EndpointT;
  getNewLocationNearbyByCoordinates?: EndpointT;
  getNewInformationCategories?: EndpointT;
  getNewInformationMainCategory?: EndpointT;
  getNewInformationChannels?: EndpointT;
  postNewConfirmationCall?: EndpointT;

  getAssignUsersOfGroup?: EndpointT;
  getAssignGroups?: EndpointT;
  putAssignUser?: EndpointT;
  putAssignGroup?: EndpointT;

  getOrderCreationContractors?: EndpointT;
  getOrderCreationOrderTypesContractor?: EndpointT;
  postOrders?: EndpointT;
  putOrder?: EndpointT;

  getOrderitems?: EndpointT;
  putOrderStatus?: EndpointT;

  getNoLoginDetailCall?: EndpointT;
  getNoLoginImages?: EndpointT;
  getNoLoginImage?: EndpointT;
  putNoLoginOrder?: EndpointT;

  getUsers?: EndpointT;
  puUser?: EndpointT;
}

export interface PagesT {
  overview?: OverviewPageT;
  newLocation?: LocationPageT;
  newInformation?: DomainPageT;
  newConfirmation?: DomainPageT;
}

export interface Template {
  pages?: Map<string, Page>;
  components?: ComponentsT;
  actions: Action[];
  defaults?: DefaultsT;
  endpoints?: Map<string, EndpointT>;
  info: InfoT;
  company: Company;
  domain: Domain;
}
