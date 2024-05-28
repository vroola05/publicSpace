import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { IPopup, PopupETypes } from '../../../../model/intefaces';
import { TextareaFieldComponent } from '../../../fields/textarea-field/textarea-field.component';

@Component({
  selector: 'app-popup-confirm',
  templateUrl: './popup-confirm.component.html',
  styleUrls: ['./popup-confirm.component.scss']
})
export class PopupConfirmComponent implements IPopup, OnInit {
  @ViewChild('ref') ref: TextareaFieldComponent = {} as TextareaFieldComponent;
  public events: EventEmitter<{event: PopupETypes, data?: any}> = new EventEmitter<{event: PopupETypes, data?: any}>();

  public description = '';
  public text = '';
  

  constructor() { }

  public ngOnInit(): void {
  }

  public onTextChanged($event: any): void {
    this.text = $event;
  }

  public ok(): void {
    if (this.ref.validate()) {
      this.events.emit({event: 'ok', data: this.text});
    }
  }

  public cancel(): void {
    this.events.emit({ event: 'cancel'});
  }
}
