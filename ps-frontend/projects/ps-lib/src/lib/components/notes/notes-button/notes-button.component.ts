import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopupETypes } from '../../../../model/intefaces';
import { Note } from '../../../../model/note';
import { EndpointService } from '../../../services/endpoint/endpoint.service';
import { Popup } from '../../../services/popup/popup.service';
import { NotesViewerComponent } from '../notes-viewer/notes-viewer.component';

@Component({
  selector: 'lib-notes-button',
  templateUrl: './notes-button.component.html',
  styleUrls: ['./notes-button.component.scss']
})
export class NotesButtonComponent implements OnInit {
  public _notes: Note[] = [];
  @Input() set notes(notes: Note[]) {
    this._notes = notes;
  }

  public _title: string;
  @Input() set title(title: string) {
    this._title = title;
  }

  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private endpoints: EndpointService,
    private popup: Popup
  ) { }

  ngOnInit(): void {
  }

  public getNoteText(): string {
    return 'Toon alle notities' + (!this._notes || this._notes.length === 0 ? ' ' : ' (' + this._notes.length + ')');
  }

  public popupNotes($event) {
    this.popup.add(this._title, NotesViewerComponent, {
      notes: this._notes,
    }, [{type: PopupETypes.close, event: () => {
      this.close.emit(PopupETypes.close);
    }}]);
  }
}
