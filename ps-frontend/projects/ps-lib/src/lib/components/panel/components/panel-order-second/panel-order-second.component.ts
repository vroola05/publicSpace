import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicPanel } from '../../../../../model/intefaces';
import { Call } from '../../../../../model/call';
import { Order } from '../../../../../model/order';
import { Category } from '../../../../../model/category';

@Component({
  selector: 'lib-panel-order-second',
  templateUrl: './panel-order-second.component.html',
  styleUrls: ['./panel-order-second.component.scss']
})
export class PanelOrderSecondComponent implements DynamicPanel, OnInit {
  private _call: Call;
  @Input() public set call( call: Call) {
    this._call = call;
    this.order = call.orders[0];
  }
  public get call() {
    return this._call;
  }

  @Output() changed: EventEmitter<any> = new EventEmitter<any>();

  @Input() public title = '';
  @Input() public order: Order;
  @Input() public action: 'view' | 'confirm' = 'view';

  constructor() { }

  public ngOnInit(): void {
  }

  public hasOrdertypes(): boolean {
    // return this.order && this.order.ordertypes && this.order.ordertypes.length > 0;
    return false;
  }

  public hasOrderitems(): boolean {
    // return this.order
    //   && ((this.order.orderitems && this.order.orderitems.length > 0) ||
    //   (this.order.miscOrderitems && this.order.miscOrderitems.length > 0));
    return false;
  }

  public getCategories(): string {
    return this.order.categories.map(category => category.name).join(', ');
  }

  public getDays(date: Date): string {
    const now = new Date().setHours(0, 0, 0, 0);
    const dateStatus = new Date(date).setHours(0, 0, 0, 0);
    const days = Math.abs(Math.round(((now - dateStatus) / 1000) / (60 * 60 * 24)));
    return (days === 0 ? 'Vandaag' : (days === 1 ? days + ' dag' : days + ' dagen'));
  }

  public getExecutor(): string {
    // if (this.order && this.order.executor && this.order.executor.name) {
    //   return this.order.executor.name;
    // }
    return '';
  }
}
