import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { EndpointService } from '../../../../../../../services/endpoint/endpoint.service';
import { ValidationService } from '../../../../../../../services/validation/validation.service';
import { AuthorisationService } from '../../../../../../../services/authorisation/authorisation.service';
import { TransformService } from '../../../../../../../services/transform/transform.service';

import { Contract } from '../../../../../../../../model/contract';
import { TextFieldComponent } from '../../../../../../fields/text-field/text-field.component';
import { Domain } from '../../../../../../../../model/domain';

@Component({
  selector: 'lib-list-panel-contract-contractor',
  templateUrl: './list-panel-contract-contractor.component.html',
  styleUrls: ['./list-panel-contract-contractor.component.scss']
})
export class ListPanelContractContractorComponent implements OnInit {
  @ViewChild('domainComponent') domainComponent: TextFieldComponent;
  
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

  constructor(
    private endpoints: EndpointService,
    private validation: ValidationService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) {}

  public ngOnInit(): void {
  }


  public getDomainName(domain: Domain): string {
    return domain.company ? domain.company.name + ' - ' + domain.name : domain.name;
  }

  public onDomainChanged($event) {
    console.log($event);
    if (this.domainComponent.validate()) {
      
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
