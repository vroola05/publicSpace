import { OnDestroy, OnInit, Directive, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../../../model/page';
import { ActionTypeEnum, DomainTypeEnum, DynamicPanel, PageLayoutType } from '../../../model/intefaces';
import { ActionService } from '../../services/action/action.service';
import { AuthorisationService } from '../../services/authorisation/authorisation.service';
import { NavigationService } from '../../services/navigation/navigation.service';
import { StorageService } from '../../services/storage/storage.service';
import { TransformService } from '../../services/transform/transform.service';
import { PageConfig } from '../../../model/domain-type-config';
import { List } from '../../../model/list';
import { Call } from '../../../model/call';
import { ConfigService } from '../../services/config/config.service';
import { DomainType } from '../../../model/domain-type';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { Order } from '../../../model/order';
import { Note } from '../../../model/note';

@Directive()
export abstract class PageAbstract implements OnInit, OnDestroy {
  public pageLayoutType: PageLayoutType = PageLayoutType.page;
  
  protected subscriptions: Subscription[] = [];

  public domainType: DomainType;
  public page: Page;
  public pageConfig: PageConfig;
  public header: List;

  private _call: Call;
  public set call(call: Call) {
    this._call = call;
    if (call) {
      this.header = this.getHeaderList(call);
    }
  }
  
  public get call() {
    return this._call;
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected navigationService: NavigationService,
    protected storage: StorageService,
    protected action: ActionService,
    protected transform: TransformService,
    protected authorisation: AuthorisationService,
    protected config: ConfigService
  ) {
  }

  public ngOnInit(): void {
    this.domainType = this.config.getDomainType();

    this.transform.clearVariable();
    // this.transform.setVariable('user', this.authorisation.user);
    this.transform.setVariable('path', this.activatedRoute.snapshot.paramMap);
    this.navigationService.title = (this.activatedRoute.snapshot.data && this.activatedRoute.snapshot.data.title)
      ? this.activatedRoute.snapshot.data.title
      : (this.navigationService.headerItem && this.navigationService.headerItem.name
        ? this.navigationService.headerItem.name
        : '');


    this.action.register(ActionTypeEnum.ASSIGN_GROUP, () => { return this.assignGroup(); });
    this.action.register(ActionTypeEnum.ASSIGN_USER, () => { return this.assignUser(); });
    this.action.register(ActionTypeEnum.ASSIGN_GROUP_AND_USER, () => { return this.assignUserAndGroup(); });
    
    this.action.register(ActionTypeEnum.CALL_CREATE, () => { return this.callCreate(); });
    this.action.register(ActionTypeEnum.CALL_CLOSE, () => { return this.callClose(); });
    this.action.register(ActionTypeEnum.CALL_KILL, () => { return this.callKill(); });

    this.action.register(ActionTypeEnum.ORDER_CREATE, () => { return this.orderCreate(); });
    this.action.register(ActionTypeEnum.ORDER_ACCEPT, () => { return this.orderAccept(null); });
    this.action.register(ActionTypeEnum.ORDER_REJECT, () => { return this.orderReject(null); });
    this.action.register(ActionTypeEnum.ORDER_CANCEL, () => { return this.orderCancel(null, null); });
    this.action.register(ActionTypeEnum.ORDER_CLOSE, () => { return this.orderClose(null); });
    this.action.register(ActionTypeEnum.ORDER_DONE, () => { return this.orderDone(); });
    this.action.register(ActionTypeEnum.ORDER_DONE_REJECT, () => { return this.orderDoneReject(null); });

    this.action.register(ActionTypeEnum.CANCEL, () => { return this.cancel(); });
    this.action.register(ActionTypeEnum.BACK, () => { return this.back(); });
    this.action.register(ActionTypeEnum.NEXT, () => { return this.next(); });
  }

  public getUser() {
    return this.authorisation.user;
  }

  public getHeaderList(call: Call): List {
    if (!call.id) {
      return;
    }
    const list = new List();

    list.casenumber = call.casenumber;
    list.category = !call.mainCategory ? '' : call.mainCategory.name + ' - ' + call.mainCategory.category.name;
    list.priority = call.priority;

    if (call.location) {
      list.city = call.location.city;
      list.postal = call.location.postal;
      list.street = call.location.street;
      list.number = call.location.number;
      list.location = (!call.location.postal ? '' : call.location.postal)
        + (!call.location.city ? '' : ' ' + call.location.city)
        + (!call.location.street ? '' : ', ' + call.location.street)
        + (!call.location.number ? '' : ' ' + call.location.number);
    }

    if (this.domainType.id === DomainTypeEnum.GOVERNMENT) {
      return this.getHeaderListGovernment(list, call);
    } else {
      return this.getHeaderListContractor(list, call);
    }
  }

  private getHeaderListGovernment(list: List, call: Call) {
    list.id = call.id;
    list.description = call.description;
    
    list.status = !call.status ? '' : call.status.name;
    list.dateCreated = moment(call.dateCreated).toISOString();
    if (call.dateEnded) {
      list.dateEnded = moment(call.dateEnded).toISOString();
    }

    list.user = !call.user ? '' : call.user.name;
    list.group = !call.group ? '' : call.group.name;

    return list;
  }

  private getHeaderListContractor(list: List, call: Call) {
    const order = call.orders[0];
    list.id = order.id;
    list.description = order.description;

    list.status = !order.status ? '' : order.status.name;
    list.dateCreated = moment(order.dateCreated).toISOString();
    if (list.dateEnded) {
      list.dateEnded = moment(order.dateEnded).toISOString();
    }

    list.user = !order.user ? '' : order.user.name;
    list.group = !order.group ? '' : order.group.name;

    return list;
  }

  public ngOnDestroy(): void {
    this.transform.clearVariable();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  protected loadComponent(viewContainerRef: ViewContainerRef, dynamicPanel: any) {
    if (!viewContainerRef || !dynamicPanel) {
      return;
    }
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<DynamicPanel>(dynamicPanel);

    componentRef.instance.pageConfig = this.pageConfig;
    componentRef.instance.call = this.call;

    this.subscriptions.push(componentRef.instance.changed.subscribe($event => this.changed($event)));
  }


  public changed($event: {action: string, data: any}): void {
  }

  public notImplemented(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.error('Not implemented');
      reject(false)
    });
  }

  /**
   * 
   */

  public cancel(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.storage.clearProcessData();
      this.navigationService.navigateHome();
      resolve(true);
    });
  }

  public back(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
    this.navigationService.back();
    resolve(true);
    });
  }

  public next(): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }

  public assignGroup(): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }

  public assignUser(): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }

  public assignUserAndGroup(): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }

  public callCreate(): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }

  public callClose(): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }

  public callKill(): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }

  public orderCreate(): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }

  public orderAccept(order: Order): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }

  public orderReject(order: Order): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }

  public orderCancel(order: Order, note: Note): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }

  public orderClose(order: Order): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }

  public orderDone(): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }

  public orderDoneReject(order: Order): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }
}
