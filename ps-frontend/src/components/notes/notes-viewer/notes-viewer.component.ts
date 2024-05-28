import { Component, EventEmitter, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IPopup, NoteTypeEnum, PopupETypes } from '../../../model/intefaces';
import { Note, NoteType } from '../../../model/note';
import { TextareaFieldComponent } from '../../fields/textarea-field/textarea-field.component';
import { Subscription } from 'rxjs';
import { AuthorisationService } from '../../../services/authorisation/authorisation.service';
import { EndpointService } from '../../../services/endpoint/endpoint.service';
import { ValidationService } from '../../../services/validation/validation.service';

@Component({
  selector: 'app-notes-viewer',
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
    private authorisation: AuthorisationService,
    private validation: ValidationService

  ) { }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public changed(value: string): void {
    this.note.content = value;
  }

  public close(): void {
    this.events.emit({event: 'close'});
  }

  public submit(): void {

    if (this.validation.validate('notes')) {
      if (this.note.content && this.note.content.length > 0) {
        this.note.type = new NoteType();
        this.note.type.id = NoteTypeEnum.GENERIC;

        this.endpoints.post('postNote', this.note).then((note: Note) => {
            this._notes.unshift(note);
            this.events.emit({event: 'close'});
        });
      }
    }
  }
}
