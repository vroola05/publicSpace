import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionTypeEnum, DynamicPanel, StatusTypes } from '../../../../model/intefaces';
import { Order } from '../../../../model/order';
import { Call } from '../../../../model/call';
import { PageConfig } from '../../../../model/domain-type-config';

@Component({
  selector: 'app-panel-order',
  templateUrl: './panel-order.component.html',
  styleUrls: ['./panel-order.component.scss']
})
export class PanelOrderComponent implements DynamicPanel, OnInit {
  private _call: Call;
  @Input() public set call( call: Call) {
    this._call = call;
    this.orders = call.orders;
    console.log(call);
  }
  public get call() {
    return this._call;
  }

  @Output() changed: EventEmitter<any> = new EventEmitter<any>();
  @Input() public pageConfig: PageConfig;
  
  @Input() public orders: Order[];
  @Input() public action: 'view' | 'new' | 'full' = 'view';
  

  constructor() { }

  public ngOnInit(): void {
  }

  public onChanged($event): void {
    this.changed.emit($event);
  }

  public getDays(date: Date): string {
    if (!date) {
      return 'Datum onbekend';
    }
    const now = new Date().setHours(0, 0, 0, 0);
    const dateStatus = new Date(date).setHours(0, 0, 0, 0);
    const days = Math.abs(Math.round(((now - dateStatus) / 1000) / (60 * 60 * 24)));
    return (days === 0 ? 'Vandaag' : (days === 1 ? days + ' dag' : days + ' dagen'));
  }

  public getToggleStyle(order: Order): string {
    return !order.actionType ? 'default' :
    (order.actionType.id === ActionTypeEnum.ORDER_DONE) ? 'primary' :
    (order.actionType.id === ActionTypeEnum.ORDER_REJECT) ? 'secondary' :
    (order.actionType.id === ActionTypeEnum.ORDER_CLOSE) ? 'grey' :
    (order.actionType.id === ActionTypeEnum.ORDER_CANCEL) ? 'grey' : 'default';
  }
  public getOrderStatus(order: Order): string {
    return order && order.status ? order.status && order.status.name ? order.status.name : 'Nieuw' : '';
  }

  public isOrderOpen(order: Order): boolean {
    return this.action === 'new' 
      || this.orders.length == 1 
      || order.actionType 
        && (order.actionType.id === ActionTypeEnum.ORDER_CREATE
        || order.actionType.id === ActionTypeEnum.ORDER_DONE
        || order.actionType.id === ActionTypeEnum.ORDER_REJECT);
  }
}
