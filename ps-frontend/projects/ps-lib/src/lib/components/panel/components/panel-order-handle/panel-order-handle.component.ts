import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageConfig } from '../../../../../model/domain-type-config';
import { Call } from '../../../../../model/call';
import { Order } from '../../../../../model/order';

import { DynamicPanel } from '../../../../../model/intefaces';
import { ContractSpecificationItem } from '../../../../../model/contract-specification-item';
import { EndpointService } from '../../../../services/endpoint/endpoint.service';
import { StorageService } from '../../../../services/storage/storage.service';


@Component({
  selector: 'lib-panel-order-handle',
  templateUrl: './panel-order-handle.component.html',
  styleUrls: ['./panel-order-handle.component.scss']
})
export class PanelOrderHandleComponent implements DynamicPanel, OnInit {
  @Input() public order: Order;

  private _call: Call;
  @Input() public set call( call: Call) {
    this._call = call;

    const order = this.storage.getSession('order');
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
  }

  public get call() {
    return this._call;
  }

  @Output() changed: EventEmitter<any> = new EventEmitter<any>();
  @Input() public pageConfig: PageConfig;

  public contractSpecificationItems: { name: string, value?: string, selected?: boolean, data?: any }[] = [];

  constructor(
    private endpoints: EndpointService,
    private storage: StorageService
  ) { }
  

  public ngOnInit(): void {
    
  }

  public onContractSpecificationItemChecked($event, i) {
  }

  public onContractSpecificationItemAmountChanged($event, i) {
    if (this.order && this.order.contractSpecificationItems && this.order.contractSpecificationItems[i]) {
      this.order.contractSpecificationItems[i].amount = $event;

      this.storage.setSession('order', JSON.stringify(this.order), true);
    }    
  }
}
