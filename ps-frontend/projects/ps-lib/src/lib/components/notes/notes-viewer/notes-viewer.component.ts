import { Component, EventEmitter, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Message } from '../../../../model/message';
import { IPopup, PopupETypes } from '../../../../model/intefaces';
import { Note } from '../../../../model/note';
import { TextareaFieldComponent } from '../../fields/textarea-field/textarea-field.component';
import { Subscription } from 'rxjs';
import moment from 'moment';
import { AuthorisationService } from '../../../services/authorisation/authorisation.service';
import { EndpointService } from '../../../services/endpoint/endpoint.service';

@Component({
  selector: 'lib-notes-viewer',
  templateUrl: './notes-viewer.component.html',
  styleUrls: ['./notes-viewer.component.scss']
})
export class NotesViewerComponent implements IPopup, OnDestroy, OnInit {
  @ViewChild('notesRef') notesRef: TextareaFieldComponent;
  public events: EventEmitter<{event: PopupETypes, data?: any}> = new EventEmitter<{event: PopupETypes, data?: any}>();

  protected subscriptions: Subscription[] = [];

  public _notes: Note[] = [];
  @Input() set notes(notes: Note[]) {
    this._notes = notes;
  }


  public _title: string;
  @Input() set title(title: string) {
    this._title = title;
  }

  public note: Note = new Note();

  constructor(
    private endpoints: EndpointService,
    private authorisation: AuthorisationService
  ) { }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public changed(value: string): void {
    this.note.description = value;
  }

  public close(): void {
    this.events.emit({event: PopupETypes.close});
  }

  public submit(): void {
    if (this.notesRef.validate()) {
      if (this.note.description && this.note.description.length > 0) {

        this.endpoints.put('postNote', this.note).then((message: Message) => {
          if (message.status < 300) {
            this.note.type = 'Aanvullende notitie';
            this.note.date = moment(new Date()).toISOString();
            this.note.supervisor = this.authorisation.user.name;
            this._notes.unshift(this.note);

            this.events.emit({event: PopupETypes.close});
          }
        });
      }
    }
  }
}
