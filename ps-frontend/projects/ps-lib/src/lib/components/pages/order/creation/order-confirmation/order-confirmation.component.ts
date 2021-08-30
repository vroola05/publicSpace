import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ActionService } from '../../../../../services/action/action.service';
import { ApiService } from '../../../../../services/api/api.service';
import { DomainService } from '../../../../../services/domain/domain.service';
import { NavigationService } from '../../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../../services/storage/storage.service';
import { Page } from '../../../page';
import { Call } from '../../../../../../model/call';
import { CallList } from '../../../../../../model/call-list';
import { Ordertype } from '../../../../../../model/order-type';
import { Order } from '../../../../../../model/order';
import { Contractor } from '../../../../../../model/contractor';
import { Message } from '../../../../../../model/message';
import { ButtonT } from '../../../../../../model/template';
import { Loader } from '../../../../../services/loader/loader.service';
import { AuthorisationService } from '../../../../../services/authorisation/authorisation.service';
import { TransformService } from '../../../../../services/transform/transform.service';

@Component({
  selector: 'lib-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent extends Page implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];
  public call: Call;
  public getUrlImages: string;
  public getUrlImage: string;
  public postUrlImage: string;
  public postUrlNote: string;
  public headerData: CallList;
  public buttonsLeft: ButtonT[];
  public buttonsRight: ButtonT[];
  public contractors: Contractor[] = [];
  public orders: Order[] = [];
  private sending = false;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected navigationService: NavigationService,
    protected storage: StorageService,
    protected action: ActionService,
    protected transform: TransformService,
    protected authorisation: AuthorisationService,
    private domain: DomainService,
    private apiService: ApiService,
    private loader: Loader
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation);

    const order = this.storage.getSession('order');
    if (order) {
      this.orders = JSON.parse(order) as Order[];
    }
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.getCall();

    this.buttonsLeft = this.domain.config.order.confirmation.buttonsLeft;
    this.buttonsRight = this.domain.config.order.confirmation.buttonsRight;
    if (this.domain.config.order.confirmation.pageType) {
      this.pageType = this.domain.config.order.confirmation.pageType;
    }

    this.action.register('extra', () => { this.extra(); });
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

  public getCall(): void {
    this.subscription.push(this.apiService.get(
      this.transform.URL(this.domain.getEndpoint('getDetailCall').endpoint)).subscribe((call: Call) => {
        this.transform.setVariable('call', call);
        this.call = call;
        this.getUrlImages = this.transform.URL(this.domain.getEndpoint('getImages').endpoint);
        this.getUrlImage = this.transform.URL(this.domain.getEndpoint('getImage').endpoint);
        this.postUrlImage = this.transform.URL(this.domain.getEndpoint('postImage').endpoint);
        this.postUrlNote = this.transform.URL(this.domain.getEndpoint('postNote').endpoint);
        this.headerData = this.domain.transformCall(call);
    }));
  }

  public onOrderChanged($event): void {
    switch ($event.action) {
      case 'delete':
        this.deleteOrder($event.data);
        break;
      case 'edit':
        this.editOrder($event.data);
        break;
      case 'delete-ordertype':
        this.removeOrdertype($event.data, $event.ordertype);
        break;
    }
  }

  public deleteOrder(order: Order): void {
    const item = this.findOrder(order);
    if (item) {
      this.orders.splice(this.orders.indexOf(item), 1);
      this.storage.setSession('order', JSON.stringify(this.orders), true);
    }
  }

  public editOrder(order: Order): void {
    const item = this.findOrder(order);
    if (item) {
      this.storage.setSession('index', JSON.stringify(this.orders.indexOf(item)), true);
      this.navigationService.back();
    }
  }

  public findOrder(order: Order): Order {
    return this.orders.find(o => {
      if (o.contractor.id !== order.contractor.id || o.description !== order.description) {
        return false;
      }
      if (o.ordertypes && order.ordertypes) {
        for (let i = 0; i < o.ordertypes.length; i++) {
          if (!order.ordertypes[i] || order.ordertypes[i].id !== o.ordertypes[i].id) {
            return false;
          }
        }
      }
      return true;
    });
  }

  public removeOrdertype(order: Order, ordertype: Ordertype): void {
    if (order) {
      const item = this.orders.find(o =>
        o.contractor.id === order.contractor.id
        && o.description === order.description
        && order.ordertypes.indexOf(ordertype) > -1);
      if (item) {
        item.ordertypes.splice(item.ordertypes.indexOf(ordertype), 1);
        this.storage.setSession('order', JSON.stringify(this.orders), true);
      }
    }
  }

  public extra() {
    this.storage.setSession('index', JSON.stringify(this.orders.length), true);
    this.navigationService.back();
  }

  public validate(): boolean {
    if (!this.orders || this.orders.length <= 0) {
      return false;
    }
    for ( const order of this.orders) {
      if (!order.description) {
        return false;
      }
      if (!order.contractor || !order.contractor.id) {
        return false;
      }
    }
    return true;
  }

  public save() {
    const loaderId = this.loader.add('Bezig met opslaan!');
    const url = this.transform.URL(this.domain.getEndpoint('postOrders').endpoint);
    this.subscription.push(this.apiService.post(url, this.orders).subscribe((message: Message) => {
      this.storage.clearProcessData();
      this.navigationService.navigateHome();
      this.loader.remove(loaderId);
    },
    () => {
      this.loader.remove(loaderId);
      this.sending = false;
    }));
  }

  public assign(): void {
    const url = this.transform.URL(this.domain.getEndpoint('putAssignUser').endpoint);
    this.subscription.push(this.apiService.put(url, this.orders).subscribe((message: Message) => {
      this.save();
    },
    () => {
      this.call.supervisor = null;
      this.sending = false;
    }));
  }

  public submit(): void {
    if (!this.sending && this.validate()) {
      this.sending = true;

      if (this.call.supervisor && this.call.supervisor.username) {
        this.save();
      } else {
        this.assign();
      }
    }
  }
}
