import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first } from 'rxjs/operators';
import { PopupETypes } from '../../../../model/intefaces';
import { Note } from '../../../../model/note';
import { ApiService } from '../../../services/api/api.service';
import { ConfigService } from '../../../services/domain/domain.service';
import { Popup } from '../../../services/popup/popup.service';
import { TransformService } from '../../../services/transform/transform.service';
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

  public _url: string;
  @Input() set url(url: string) {
    this._url = url;
  }

  public _title: string;
  @Input() set title(title: string) {
    this._title = title;
  }

  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private config: ConfigService,
    private transform: TransformService,
    private apiService: ApiService,
    private popup: Popup
  ) { }

  ngOnInit(): void {
  }

  public getNoteText(): string {
    return 'Toon alle notities' + (!this._notes || this._notes.length === 0 ? ' ' : ' (' + this._notes.length + ')');
  }

  public popupNotes($event) {
    if (this._url && this.config.getEndpoint('getClearNotification').endpoint) {
      this.apiService.get(this.transform.URL(this.config.getEndpoint('getClearNotification').endpoint)).pipe(first()).subscribe();
    }

    this.popup.add(this._title, NotesViewerComponent, {
      notes: this._notes,
      url: this._url
    }, [{type: PopupETypes.close, event: () => {
      this.close.emit(PopupETypes.close);
    }}]);
  }
}
