import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PageConfig } from '../../../../../model/domain-type-config';
import { Call } from '../../../../../model/call';
import { Order } from '../../../../../model/order';

import { DynamicPanel } from '../../../../../model/intefaces';
import { ContractSpecificationItem } from '../../../../../model/contract-specification-item';
import { EndpointService } from '../../../../services/endpoint/endpoint.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { OrderSpecificationItem } from 'projects/ps-lib/src/model/order-specification-item';

@Component({
  selector: 'lib-panel-order-select',
  templateUrl: './panel-order-select.component.html',
  styleUrls: ['./panel-order-select.component.scss']
})
export class PanelOrderSelectComponent implements DynamicPanel, OnInit, OnDestroy {
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

  @Output() changed: EventEmitter<any> = new EventEmitter<any>();
  @Input() public pageConfig: PageConfig;
  public contractSpecificationItem: ContractSpecificationItem[];

  public orderSpecificationItems: { name: string, value?: string, selected?: boolean, data?: any }[] = [];

  constructor(
    private endpoints: EndpointService,
    private storage: StorageService
  ) { }
  

  public ngOnInit(): void {
     this.subscriptions.push(this.callObservable.subscribe(call => {
      if (call === null)
        return;
      const order = this.storage.getSession('order');
      if (order) {
        this.order = JSON.parse(order) as Order;
      } else {
        this.order = call.orders[0];
        this.storage.setSession('order', JSON.stringify(this.order), true);
      }
      this.endpoints.get(this.pageConfig.getEndpoint('getContractSpecificationItems')).then((contractSpecificationItems: ContractSpecificationItem[]) => {
        const orderSpecificationItemsTemp = [];
        contractSpecificationItems.forEach(contractSpecificationItem => {
          let isSelected = true;
          let orderSpecificationItem: OrderSpecificationItem = this.getOrderSpecificationItem(contractSpecificationItem.id);
          if (!orderSpecificationItem) {
            isSelected = false;
            orderSpecificationItem = new OrderSpecificationItem();
            orderSpecificationItem.contractSpecificationItem = contractSpecificationItem;
          }
          orderSpecificationItemsTemp.push({
            name: contractSpecificationItem.specificationNumber + ' - ' + contractSpecificationItem.name, value: '' + contractSpecificationItem.id, 
            data: orderSpecificationItem,
            selected: isSelected
          });
        });
        this.orderSpecificationItems = orderSpecificationItemsTemp;
      });
    }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public getOrderSpecificationItem(id: number): OrderSpecificationItem {
    if (id && this.order && this.order.orderSpecificationItems) {
      return this.order.orderSpecificationItems.find(orderSpecificationItem => orderSpecificationItem.contractSpecificationItem.id === id);
    }
    return null;
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

  public onOrderitemsChanged($event): void {
    if (this.order) {
      this.order.orderSpecificationItems = this.getSelectedOrderitems();
      this.storage.setSession('order', JSON.stringify(this.order), true);
    }
  }
}
