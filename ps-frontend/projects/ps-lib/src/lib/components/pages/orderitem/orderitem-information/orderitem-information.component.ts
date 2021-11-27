import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActionService } from '../../../../services/action/action.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { ConfigService } from '../../../../services/config/config.service';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { TransformService } from '../../../../services/transform/transform.service';
import { EndpointService } from '../../../../services/endpoint/endpoint.service';
import { PageAbstract } from '../../page';
import { Call } from '../../../../../model/call';
import { CallList } from '../../../../../model/call-list';
import { Order } from '../../../../../model/order';
import { OrderitemMisc } from '../../../../../model/misc-order-item';
import { ButtonT } from '../../../../../model/template';
import { Message } from '../../../../../model/message';

import { Status } from '../../../../../model/status';
import { StatusTypes } from '../../../../../model/intefaces';

import { TextFieldComponent } from '../../../fields/text-field/text-field.component';
import { CheckboxFieldComponent } from '../../../fields/checkbox-field/checkbox-field.component';
import { TextareaFieldComponent } from '../../../fields/textarea-field/textarea-field.component';
import { Loader } from '../../../../services/loader/loader.service';

@Component({
  selector: 'lib-orderitem-information',
  templateUrl: './orderitem-information.component.html',
  styleUrls: ['./orderitem-information.component.scss']
})
export class OrderitemInformationComponent extends PageAbstract implements OnInit, OnDestroy {
  @ViewChildren('orderItemCheckedfield') orderItemCheckedfields: QueryList<CheckboxFieldComponent>;
  @ViewChildren('orderItemAmountfield') orderItemAmountfields: QueryList<TextFieldComponent>;

  @ViewChildren('miscOrderItemCheckedfield') miscOrderItemCheckedfields: QueryList<CheckboxFieldComponent>;
  @ViewChildren('miscOrderItemNamefield') miscOrderItemNamefields: QueryList<TextFieldComponent>;
  @ViewChildren('miscOrderItemAmountfield') miscOrderItemAmountfields: QueryList<TextFieldComponent>;
  @ViewChildren('miscOrderItemUnitfield') miscOrderItemUnitfields: QueryList<TextFieldComponent>;
  @ViewChildren('miscOrderItemCostfield') miscOrderItemCostfields: QueryList<TextFieldComponent>;

  @ViewChild('explanationField') public explanationField: TextareaFieldComponent;

