import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Note } from '../../../../../model/note';
import { PopupETypes, StatusTypes } from '../../../../../model/intefaces';
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

  public isEditable(): boolean {
    return (!this.order || !this.order.id) ? true : false;
  }

  public deleteCategory(category: Category): void {
    this.changed.emit({action: 'delete-category', data: this.order, category});
  }

  public edit(): void {
    this.changed.emit({action: 'edit', data: this.order});
  }

  public delete(): void {
    this.changed.emit({action: 'delete', data: this.order});
  }

  public isDone(): boolean {
    return this.order && this.order.status && this.order.status.id === StatusTypes.ORDER_DONE;
  }

  public isRejected(): boolean {
    return this.order && this.order.status && this.order.status.id === StatusTypes.ORDER_REJECTED;
  }

  public notAccept(): void {
    this.popup.add('Notitie niet akkoord', PopupConfirmComponent, {
    }, [{type: PopupETypes.ok, event: (text: string) => {
        const note = new Note();
        note.description = text;
        this.changed.emit({action: 'not-accept', data: {order: this.order, note}});
      }}]);
  }

  public accept(): void {
    this.changed.emit({action: 'accept', data: this.order});
  }

  public closeRejected(): void {
    this.changed.emit({action: 'close-rejected', data: this.order});
  }
}
