import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { PageConfig } from '../../../../model/domain-type-config';
import { Call } from '../../../../model/call';
import { Order } from '../../../../model/order';
import { DynamicPanel } from '../../../../model/intefaces';
import { OrderSpecificationItem } from '../../../../model/order-specification-item';
import { OrderNote } from '../../../../model/order-note';

import { EndpointService } from '../../../../services/endpoint/endpoint.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { ValidationService } from '../../../../services/validation/validation.service';

@Component({
  selector: 'app-panel-order-handle',
  templateUrl: './panel-order-handle.component.html',
  styleUrls: ['./panel-order-handle.component.scss']
})
export class PanelOrderHandleComponent implements DynamicPanel, OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  
  @Input() public order: Order;

  private _call: BehaviorSubject<Call> = new BehaviorSubject(null);
  @Input() public set call( call: Call) {
    this._call.next(call);
  }

  public get call() {
    return this._call.getValue();
  }

  public get callObservable(): Observable<Call> {
    return this._call.asObservable();
  }

  public note: string = '';
  @Output() changed: EventEmitter<any> = new EventEmitter<any>();
  @Input() public pageConfig: PageConfig;

  public orderSpecificationItems: { name: string, value?: string, selected?: boolean, data?: any }[] = [];

  constructor(
    private endpoints: EndpointService,
    private storage: StorageService,
    private validation: ValidationService
  ) { }
  

  public ngOnInit(): void {
    this.subscriptions.push(this.callObservable.subscribe(call => {
      if (call === null)
        return;

      const order = this.storage.getSession('order');
      if (order) {
        this.order = JSON.parse(order) as Order;

        if (!this.order.orderSpecificationItems) {
          this.order.orderSpecificationItems = [];
        }
      } else {
        this.order = call.orders[0];

        if (!this.order.orderSpecificationItems) {
          this.order.orderSpecificationItems = [];
        }
      }

      let orderNote = this.order.notes.find(note => note.definite == false);
      if (!orderNote) {
        orderNote = new OrderNote();
        orderNote.content = '';
        orderNote.definite = false;
        this.order.notes.push(orderNote);
      }
      this.note = orderNote.content;
      this.storage.setSession('order', JSON.stringify(this.order), true);      

      this.order.orderSpecificationItems.forEach(orderSpecificationItem => {
        this.orderSpecificationItems.push({
          name: orderSpecificationItem.contractSpecificationItem.specificationNumber + ' - ' + orderSpecificationItem.contractSpecificationItem.name, value: '' + orderSpecificationItem.contractSpecificationItem.id, 
          data: orderSpecificationItem,
          selected: true
        });
      });
    }));
  }
  
  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public getSelectedOrderitems(): OrderSpecificationItem[] {
    const orderSpecificationItems: OrderSpecificationItem[] = [];
    this.orderSpecificationItems.forEach(orderSpecificationItem => {
      if (orderSpecificationItem.selected) {
        orderSpecificationItems.push(orderSpecificationItem.data);
      }
    });
    return orderSpecificationItems;
  }

  public onOrderSpecificationItemChecked($event, i) {
    this.orderSpecificationItems[i].selected = $event;
    if (this.order && this.order.orderSpecificationItems) {
      this.order.orderSpecificationItems = this.getSelectedOrderitems();
      this.storage.setSession('order', JSON.stringify(this.order), true);
    }
  }

  public onOrderSpecificationItemAmountChanged($event, i) {
    if (this.order && this.orderSpecificationItems && this.orderSpecificationItems[i]) {
      const index = this.order.orderSpecificationItems.findIndex(orderSpecificationItem => orderSpecificationItem.contractSpecificationItem.id === this.orderSpecificationItems[i].data.contractSpecificationItem.id);
      if (index !== -1) {
        this.order.orderSpecificationItems[index].amount = $event;
      }
      this.storage.setSession('order', JSON.stringify(this.order), true);
    }
  }

  public onNoteChanged($event) {
    if (this.validation.validateField('handle-order', 'note')) {
      this.note = $event;
      let orderNote = this.order.notes.find(note => note.definite == false);
      orderNote.content = $event;
      this.storage.setSession('order', JSON.stringify(this.order), true);
    }
  }
}
