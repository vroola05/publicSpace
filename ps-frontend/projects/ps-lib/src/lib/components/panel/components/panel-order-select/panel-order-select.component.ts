import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageConfig } from '../../../../../model/domain-type-config';
import { Call } from '../../../../../model/call';
import { Order } from '../../../../../model/order';

import { DynamicPanel } from '../../../../../model/intefaces';
import { ContractSpecificationItem } from '../../../../../model/contract-specification-item';
import { EndpointService } from '../../../../services/endpoint/endpoint.service';
import { StorageService } from '../../../../services/storage/storage.service';

@Component({
  selector: 'lib-panel-order-select',
  templateUrl: './panel-order-select.component.html',
  styleUrls: ['./panel-order-select.component.scss']
})
export class PanelOrderSelectComponent implements DynamicPanel, OnInit {
  @Input() public order: Order;

  private _call: Call;
  @Input() public set call( call: Call) {
    this._call = call;

    const order = this.storage.getSession('order');
    if (order) {
      this.order = JSON.parse(order) as Order;
      console.log(this.order.contractSpecificationItems);
    } else {
      this.order = call.orders[0];
      this.storage.setSession('order', JSON.stringify(this.order), true);
    }
  }

  public get call() {
    return this._call;
  }

  @Output() changed: EventEmitter<any> = new EventEmitter<any>();
  @Input() public pageConfig: PageConfig;
  public contractSpecificationItem: ContractSpecificationItem[];

  public contractSpecificationItems: { name: string, value?: string, selected?: boolean, data?: any }[] = [];

  constructor(
    private endpoints: EndpointService,
    private storage: StorageService
  ) { }
  

  public ngOnInit(): void {
    
    this.endpoints.get(this.pageConfig.getEndpoint('getContractSpecificationItems')).then((contractSpecificationItems: ContractSpecificationItem[]) => {
      contractSpecificationItems.forEach(contractSpecificationItem => {
        const contractSpecificationItemExisting = this.getContractSpecificationItem(contractSpecificationItem.id);
        this.contractSpecificationItems.push({
          name: contractSpecificationItem.specificationNumber + ' - ' + contractSpecificationItem.name, value: '' + contractSpecificationItem.id, 
          data: contractSpecificationItemExisting !== null ? contractSpecificationItemExisting : contractSpecificationItem,
          selected: !!contractSpecificationItemExisting
        });
      });
      
    });
  }

  public getContractSpecificationItem(id: number): ContractSpecificationItem {
    if (id && this.order && this.order.contractSpecificationItems) {
      return this.order.contractSpecificationItems.find(contractSpecificationItem => contractSpecificationItem.id === id);
    }
    return null;
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

  public onOrderitemsChanged($event): void {
    if (this.order) {
      this.order.contractSpecificationItems = this.getSelectedOrderitems();
      this.storage.setSession('order', JSON.stringify(this.order), true);
      console.log(this.order.contractSpecificationItems);
    }
  }
}