  private subscription: Subscription[] = [];
  public call: Call;
  public order: Order;
  public getUrlImage: string;
  public headerData: CallList;
  public buttonsLeft: ButtonT[];
  public buttonsRight: ButtonT[];
  private sending = false;
  public orderitems: { name: string, value?: string, selected?: boolean, data?: any }[] = [];
  public miscOrderitems: { name: string, value?: string, selected?: boolean, data?: any }[] = [];
  public newMiscOrderitemId = -1000;
  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected navigationService: NavigationService,
    protected storage: StorageService,
    protected action: ActionService,
    protected transform: TransformService,
    private endpoints: EndpointService,
    protected authorisation: AuthorisationService,
    private config: ConfigService,
    private loader: Loader
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation);

    const order = this.storage.getSession('order');
    if (order) {
      this.initOrder(JSON.parse(order) as Order);
    }
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.getCall();
    this.buttonsLeft = this.config.template.order.information.buttonsLeft;
    this.buttonsRight = this.config.template.order.information.buttonsRight;
    if (this.config.template.order.information.pageType) {
      this.pageLayoutType = this.config.template.order.information.pageType;
    }

    //this.action.register('next', () => { this.next(); });
    //this.action.register('save', () => { this.save(); });
    //this.action.register('submit', () => { this.submit(); });
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

  public initOrder(order: Order): void {
    this.order = order;
    this.transform.setVariable('order', order);

    if (!this.order.explanation) {
      this.order.explanation = '';
    }
    if (!this.order.orderitems) {
      this.order.orderitems = [];
    }
    if (!this.order.miscOrderitems) {
      this.order.miscOrderitems = [];
    }

    this.order.orderitems.forEach(orderitem => {
      this.orderitems.push(
        {
          name: orderitem.quotationNumber + ' - ' + orderitem.name + ' (' + orderitem.unit + ')',
          value: '' + orderitem.quotationNumber,
          data: orderitem,
          selected: true
        }
      );
    });

    this.order.miscOrderitems.forEach(orderitem => {
      if (orderitem.id <= this.newMiscOrderitemId) {
        this.newMiscOrderitemId  = orderitem.id - 1;
      }
      this.miscOrderitems.push(
        {
          name: 'Diverse materialen',
          value: '',
          data: orderitem,
          selected: true
        }
      );
    });
  }

  public getCall(): void {
    this.endpoints.get('getDetailCall').then((call: Call) => {
      this.transform.setVariable('call', call);
      this.call = call;

      if (!this.order && this.call.orders && this.call.orders.length > 0) {
        this.initOrder(this.call.orders[0]);
        this.transform.setVariable('order', this.order);
        this.storage.setSession('order', JSON.stringify(this.order), true);
      }

      this.getUrlImage = this.transform.URL(this.config.getEndpoint('getImage').endpoint);
      this.headerData = this.config.transformCallOrder(call);
    });
  }

  public onOrderitemChecked($event): void {
    const item = this.order.orderitems.find(o => o.quotationNumber === $event.data.data.quotationNumber);
    if (item) {
      if (!$event.checked) {
        this.order.orderitems.splice(this.order.orderitems.indexOf(item), 1);
      }
    } else {
      if ($event.checked) {
        this.order.orderitems.push($event.data.data);
      }
    }
    this.storage.setSession('order', JSON.stringify(this.order), true);
  }

  public onOrderitemAmountChanged($event): void {
    const item = this.order.orderitems.find(o => o.quotationNumber === $event.data.data.quotationNumber);
    if (item) {
      item.amount = Number($event.value);
    }
    this.storage.setSession('order', JSON.stringify(this.order), true);
  }

  public onMiscOrderitemChecked($event): void {
    const item = this.order.miscOrderitems.find(o => o.id === $event.data.data.id);
    if (item) {
      if (!$event.checked) {
        this.order.miscOrderitems.splice(this.order.miscOrderitems.indexOf(item), 1);
      }
    } else {
      if ($event.checked) {
        this.order.miscOrderitems.push($event.data.data);
      }
    }
    this.storage.setSession('order', JSON.stringify(this.order), true);
  }

  public onMiscOrderitemNameChanged($event): void {
    const item = this.order.miscOrderitems.find(o => o.id === $event.data.data.id);
    if (item) {
      item.name = $event.value;
    }
    this.storage.setSession('order', JSON.stringify(this.order), true);
  }

  public onMiscOrderitemAmountChanged($event): void {
    const item = this.order.miscOrderitems.find(o => o.id === $event.data.data.id);
    if (item) {
      item.amount = Number($event.value);
    }
    this.storage.setSession('order', JSON.stringify(this.order), true);
  }

  public onMiscOrderitemUnitChanged($event): void {
    const item = this.order.miscOrderitems.find(o => o.id === $event.data.data.id);
    if (item) {
      item.unit = $event.value;
    }
    this.storage.setSession('order', JSON.stringify(this.order), true);
  }

  public onMiscOrderitemCostChanged($event): void {
    const item = this.order.miscOrderitems.find(o => o.id === $event.data.data.id);
    if (item) {
      item.cost = Number($event.value);
    }
    this.storage.setSession('order', JSON.stringify(this.order), true);
  }

  public onExplanationChanged($event): void {
    this.order.explanation = $event;
    this.storage.setSession('order', JSON.stringify(this.order), true);
  }

  public addMisc(): void {
    const orderitem = new OrderitemMisc();
    orderitem.id = --this.newMiscOrderitemId;
    orderitem.name = '';
    orderitem.unit = '';
    this.order.miscOrderitems.push(orderitem);
    this.storage.setSession('order', JSON.stringify(this.order), true);

    this.miscOrderitems.push(
      {
        name: 'Diverse materialen',
        value: '',
        data: orderitem,
        selected: true
      }
    );
  }

  public validateOrderitems(): boolean {
    let result = true;
    if (this.orderItemAmountfields && this.orderItemCheckedfields) {
      const orderItemCheckedfields = this.orderItemCheckedfields.toArray();
      const orderItemAmountfields = this.orderItemAmountfields.toArray();

      for (let i = 0; i < orderItemCheckedfields.length; i++) {
        if (orderItemCheckedfields[i].value) {
          if (!orderItemAmountfields[i].validate()) {
            result = false;
          }
        } else {
          orderItemAmountfields[i].clearValidators();
        }
      }
    }
    return result;
  }

  public validateMiscOrderitems(): boolean {
    let result = true;
    if (
      this.miscOrderItemCheckedfields
      && this.miscOrderItemNamefields
      && this.miscOrderItemAmountfields
      && this.miscOrderItemUnitfields
      && this.miscOrderItemCostfields
    ) {
      const miscOrderItemCheckedfields = this.miscOrderItemCheckedfields.toArray();
      const miscOrderItemNamefields = this.miscOrderItemNamefields.toArray();
      const miscOrderItemAmountfields = this.miscOrderItemAmountfields.toArray();
      const miscOrderItemUnitfields = this.miscOrderItemUnitfields.toArray();
      const miscOrderItemCostfields = this.miscOrderItemCostfields.toArray();

      for (let i = 0; i < miscOrderItemCheckedfields.length; i++) {
        if (miscOrderItemCheckedfields[i].value) {
          if (
            !miscOrderItemNamefields[i].validate()
            && !miscOrderItemAmountfields[i].validate()
            && !miscOrderItemUnitfields[i].validate()
            && !miscOrderItemCostfields[i].validate()
          ) {
            result = false;
          }
        } else {
          miscOrderItemNamefields[i].clearValidators();
          miscOrderItemAmountfields[i].clearValidators();
          miscOrderItemUnitfields[i].clearValidators();
          miscOrderItemCostfields[i].clearValidators();
        }
      }
    }
    return result;
  }

  public validate(): boolean {
    const a = this.validateOrderitems();
    const b = this.validateMiscOrderitems();
    const c = this.explanationField.validate();
    return a && b && c;
  }

  public back(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.validate()) {
        resolve(true);
        //this.navigationService.navigate([this.transform.URL('/order/${path.id}/${path.orderId}/orderitem-creation')], true);
      }
      reject(true);
    });
  }

  public next(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(this.validate());
      //this.navigationService.navigate([this.transform.URL('/order/${path.id}/${path.orderId}/orderitem-confirmation')], true);
    });
  }

  public save(): void {
    if (!this.sending && this.validate()) {
      this.send(false);
    }
  }

  public send(isExecuted: boolean): void {
    if (!this.sending) {
      this.sending = true;
      const loaderId = this.loader.add('Bezig met opslaan!');

      this.order.status = new Status();
      this.order.status.id = StatusTypes.ORDER_DONE;

      this.order.isExecuted = isExecuted;

      this.endpoints.put('putOrder', this.order).then((message: Message) => {
        this.storage.clearProcessData();
        this.navigationService.navigateHome();
        this.loader.remove(loaderId);
      })
      .catch(() => {
        this.loader.remove(loaderId);
        this.sending = false;
      });
    }
  }

  public submit(): void {
    this.send(true);
  }
}
