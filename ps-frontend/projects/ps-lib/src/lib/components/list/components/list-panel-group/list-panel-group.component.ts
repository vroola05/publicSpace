import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { ApiService } from '../../../../services/api/api.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { DomainService } from '../../../../services/domain/domain.service';
import { TransformService } from '../../../../services/transform/transform.service';

import { Group } from '../../../../../model/group';

import { TextareaFieldComponent } from '../../../fields/textarea-field/textarea-field.component';

@Component({
  selector: 'lib-list-panel-group',
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
    private apiService: ApiService,
    private domainService: DomainService,
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
    const a = this.groupComponent.validate();
    if (a) {
      if (this.isNew) {
        this.postGroup(this._group);
      } else {
        this.putGroup(this._group);
      }
    }
  }

  public postGroup(group: Group): void {
    const endpointT = this.domainService.getEndpoint('postGroup');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      let url = this.transform.URL(endpointT.endpoint);
      this.apiService.post(url, group).subscribe((d: Group) => {
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

  public putGroup(group: Group): void {
    const endpointT = this.domainService.getEndpoint('putGroup');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      this.transform.setVariable('group', group);
      let url = this.transform.URL(endpointT.endpoint);
      this.transform.deleteVariable('group');
      this.apiService.put(url, group).subscribe((d: Group) => {
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
            this.groupComponent.addError(error.value);
            break;
        }
      });
    }
  }
}
