import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { EndpointService } from '../../../../../../../services/endpoint/endpoint.service';
import { ValidationService } from '../../../../../../../services/validation/validation.service';
import { AuthorisationService } from '../../../../../../../services/authorisation/authorisation.service';
import { TransformService } from '../../../../../../../services/transform/transform.service';

import { Contract } from '../../../../../../../../model/contract';
import { TextFieldComponent } from '../../../../../../fields/text-field/text-field.component';
import { Domain } from '../../../../../../../../model/domain';
import { MainCategory } from '../../../../../../../../model/main-category';
import { ListPanelContractComponent } from '../list-panel-contract';

@Component({
  selector: 'lib-list-panel-contract-contractor',
  templateUrl: './list-panel-contract-contractor.component.html',
  styleUrls: ['./list-panel-contract-contractor.component.scss']
})
export class ListPanelContractContractorComponent implements ListPanelContractComponent, OnInit {
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
    this.transform.setVariable('environment', { company: this.authorisation.user.company, domain: this.authorisation.user.domain });

    this.getMainCategories();
  }

  public getMainCategories(): void {
    this.endpoints.get('getMainCategories').then((mainCategories: MainCategory[]) => {
      const mainCategoryItems = [];
      mainCategories.forEach(mainCategory => {
        mainCategoryItems.push({ name: mainCategory.name, value: mainCategory.id, data: mainCategory });
      })

    });
  }

  public getDomainName(domain: Domain): string {
    return domain.company ? domain.company.name + ' - ' + domain.name : domain.name;
  }


  public onAcceptedChanged($event) {
    this._contract.accepted = $event;
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
    if (this.validation.validate('contract-contractor')) {
        this.putContract(this._contract);
    }
  }

  public putContract(contract: Contract): void {
    this.transform.setVariable('contract', contract);
    this.endpoints.put('putContract', contract).then((c: Contract) => {
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
}
