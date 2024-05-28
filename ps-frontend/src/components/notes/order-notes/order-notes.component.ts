import { Component, Input, OnInit } from '@angular/core';
import { OrderNote } from '../../../model/order-note';
import dayjs from 'dayjs';

@Component({
  selector: 'app-order-notes',
  templateUrl: './order-notes.component.html',
  styleUrls: ['./order-notes.component.scss']
})
export class OrderNotesComponent implements OnInit {
  public indexOpened: number;
  public _orderNotes: OrderNote[] = [];
  public open: boolean = false;
  @Input() set orderNotes(orderNotes: OrderNote[]) {
    this._orderNotes = orderNotes;
  }

  get orderNotes() {
    if (!this._orderNotes)
      return [];

    if (this._orderNotes.length <= 1)
      return this._orderNotes;

    return this.open ? this._orderNotes : [this._orderNotes[0]];
  }

  public _title: string;
  @Input() set title(title: string) {
    this._title = title;
  }

  constructor() { }

  ngOnInit(): void {
  }

  public hasComments(): boolean {
    return this._orderNotes && this._orderNotes.length > 0;
  }

  public hasMoreComments(): boolean {
    return this._orderNotes && this._orderNotes.length > 1;
  }

  public toggle(): void {
    this.open = !this.open;
  }

  public getDate(date: Date): string {
    return dayjs(date).format('DD-MM-YYYY HH:mm');
  }
}
