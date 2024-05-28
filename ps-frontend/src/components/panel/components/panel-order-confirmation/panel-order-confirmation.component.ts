import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PageConfig } from '../../../../model/domain-type-config';
import { Call } from '../../../../model/call';
import { Order } from '../../../../model/order';

import { DynamicPanel } from '../../../../model/intefaces';
import { ContractSpecificationItem } from '../../../../model/contract-specification-item';
import { EndpointService } from '../../../../services/endpoint/endpoint.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-panel-order-confirmation',
  templateUrl: './panel-order-confirmation.component.html',
  styleUrls: ['./panel-order-confirmation.component.scss']
})
export class PanelOrderConfirmationComponent implements DynamicPanel, OnInit, OnDestroy {
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

  public note: string = '';

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
        if (!this.order.orderSpecificationItems) {
          this.order.orderSpecificationItems = [];
        }

        let orderNote = this.order.notes.find(note => note.definite == false);
        if (orderNote) {
          this.note = orderNote.content;
        }
      }
    }));
  }
  
  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
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

  public hasOrderSpecificationItems(): boolean {
    return this.order && this.order.orderSpecificationItems && this.order.orderSpecificationItems.length > 0;
  }
}
