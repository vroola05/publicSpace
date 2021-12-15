import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { EndpointService } from '../../../../../../../services/endpoint/endpoint.service';
import { ValidationService } from '../../../../../../../services/validation/validation.service';
import { AuthorisationService } from '../../../../../../../services/authorisation/authorisation.service';
import { TransformService } from '../../../../../../../services/transform/transform.service';

import { Contract } from '../../../../../../../../model/contract';
import { DropdownFieldComponent } from '../../../../../../fields/dropdown-field/dropdown-field.component';
import { Domain } from '../../../../../../../../model/domain';

@Component({
  selector: 'lib-list-panel-contract-government',
  templateUrl: './list-panel-contract-government.component.html',
  styleUrls: ['./list-panel-contract-government.component.scss']
})
export class ListPanelContractGovernmentComponent implements OnInit {
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
    });
  }

  public getDomainName(domain: Domain): string {
    return domain.company ? domain.company.name + ' - ' + domain.name : domain.name;
  }

  public onDomainChanged($event) {
    console.log($event);
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

  }

}