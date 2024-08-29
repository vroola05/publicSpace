import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { EndpointService } from '../../../../../../../services/endpoint/endpoint.service';
import { ValidationService } from '../../../../../../../services/validation/validation.service';
import { AuthorisationService } from '../../../../../../../services/authorisation/authorisation.service';
import { TransformService } from '../../../../../../../services/transform/transform.service';

import { Contract } from '../../../../../../../model/contract';
import { DropdownFieldComponent } from '../../../../../../fields/dropdown-field/dropdown-field.component';
import { Domain } from '../../../../../../../model/domain';
import { MainCategory } from '../../../../../../../model/main-category';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../../../../../services/storage/storage.service';
import { NavigationService } from '../../../../../../../services/navigation/navigation.service';

@Component({
  selector: 'app-panel-contract-government',
  templateUrl: './panel-contract-government.component.html',
  styleUrls: ['./panel-contract-government.component.scss']
})
export class PanelContractGovernmentComponent implements OnInit {
  @ViewChild('domainComponent') domainComponent: DropdownFieldComponent;
  
  @Output() onEvent: EventEmitter<{ action: string, isNew: boolean, data: any }> = new EventEmitter();

  @Input() isNew = true;

  public delete = false;

  public contract: Contract;
  
  public domainItems: { name: string, value?: string, data?: any }[] = [];
  
  constructor(
    protected activatedRoute: ActivatedRoute,
    private endpoints: EndpointService,
    private validation: ValidationService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService,
    protected storage: StorageService,
    private navigationService: NavigationService
  ) {
    this.transform.setVariable('path', this.activatedRoute.snapshot.paramMap);

    const contract = this.getContract();

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id && (!contract.id || contract.id != parseInt(id))) {
      console.log('change id');
      contract.id = parseInt(id);
      this.transform.setVariable('contract', contract);
      this.getContractById();
    } else {
      this.contract = contract;
      this.selectDomain();
    }
  }

  public ngOnInit(): void {
    this.getDomainContractors();
  }

  public getContract(): Contract {
    const contract = this.storage.getSession('contract');
    if (contract) {
      this.contract = JSON.parse(contract) as Contract;
    } else {
      this.contract =  new Contract();
    }
    return this.contract;
  }

  public getContractById(): void {
    this.endpoints.get('getContractById').then((contract: Contract) => {
      this.contract.id = contract.id;
      this.contract.accepted = contract.accepted;
      this.contract.dateCreated = contract.dateCreated;
      this.contract.domain = contract.domain;
      this.contract.mainCategories = contract.mainCategories;
      this.selectDomain();
    });
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
      if (!this.contract?.domain) {
        this.domainComponent.select(null);
        return;
      }

      this.domainComponent.select(this.domainItems.find( type => !type.data || type.data.id === this.contract.domain.id));
    }
  }

  public onDomainChanged($event) {
    if (this.domainComponent.validate()) {
      this.contract.domain = $event.data;
    }
  }

  public hasCategories(mainCategory: MainCategory): boolean {
    return mainCategory.categories && mainCategory.categories.length > 0;
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
        this.postContract(this.contract);
      }
    }
  }

  public postContract(contract: Contract): void {
    this.transform.setVariable('contract', contract);
    this.endpoints.post('postContract', contract).then((c: Contract) => {
      this.transform.deleteVariable('contract');
      this.navigationService.navigate(['settings/contracts']).then();
    })
    .catch((response) => {
      this.transform.deleteVariable('status');
      this.setErrors(response);
    });
  }

  public setErrors(response: any): void {
    if(response?.error?.errors) {
      const errors = response.error.errors as {field: string, value: string}[];
      this.validation.errors = errors;
    }
  }

  public onDelete($event): void {
    if (this.validation.validate('contract-government')) {
      this.transform.setVariable('contract', this.contract);
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
