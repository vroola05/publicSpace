import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActionService } from '../../../../services/action/action.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { ConfigService, PageTypes } from '../../../../services/config/config.service';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { TransformService } from '../../../../services/transform/transform.service';
import { EndpointService } from '../../../../services/endpoint/endpoint.service';
import { PageAbstract } from '../../page';
import { Call } from '../../../../../model/call';
import { Order } from '../../../../../model/order';
import { Orderitem } from '../../../../../model/order-item';
import { ButtonT } from '../../../../../model/template';
import { DomainTypeEnum } from '../../../../../model/intefaces';
import { DynamicRightDirective } from '../../../../directives/dynamic-right.directive';
import { DynamicLeftDirective } from '../../../../directives/dynamic-left.directive';

@Component({
  selector: 'lib-orderitem-creation',
  templateUrl: './orderitem-creation.component.html',
  styleUrls: ['./orderitem-creation.component.scss']
})
export class OrderitemCreationComponent extends PageAbstract implements OnInit, OnDestroy {
  @ViewChild(DynamicLeftDirective, {static: false}) private dynamicHostLeft!: DynamicLeftDirective;
  @ViewChild(DynamicRightDirective, {static: false}) private dynamicHostRight!: DynamicRightDirective;

  private subscription: Subscription[] = [];
  public order: Order;
  public getUrlImage: string;
  public buttonsLeft: ButtonT[];
  public buttonsRight: ButtonT[];

  public orderitems: { name: string, value?: string, selected?: boolean, data?: any }[] = [];

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected navigationService: NavigationService,
    protected storage: StorageService,
    protected action: ActionService,
    protected transform: TransformService,
    protected authorisation: AuthorisationService,
    protected config: ConfigService,
    private endpoints: EndpointService
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation, config);

    this.page = this.config.getPage(PageTypes.details);    
    this.pageConfig = this.page.pageConfig;

    const order = this.storage.getSession('order');
    if (order) {
      this.order = JSON.parse(order) as Order;
      this.transform.setVariable('order', this.order);
    }
  }

  public ngOnInit(): void {
    super.ngOnInit();

    this.getCall();

    // this.buttonsLeft = this.config.template.order.creation.buttonsLeft;
    // this.buttonsRight = this.config.template.order.creation.buttonsRight;
    // if (this.config.template.order.creation.pageType) {
    //   this.pageLayoutType = this.config.template.order.creation.pageType;
    // }

    //this.action.register('next', () => { this.next(); });
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

  public getOrderitems(): void {
    this.endpoints.get('getOrderitems').then((orderitems: Orderitem[]) => {
      if (orderitems) {
        orderitems.forEach(orderitem => {
          this.orderitems.push(
            {
              name: orderitem.quotationNumber + ' - ' + orderitem.name + ' (' + orderitem.unit + ')',
              value: '' + orderitem.id, data: orderitem,
              selected: this.orderitemSelected(orderitem.quotationId)
            }
          );
        });
      }
    });
  }

  public orderitemSelected(id: number): boolean {
    // if (this.order && this.order.orderitems && this.order.orderitems.find(o => o.quotationId === id)) {
    //   return true;
    // }

    return false;
  }

  public getCall(): void {
    this.endpoints.get(this.pageConfig.getEndpoint('getCall')).then((call: Call) => {
      this.transform.setVariable('call', call);

      this.call = call;

      if (this.authorisation.isDomainType(DomainTypeEnum.CONTRACTOR)) {
        this.transform.setVariable('order', call.orders[0]);
      }

      this.loadComponent(this.dynamicHostLeft.viewContainerRef, this.pageConfig.getComponent('left'));
      this.loadComponent(this.dynamicHostRight.viewContainerRef, this.pageConfig.getComponent('right'));
    });
    // this.endpoints.get('getDetailCall').then((call: Call) => {
    //   this.transform.setVariable('call', call);
    //   this.call = call;
    //   if (! this.order && this.call.orders && this.call.orders.length > 0) {
    //     this.order = this.call.orders[0];
    //     this.transform.setVariable('order', this.order);
    //     this.storage.setSession('order', JSON.stringify(this.order), true);
    //   }

    //   this.getUrlImage = this.transform.URL(this.config.getEndpoint('getImage').endpoint);

    //   this.getOrderitems();
    // });
  }

  public getSelectedOrderitems(): Orderitem[] {
    const orderitems: Orderitem[] = [];
    this.orderitems.forEach(orderitem => {
      if (orderitem.selected) {
        orderitems.push(orderitem.data);
      }
    });
    return orderitems;
  }

  public onOrderitemsChanged($event): void {
    if (this.order) {
      // this.order.orderitems = this.getSelectedOrderitems();
      this.storage.setSession('order', JSON.stringify(this.order), true);
    }
  }

  public next(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true);
    //this.navigationService.navigate([this.transform.URL('/order/${path.id}/${path.orderId}/orderitem-information')], true);
    });
  }
}
