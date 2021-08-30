import { Component, Input, OnInit, Output } from '@angular/core';
import { Order } from '../../../../../model/order';

@Component({
  selector: 'lib-panel-order-second',
  templateUrl: './panel-order-second.component.html',
  styleUrls: ['./panel-order-second.component.scss']
})
export class PanelOrderSecondComponent implements OnInit {
  @Input() public title = '';
  @Input() public order: Order;
  @Input() public action: 'view' | 'confirm' = 'view';

  constructor() { }

  public ngOnInit(): void {
  }

  public hasOrdertypes(): boolean {
    return this.order && this.order.ordertypes && this.order.ordertypes.length > 0;
  }

  public hasOrderitems(): boolean {
    return this.order
      && ((this.order.orderitems && this.order.orderitems.length > 0) ||
      (this.order.miscOrderitems && this.order.miscOrderitems.length > 0));
  }

  public printOrdertypes(): string {
    return this.order.ordertypes.map(ordertype => ordertype.name).join(', ');
  }

  public getDays(date: Date): string {
    const now = new Date().setHours(0, 0, 0, 0);
    const dateStatus = new Date(date).setHours(0, 0, 0, 0);
    const days = Math.abs(Math.round(((now - dateStatus) / 1000) / (60 * 60 * 24)));
    return (days === 0 ? 'Vandaag' : (days === 1 ? days + ' dag' : days + ' dagen'));
  }

  public getExecutor(): string {
    if (this.order && this.order.executor && this.order.executor.name) {
      return this.order.executor.name;
    }
    return '';
  }
}
