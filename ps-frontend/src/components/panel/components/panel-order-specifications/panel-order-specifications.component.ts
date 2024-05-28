import { Component, Input, OnInit } from '@angular/core';
import { OrderSpecificationItem } from '../../../../model/order-specification-item';
import { Order } from '../../../../model/order';

@Component({
  selector: 'app-panel-order-specifications',
  templateUrl: './panel-order-specifications.component.html',
  styleUrls: ['./panel-order-specifications.component.scss']
})
export class PanelOrderSpecificationsComponent implements OnInit {
  @Input() public order: Order;
  
  constructor() { }

  ngOnInit(): void {
  }

  public hasOrderSpecificationItems(): boolean {
    return this.order && this.order.orderSpecificationItems && this.order.orderSpecificationItems.length > 0;
  }
  
  public getPrice(orderSpecificationItem: OrderSpecificationItem): string {
    const amount = Number(orderSpecificationItem.amount);
    
    const price = Number((orderSpecificationItem.contractSpecificationItem.price ? orderSpecificationItem.contractSpecificationItem.price.replace(',', '.') : orderSpecificationItem.contractSpecificationItem.price));
    if (!isNaN(amount) && !isNaN(price)) {
      return Number(amount * price).toFixed(2);
    }
    
    return Number(0).toFixed(2);
  }

  public getTotalPrice(orderSpecificationItems: OrderSpecificationItem[]): string {
    let total = 0;
    orderSpecificationItems.forEach(orderSpecificationItem => {
      total += Number(this.getPrice(orderSpecificationItem));
    });
    return total.toFixed(2);
  }
}
