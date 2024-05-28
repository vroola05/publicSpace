import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { AuthorisationService } from '../../../../../../../services/authorisation/authorisation.service';
import { EndpointService } from '../../../../../../../services/endpoint/endpoint.service';
import { TransformService } from '../../../../../../../services/transform/transform.service';
import { ValidationService } from '../../../../../../../services/validation/validation.service';

import { Group } from '../../../../../../../model/group';

import { TextareaFieldComponent } from '../../../../../../fields/textarea-field/textarea-field.component';


@Component({
  selector: 'app-list-panel-group',
  templateUrl: './list-panel-group.component.html',
  styleUrls: ['./list-panel-group.component.scss']
})
export class ListPanelGroupComponent implements OnInit {
  @ViewChild('groupComponent') groupComponent: TextareaFieldComponent;
  
  @Output() onEvent: EventEmitter<{ action: string, isNew: boolean, data: any }> = new EventEmitter();

  @Input() isNew = true;

  public delete = false;

  public _group: Group;
  @Input() set group(group: Group){
    this.delete = false;
    this._group = new Group();
    if (group) {
      this._group.id = group.id;
      this._group.name = group.name;
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

  public onGroupChanged($event) {
    if (this.groupComponent.validate()) {
      this._group.name = $event;
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
    if (this.validation.validate('group')) {
      if (this.isNew) {
        this.postGroup(this._group);
      } else {
        this.putGroup(this._group);
      }
    }
  }

  public postGroup(group: Group): void {
    this.transform.setVariable('group', group);
    this.endpoints.post('postGroup', group).then((d: Group) => {
      this.transform.deleteVariable('group');
      this.onEvent.emit({
        action: 'save',
        isNew: this.isNew,
        data: null
      });
    })
    .catch((response) => {
      this.transform.deleteVariable('group');
      this.setErrors(response);
    });
  }

  public putGroup(group: Group): void {
    this.transform.setVariable('group', group);
    this.endpoints.put('putGroup', group).then((d: Group) => {
      this.transform.deleteVariable('group');
      this.onEvent.emit({
        action: 'save',
        isNew: this.isNew,
        data: null
      });
    })
    .catch((response) => {
      this.transform.deleteVariable('group');
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
