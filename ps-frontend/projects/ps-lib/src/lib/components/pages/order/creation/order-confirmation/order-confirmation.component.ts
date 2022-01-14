import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ActionService } from '../../../../../services/action/action.service';
import { ConfigService, PageTypes } from '../../../../../services/config/config.service';
import { NavigationService } from '../../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../../services/storage/storage.service';
import { PageAbstract } from '../../../page';
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
import { EndpointService } from '../../../../../services/endpoint/endpoint.service';
import { EnvironmentService } from '../../../../../services/environment/environment.service';
import { Category } from '../../../../../../model/category';

@Component({
  selector: 'lib-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent extends PageAbstract implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];
  public call: Call;
  public getUrlImage: string;
  public headerData: CallList;
  public buttonsLeft: ButtonT[];
  public buttonsRight: ButtonT[];
  public contractors: Contractor[] = [];
  private sending = false;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected navigationService: NavigationService,
    protected storage: StorageService,
    protected action: ActionService,
    protected transform: TransformService,
    protected authorisation: AuthorisationService,
    private endpoints: EndpointService,
    private config: ConfigService,
    private environmentService: EnvironmentService,
    private loader: Loader
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation);
  }

  public ngOnInit(): void {
    super.ngOnInit();

    this.storage.removeSession('index');
    this.transform.setVariable('environment', this.environmentService.get());

    this.page = this.config.getPage(PageTypes.orderConfirm);
    
    this.initCall();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

  public initCall(): void {
    const callData = this.storage.getSession('call');
    let call: Call;
    if (callData) {
      call = JSON.parse(callData) as Call;
    }

    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (!call || call.id !== id) {
      this.endpoints.get('getCallById').then((call: Call) => {
        this.call = call;
        this.headerData = this.config.transformCall(call);
        this.transform.setVariable('call', call);
      });
    } else {
      this.call = call;
      this.headerData = this.config.transformCall(call);
      this.transform.setVariable('call', call);
    }
  }  

  public getNewOrders(): Order[] {
    return this.call.orders.filter(order => order.id === undefined);
  }

  public getExistingOrders(): Order[] {
    return this.call.orders.filter(order => order.id !== undefined);
  }

  public onOrderChanged($event): void {
    switch ($event.action) {
      case 'delete':
        this.deleteOrder($event.data);
        break;
      case 'edit':
        this.editOrder($event.data);
        break;
      case 'delete-category':
        this.removeCategory($event.data, $event.category);
        break;
    }
  }

  public deleteOrder(order: Order): void {
    const item = this.findOrder(order);
    if (item) {
      this.call.orders.splice(this.call.orders.indexOf(item), 1);
      this.storage.setSession('call', JSON.stringify(this.call), true);
    }
  }

  public editOrder(order: Order): void {
    const item = this.findOrder(order);
    if (item) {
      this.storage.setSession('index', JSON.stringify(this.call.orders.indexOf(item)), true);
      this.navigationService.back();
    }
  }

  public findOrder(order: Order): Order {
    return this.call.orders.find(o => {
      if (o.contractorDomain.id !== order.contractorDomain.id || o.description !== order.description) {
        return false;
      }
      if (o.categories && order.categories) {
        for (let i = 0; i < o.categories.length; i++) {
          if (!order.categories[i] || order.categories[i].id !== o.categories[i].id) {
            return false;
          }
        }
      }
      return true;
    });
  }

  public removeCategory(order: Order, ordertype: Category): void {
    if (order) {
      const item = this.call.orders.find(o =>
        o.contractorDomain.id === order.contractorDomain.id
        && o.description === order.description
        && order.categories.indexOf(ordertype) > -1);
      if (item) {
        item.categories.splice(item.categories.indexOf(ordertype), 1);
        this.storage.setSession('call', JSON.stringify(this.call), true);
      }
    }
  }

  public validate(): boolean {
    if (!this.call.orders || this.call.orders.length <= 0) {
      return false;
    }
    for ( const order of this.call.orders) {
      if (!order.description) {
        return false;
      }
      if (!order.contractorDomain || !order.contractorDomain.id) {
        return false;
      }
    }
    return true;
  }

  public save() {
    const loaderId = this.loader.add('Bezig met opslaan!');
    this.endpoints.post('postOrders', this.call.orders).then((message: Message) => {
      this.storage.clearProcessData();
      this.navigationService.navigateHome();
      this.loader.remove(loaderId);
    })
    .catch(() => {
      this.loader.remove(loaderId);
      this.sending = false;
    });
  }

  public assign(): void {
    this.endpoints.post('putAssignUser', this.call.orders).then((message: Message) => {
      this.save();
    })
    .catch(() => {
      this.call.supervisor = null;
      this.sending = false;
    });
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
