import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PageConfig } from '../../../../../model/domain-type-config';
import { Call } from '../../../../../model/call';
import { Order } from '../../../../../model/order';

import { DynamicPanel } from '../../../../../model/intefaces';
import { ContractSpecificationItem } from '../../../../../model/contract-specification-item';
import { EndpointService } from '../../../../services/endpoint/endpoint.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ValidationService } from '../../../../services/validation/validation.service';

@Component({
  selector: 'lib-panel-order-handle',
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

  public contractSpecificationItems: { name: string, value?: string, selected?: boolean, data?: any }[] = [];

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
      this.note = this.storage.getSession('note');
      if (order) {
        this.order = JSON.parse(order) as Order;
        if (!this.order.contractSpecificationItems) {
          this.order.contractSpecificationItems = [];
        }
      } else {
        this.order = call.orders[0];
        if (!this.order.contractSpecificationItems) {
          this.order.contractSpecificationItems = [];
        }
        this.storage.setSession('order', JSON.stringify(this.order), true);
      }

      this.order.contractSpecificationItems.forEach(contractSpecificationItem => {
        this.contractSpecificationItems.push({
          name: contractSpecificationItem.specificationNumber + ' - ' + contractSpecificationItem.name, value: '' + contractSpecificationItem.id, 
          data: contractSpecificationItem,
          selected: true
        });
      });
    }));
  }
  
  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public getSelectedOrderitems(): ContractSpecificationItem[] {
    const contractSpecificationItems: ContractSpecificationItem[] = [];
    this.contractSpecificationItems.forEach(contractSpecificationItem => {
      if (contractSpecificationItem.selected) {
        contractSpecificationItems.push(contractSpecificationItem.data);
      }
    });
    return contractSpecificationItems;
  }

  public onContractSpecificationItemChecked($event, i) {
    this.contractSpecificationItems[i].selected = $event;
    if (this.order && this.order.contractSpecificationItems) {
      this.order.contractSpecificationItems = this.getSelectedOrderitems();
      this.storage.setSession('order', JSON.stringify(this.order), true);
    }
  }

  public onContractSpecificationItemAmountChanged($event, i) {
    if (this.order && this.contractSpecificationItems && this.contractSpecificationItems[i]) {
      const index = this.order.contractSpecificationItems.findIndex(contractSpecificationItem => contractSpecificationItem.id === this.contractSpecificationItems[i].data.id);
      if (index !== -1) {
        this.order.contractSpecificationItems[index].amount = $event;
      }
      this.storage.setSession('order', JSON.stringify(this.order), true);
    }
  }

  public onDescriptionChanged($event) {
    if (this.validation.validateField('handle-order', 'description')) {
      this.note = $event;
      this.storage.setSession('note', this.note, true);
    }
  }
}
