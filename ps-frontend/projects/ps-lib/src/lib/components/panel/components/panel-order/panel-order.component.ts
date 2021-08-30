import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StatusTypes } from '../../../../../model/intefaces';
import { Order } from '../../../../../model/order';

@Component({
  selector: 'lib-panel-order',
  templateUrl: './panel-order.component.html',
  styleUrls: ['./panel-order.component.scss']
})
export class PanelOrderComponent implements OnInit {
  @Input() public title = '';
  @Input() public orders: Order[];
  @Input() public action: 'view' | 'new' | 'full' = 'view';
  @Output() changed: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  public ngOnInit(): void {
  }

  public onChanged($event): void {
    this.changed.emit($event);
  }

  public getDays(date: Date): string {
    const now = new Date().setHours(0, 0, 0, 0);
    const dateStatus = new Date(date).setHours(0, 0, 0, 0);
    const days = Math.abs(Math.round(((now - dateStatus) / 1000) / (60 * 60 * 24)));
    return (days === 0 ? 'Vandaag' : (days === 1 ? days + ' dag' : days + ' dagen'));
  }

  public getToggleStyle(order: Order): string {
    return this.action !== 'full'
      ? 'default' : (order.status && order.status.id === StatusTypes.ORDER_DONE) ? 'primary'
      : (order.status && order.status.id === StatusTypes.ORDER_REJECTED) ? 'secondary'
      : (order.status && (order.status.id === StatusTypes.ORDER_DONE_CLOSED
        || order.status.id === StatusTypes.ORDER_REJECTED_CLOSED)) ? 'grey' : 'default';
  }
  public getOrderStatus(order: Order): string {
    return order && order.status ? order.status && order.status.name ? order.status.name : 'Nieuw' : '';
  }

  public openOrder(order: Order): boolean {
    return (this.action === 'new' || this.action === 'full')
      && (order.status
      && (order.status.id === StatusTypes.ORDER_DONE || order.status.id === StatusTypes.ORDER_REJECTED) || !order.status);
  }
}
