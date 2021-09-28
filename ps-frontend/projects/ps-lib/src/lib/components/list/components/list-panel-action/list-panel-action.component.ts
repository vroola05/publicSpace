import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import { ApiService } from '../../../../services/api/api.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { ConfigService } from '../../../../services/config/config.service';
import { TransformService } from '../../../../services/transform/transform.service';

import { Action } from '../../../../../model/action';
import { Status } from '../../../../../model/status';

import { DropdownFieldComponent } from '../../../fields/dropdown-field/dropdown-field.component';
import { first } from 'rxjs/operators';


@Component({
  selector: 'lib-list-panel-action',
  templateUrl: './list-panel-action.component.html',
  styleUrls: ['./list-panel-action.component.scss']
})
export class ListPanelActionComponent implements OnInit {
  @ViewChild('statusComponent') statusComponent: DropdownFieldComponent;

  @Output() onEvent: EventEmitter<{ action: string, isNew: boolean, data: any }> = new EventEmitter();

  public statusItems: { name: string, value?: string, data?: any }[] = [];

  public _action: Action;
  @Input() set action(action: Action){
    this._action = new Action();
    if (action) {
      this._action.id = action.id;
      this._action.actionType = action.actionType;
      this._action.status = action.status;

      this.selectStatus();
    }
  }

  constructor(
    private apiService: ApiService,
    private config: ConfigService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) {
    this.getStatus();
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.transform.deleteVariable('action');
  }

  public selectStatus() {
    if (!this._action.status) {
      this.statusComponent.select(null);
      return;
    }

    if ( this.statusComponent) {
      const item = this.statusItems.find( type => !type.data || type.data.id === this._action.status.id);
      if (item) {
        this.statusComponent.select(item);
      }
    }
  }

  public onStatusChanged($event) {
    if (this.statusComponent.validate()) {
      this._action.status = $event.data;
    }
  }

  public getStatus(): void {
    const endpointT = this.config.getEndpoint('getStatus');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      this.statusItems.push({ name: 'Geen...', value: '-1', data: null });
      this.apiService.get(this.transform.URL(endpointT.endpoint)).pipe(first()).subscribe((statusses: Status[]) => {
        statusses.forEach(status => {
          this.statusItems.push({ name: status.name, value: String(status.id), data: status });
        });
        this.selectStatus();
      });
    }
  }

  public cancel(): void {
    this.onEvent.emit({
      action: 'cancel',
      isNew: false,
      data: null
    });
  }

  public onSave($event): void {
    const a = this.statusComponent.validate();
    if (a) {
      this.transform.setVariable('action', this._action);
      this.put(this._action);
    }
  }

  public put(action: Action): void {
    const endpointT = this.config.getEndpoint('putAction');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      let url = this.transform.URL(endpointT.endpoint);

      this.apiService.put(url, action).subscribe((a: Action) => {
        this.onEvent.emit({
          action: 'save',
          isNew: false,
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
          case 'status':
            this.statusComponent.addError(error.value);
            break;
        }
      });
    }
  }
}
