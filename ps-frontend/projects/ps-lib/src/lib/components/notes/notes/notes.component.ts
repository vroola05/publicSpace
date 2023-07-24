import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../../../../model/note';
import dayjs from 'dayjs';

@Component({
  selector: 'lib-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  public indexOpened: number;
  public _notes: Note[] = [];
  public openend: boolean[] = [];
  @Input() set notes(notes: Note[]) {
    this._notes = notes;

    this.openend = new Array(notes.length);
  }

  public _title: string;
  @Input() set title(title: string) {
    this._title = title;
  }

  constructor() { }

  ngOnInit(): void {
  }

  public isOpen(index: number): boolean {
    return this.openend && this.openend[index];
  }

  public toggle(index: number): void {
    if (this.openend[index]) {
      this.openend[index] = false;
    } else {
      this.openend[index] = true;
    }
  }

  public getDate(date: Date): string {
    return dayjs(date).format('DD-MM-YYYY HH:mm');
  }
}
