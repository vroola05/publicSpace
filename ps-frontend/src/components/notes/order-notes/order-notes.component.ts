import { Component, EventEmitter, Input, Output,  } from '@angular/core';
import { OrderNote } from '../../../model/order-note';
import dayjs from 'dayjs';
import { Order } from '../../../model/order';
import { ValidationService } from '../../../services/validation/validation.service';

@Component({
  selector: 'app-order-notes',
  templateUrl: './order-notes.component.html',
  styleUrls: ['./order-notes.component.scss']
})
export class OrderNotesComponent {
  public indexOpened: number;
  public orderNote: OrderNote = new OrderNote();
  public open: boolean = false;

  public _order: Order;
  @Input() set order(order: Order) {
    this._order = order;
  }
  
  get orderNotes() {
    if (!this._order.notes)
      return [];

    if (this._order.notes.length <= 1)
      return this._order.notes;

    return this.open ? this._order.notes : [this._order.notes[0]];
  }

  public _title: string;
  @Input() set title(title: string) {
    this._title = title;
  }

  @Output() changed: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private validation: ValidationService
  ) { }


  public getOrderNoteCount(): string {
    return this.hasComments() ? '' + this._order.notes.length : '';
  }

  public hasComments(): boolean {
    return this._order.notes && this._order.notes.length > 0;
  }

  public hasMoreComments(): boolean {
    return this._order.notes && this._order.notes.length > 1;
  }

  public toggle(): void {
    this.open = !this.open;
  }

  public getDate(date: Date): string {
    return dayjs(date).format('DD-MM-YYYY HH:mm');
  }

  public linebreak(input: string): string {
    return input.replaceAll('\n', '<br />')
  }

  public contentChanged($event): void {
    this.orderNote.content = $event;
  }

  public submit(): void {
    if (this.validation.validate('order-notes')) {
      if (this.orderNote.content && this.orderNote.content.length > 0) {
        this.orderNote.definite = true;
        this.changed.emit({action: 'order-note', data: this._order, note: this.orderNote});
        this.validation.clearForm('order-notes');
      }
    }
  }
}
