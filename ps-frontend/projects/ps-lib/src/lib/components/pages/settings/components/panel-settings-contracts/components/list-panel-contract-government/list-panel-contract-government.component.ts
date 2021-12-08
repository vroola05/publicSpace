import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { EndpointService } from '../../../../../../../services/endpoint/endpoint.service';
import { ValidationService } from '../../../../../../../services/validation/validation.service';
import { AuthorisationService } from '../../../../../../../services/authorisation/authorisation.service';
import { TransformService } from '../../../../../../../services/transform/transform.service';

import { Contract } from '../../../../../../../../model/contract';
import { DropdownFieldComponent } from '../../../../../../fields/dropdown-field/dropdown-field.component';
import { TextareaFieldComponent } from '../../../../../../fields/textarea-field/textarea-field.component';
import { Domain } from 'projects/ps-lib/src/model/domain';


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
      
    }
  }


  public domainItems: { name: string, value?: string, data?: any }[] = [];
  
  constructor(
    private endpoints: EndpointService,
    private validation: ValidationService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) { }

  public ngOnInit(): void {
    this.getDomainContractors();
  }

  public getDomainContractors(): void {
    this.endpoints.get('getDomainContractors').then((domains: Domain[]) => {
      console.log(domains);
    });
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
