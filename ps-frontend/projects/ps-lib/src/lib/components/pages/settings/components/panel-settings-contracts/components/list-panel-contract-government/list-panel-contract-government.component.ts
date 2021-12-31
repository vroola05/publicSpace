import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { EndpointService } from '../../../../../../../services/endpoint/endpoint.service';
import { ValidationService } from '../../../../../../../services/validation/validation.service';
import { AuthorisationService } from '../../../../../../../services/authorisation/authorisation.service';
import { TransformService } from '../../../../../../../services/transform/transform.service';

import { Contract } from '../../../../../../../../model/contract';
import { DropdownFieldComponent } from '../../../../../../fields/dropdown-field/dropdown-field.component';
import { Domain } from '../../../../../../../../model/domain';
import { ListPanelContractComponent } from '../list-panel-contract';

@Component({
  selector: 'lib-list-panel-contract-government',
  templateUrl: './list-panel-contract-government.component.html',
  styleUrls: ['./list-panel-contract-government.component.scss']
})
export class ListPanelContractGovernmentComponent implements ListPanelContractComponent, OnInit {
  @ViewChild('domainComponent') domainComponent: DropdownFieldComponent;
  
  @Output() onEvent: EventEmitter<{ action: string, isNew: boolean, data: any }> = new EventEmitter();

  @Input() isNew = true;

  public delete = false;

  public _contract: Contract;
  @Input() set contract(contract: Contract){
    this.delete = false;
    this._contract = new Contract();
    if (contract) {
      this._contract.id = contract.id;
      this._contract.accepted = contract.accepted;
      this._contract.dateCreated = contract.dateCreated;
      this._contract.domain = contract.domain;
      this.selectDomain();
    }
  }

  public domainItems: { name: string, value?: string, data?: any }[] = [];
  
  constructor(
    private endpoints: EndpointService,
    private validation: ValidationService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) {}

  public ngOnInit(): void {
    this.getDomainContractors();
  }

  public getDomainContractors(): void {
    this.endpoints.get('getDomainContractors').then((domains: Domain[]) => {
      const domainItems = [];
      domains.forEach(domain => {
        domainItems.push({ name: this.getDomainName(domain), value: '' + domain.id, data: domain });
      })
      this.domainItems = domainItems;
      this.selectDomain();
    });
  }

  public getDomainName(domain: Domain): string {
    return domain.company ? domain.company.name + ' - ' + domain.name : domain.name;
  }

  public selectDomain() {
    if ( this.domainComponent) {
      if (!this._contract || !this._contract.domain) {
        this.domainComponent.select(null);
        return;
      }
      this.domainComponent.select(this.domainItems.find( type => !type.data || type.data.id === this._contract.domain.id));
    }
  }

  public onDomainChanged($event) {
    if (this.domainComponent.validate()) {
      this._contract.domain = $event.data;
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
    if (this.validation.validate('contract-government')) {
      if (this.isNew) {
        this.postContract(this._contract);
      } else {
      }
    }
  }

  public postContract(contract: Contract): void {
    this.transform.setVariable('contract', contract);
    this.endpoints.post('postContract', contract).then((c: Contract) => {
      this.transform.deleteVariable('contract');
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

  public onDelete($event): void {
    if (this.validation.validate('contract-government')) {
      this.transform.setVariable('contract', this._contract);
      this.endpoints.delete('deleteContract').then((c: Contract) => {
        this.transform.deleteVariable('contract');
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
  }
}
