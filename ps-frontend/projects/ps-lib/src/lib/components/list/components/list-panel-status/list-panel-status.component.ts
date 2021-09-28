import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Status } from '../../../../../model/status';

import { ApiService } from '../../../../services/api/api.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { ConfigService } from '../../../../services/config/config.service';
import { TransformService } from '../../../../services/transform/transform.service';

import { TextareaFieldComponent } from '../../../fields/textarea-field/textarea-field.component';

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
    private apiService: ApiService,
    private config: ConfigService,
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
    const a = this.statusComponent.validate();
    if (a) {
      if (this.isNew) {
        this.postStatus(this._status);
      } else {
        this.putStatus(this._status);
      }
    }
  }

  public postStatus(status: Status): void {
    const endpointT = this.config.getEndpoint('postStatus');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      let url = this.transform.URL(endpointT.endpoint);
      this.apiService.post(url, status).subscribe((d: Status) => {
        this.onEvent.emit({
          action: 'save',
          isNew: this.isNew,
          data: null
        });
      },
      (response) => {
        this.setErrors(response);
      });
    }
  }

  public putStatus(status: Status): void {
    const endpointT = this.config.getEndpoint('putStatus');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      this.transform.setVariable('status', status);
      let url = this.transform.URL(endpointT.endpoint);
      this.transform.deleteVariable('status');
      this.apiService.put(url, status).subscribe((d: Status) => {
        this.onEvent.emit({
          action: 'save',
          isNew: this.isNew,
          data: null
        });
      },
      (response) => {
        this.setErrors(response);
      });
    }
  }

  public setErrors(response: any): void {
    if(response && response.error && response.error.errors) {
      const errors = response.error.errors as {field: string, value: string}[];
      errors.forEach(error => {
        switch(error.field) {
          case 'name':
            this.statusComponent.addError(error.value);
            break;
        }
      });
    }
  }
}
