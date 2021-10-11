import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EndpointService } from '../../../../../../../services/endpoint/endpoint.service';

import { Status } from '../../../../../../../../model/status';

import { AuthorisationService } from '../../../../../../../services/authorisation/authorisation.service';
import { TransformService } from '../../../../../../../services/transform/transform.service';
import { ValidationService } from '../../../../../../../services/validation/validation.service';

import { TextareaFieldComponent } from '../../../../../../fields/textarea-field/textarea-field.component';

@Component({
  selector: 'lib-list-panel-status',
  templateUrl: './list-panel-status.component.html',
  styleUrls: ['./list-panel-status.component.scss']
})
export class ListPanelStatusComponent implements OnInit {
  @ViewChild('statusComponent') statusComponent: TextareaFieldComponent;
  
  @Output() onEvent: EventEmitter<{ action: string, isNew: boolean, data: any }> = new EventEmitter();

  @Input() isNew = true;

  public delete = false;

  public _status: Status;
  @Input() set status(status: Status){
    this.delete = false;
    this._status = new Status();
    if (status) {
      this._status.id = status.id;
      this._status.name = status.name;
    }
  }
  
  constructor(
    private endpoints: EndpointService,
    private validation: ValidationService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) { }

  public ngOnInit(): void {
  }

  public onStatusChanged($event) {
    if (this.statusComponent.validate()) {
      this._status.name = $event;
    }
  }

  public cancel(): void {
    this.onEvent.emit({
      action: 'cancel',
      isNew: this.isNew,
      data: null
    });
  }

  public onDeleteChanged($event): void {
    this.delete = $event;
  }

  public onSave($event): void {
    this.validation.clear();
    if (this.validation.validate('status')) {
      if (this.isNew) {
        this.postStatus(this._status);
      } else {
        this.putStatus(this._status);
      }
    }
  }

  public postStatus(status: Status): void {
    this.transform.setVariable('status', status);
    this.endpoints.post('postStatus', status).then((s: Status[]) => {
      this.transform.deleteVariable('status');
      this.onEvent.emit({
        action: 'save',
        isNew: this.isNew,
        data: null
      });
    })
    .catch((response) => {
      this.transform.deleteVariable('status');
      this.setErrors(response);
    });
  }

  public putStatus(status: Status): void {
    this.transform.setVariable('status', status);
    this.endpoints.put('putStatus', status).then((s: Status[]) => {
      this.transform.deleteVariable('status');
      this.onEvent.emit({
        action: 'save',
        isNew: this.isNew,
        data: null
      });
    })
    .catch((response) => {
      this.transform.deleteVariable('status');
      this.setErrors(response);
    });
  }

  public setErrors(response: any): void {
    if(response && response.error && response.error.errors) {
      const errors = response.error.errors as {field: string, value: string}[];
      this.validation.errors = errors;
    }
  }
}
