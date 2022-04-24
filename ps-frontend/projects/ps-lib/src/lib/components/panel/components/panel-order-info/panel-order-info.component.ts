import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Note } from '../../../../../model/note';
import { ActionTypeEnum, PopupETypes, StatusTypes } from '../../../../../model/intefaces';
import { Order } from '../../../../../model/order';
import { Popup } from '../../../../services/popup/popup.service';
import { PopupConfirmComponent } from '../../../popup/components/popup-confirm/popup-confirm.component';
import { Category } from '../../../../../model/category';


@Component({
  selector: 'lib-panel-order-info',
  templateUrl: './panel-order-info.component.html',
  styleUrls: ['./panel-order-info.component.scss']
})
export class PanelOrderInfoComponent implements OnInit {
  @Input() public order: Order;
  @Input() public action: 'view' | 'new' | 'full' = 'view';
  @Output() changed: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private popup: Popup
  ) { }

  public ngOnInit(): void {
  }

  public hasCategories(): boolean {
    return this.order && this.order.categories && this.order.categories.length > 0;
  }

  public onOrderDeleteCategory(category: Category): void {
    this.changed.emit({action: 'delete-category', data: this.order, category});
  }

  public onOrderEdit(): void {
    this.changed.emit({action: 'edit', data: this.order});
  }

  public onOrderDelete(): void {
    this.changed.emit({action: 'delete', data: this.order});
  }


  public isCreating(): boolean {
    return (!this.order || !this.order.id) ? true : false;
  }

  public hasActionType(actionTypeId: number): boolean {
    return this.order && this.order.actionType && this.order.actionType.id === actionTypeId;
  }

  public isNew(): boolean {
    return this.hasActionType(ActionTypeEnum.ORDER_CREATE);
  }

  public isDone(): boolean {
    return this.hasActionType(ActionTypeEnum.ORDER_DONE);
  }

  public isRejected(): boolean {
    return this.hasActionType(ActionTypeEnum.ORDER_REJECT);
    
  }

  public onOrderCancel(): void {
    this.popup.add('Notitie opdracht annuleren', PopupConfirmComponent, {
    }, [{type: PopupETypes.ok, event: (content: string) => {
        const note = new Note();
        note.content = content;
        this.changed.emit({action: 'order-cancel', data: this.order, note});
      }}]);
  }

  public onOrderReject(): void {
    this.popup.add('Notitie niet akkoord', PopupConfirmComponent, {
    }, [{type: PopupETypes.ok, event: (content: string) => {
        const note = new Note();
        note.content = content;
        this.changed.emit({action: 'order-reject', data: {order: this.order, note}});
      }}]);
  }

  public onOrderAccept(): void {
    this.changed.emit({action: 'order-accept', data: this.order});
  }

  public onOrderClose(): void {
    this.changed.emit({action: 'order-close', data: this.order});
  }
}
