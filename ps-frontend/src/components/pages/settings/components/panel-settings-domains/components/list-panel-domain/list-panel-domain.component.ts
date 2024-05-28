import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { AuthorisationService } from '../../../../../../../services/authorisation/authorisation.service';
import { TransformService } from '../../../../../../../services/transform/transform.service';
import { EndpointService } from '../../../../../../../services/endpoint/endpoint.service';

import { Domain } from '../../../../../../../model/domain';
import { DomainType } from '../../../../../../../model/domain-type';

import { TextareaFieldComponent } from '../../../../../../fields/textarea-field/textarea-field.component';
import { DropdownFieldComponent } from '../../../../../../fields/dropdown-field/dropdown-field.component';

@Component({
  selector: 'app-list-panel-domain',
  templateUrl: './list-panel-domain.component.html',
  styleUrls: ['./list-panel-domain.component.scss']
})
export class ListPanelDomainComponent implements OnInit {
  @ViewChild('nameComponent') nameComponent: TextareaFieldComponent;
  @ViewChild('domainComponent') domainComponent: TextareaFieldComponent;
  @ViewChild('domainTypeComponent') public domainTypeComponent: DropdownFieldComponent;

  @Output() onEvent: EventEmitter<{ action: string, isNew: boolean, data: any }> = new EventEmitter();

  @Input() isNew = true;

  public delete = false;

  public domainTypeItems: { name: string, value?: string, data?: any }[] = [];

  public _domain: Domain;
  @Input() set domain(domain: Domain){
    this.delete = false;
    this._domain = new Domain();
    if (domain) {
      this._domain.id = domain.id;
      this._domain.name = domain.name;
      this._domain.domain = domain.domain;
      this._domain.domainType = domain.domainType;

      this.selectDomainType();

    }
  }
  
  constructor(
    private endpoints: EndpointService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) {
    this.getDomainTypes();
  }

  public ngOnInit(): void {
  }

  public selectDomainType() {
    if (!this._domain.domainType) {
      this.domainTypeComponent.select(null);
      return;
    }
    if ( this.domainTypeComponent) {
      this.domainTypeComponent.select(this.domainTypeItems.find( type => type.data.id === this._domain.domainType.id));
    }
  }

  public onDomainChanged($event) {
    if (this.domainComponent.validate()) {
      this._domain.domain = $event;
    }
  }

  public onNameChanged($event) {
    if (this.nameComponent.validate()) {
      this._domain.name = $event;
    }
  }
  

  public onDomainTypeChanged($event): void {
    this._domain.domainType = $event.data;
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
    const a = this.domainComponent.validate();
    if (a) {
      if (this.isNew) {
        this.postDomain(this._domain);
      } else {
        this.putDomain(this._domain);
      }
    }
  }

  public getDomainTypes(): void {
    this.endpoints.get('getDomainType').then((domainTypes: DomainType[]) => {
      domainTypes.forEach(domainType => {
        this.domainTypeItems.push({ name: domainType.name, value: String(domainType.id), data: domainType });
      });
      this.selectDomainType();
    });
  }


  public postDomain(domain: Domain): void {
    this.transform.setVariable('domain', domain);
    this.endpoints.post('postDomain', domain).then((d: Domain) => {
      this.transform.deleteVariable('domain');
      this.onEvent.emit({
        action: 'save',
        isNew: this.isNew,
        data: null
      });
    })
    .catch((response) => {
      this.transform.deleteVariable('domain');
      this.setErrors(response);
    });
  }

  public putDomain(domain: Domain): void {
    this.transform.setVariable('domain', domain);
    this.endpoints.put('putDomain', domain).then((d: Domain) => {
      this.transform.deleteVariable('domain');
      this.onEvent.emit({
        action: 'save',
        isNew: this.isNew,
        data: null
      });
    })
    .catch((response) => {
      this.transform.deleteVariable('domain');
      this.setErrors(response);
    });
  }

  public setErrors(response: any): void {
    if(response && response.error && response.error.errors) {
      const errors = response.error.errors as {field: string, value: string}[];
      errors.forEach(error => {
        switch(error.field) {
          case 'domain':
            this.domainComponent.addError(error.value);
            break;
        }
      });
    }
  }
}
