import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

import { EndpointService } from '../../../../../../../services/endpoint/endpoint.service';
import { ValidationService } from '../../../../../../../services/validation/validation.service';
import { AuthorisationService } from '../../../../../../../services/authorisation/authorisation.service';
import { TransformService } from '../../../../../../../services/transform/transform.service';

import { Contract } from '../../../../../../../model/contract';
import { DropdownFieldComponent } from '../../../../../../fields/dropdown-field/dropdown-field.component';
import { Domain } from '../../../../../../../model/domain';
import { MainCategory } from '../../../../../../../model/main-category';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../../../../../services/storage/storage.service';
import { NavigationService } from '../../../../../../../services/navigation/navigation.service';

@Component({
  selector: 'app-panel-contract-government',
  templateUrl: './panel-contract-government.component.html',
  styleUrls: ['./panel-contract-government.component.scss']
})
export class PanelContractGovernmentComponent implements OnInit, AfterViewInit {
  @ViewChild('contractorsComponent') contractorsComponent: DropdownFieldComponent;
  
  @Input() isNew = true;

  public delete = false;

  public contract: Contract;
  
  public domainItems: { name: string, value?: string, data?: any }[] = [];
  
  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    private endpoints: EndpointService,
    private validation: ValidationService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService,
    protected storage: StorageService,
    private navigationService: NavigationService
  ) {
    this.transform.setVariable('path', this.activatedRoute.snapshot.paramMap);
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    const contract = this.getContractFromStorage();

    if (id) {
      if (!contract || contract.id !== parseInt(id)) {
        this.contract = new Contract();
        this.contract.id = parseInt(id);
        this.transform.setVariable('contract', this.contract);
        this.getContractById();
      } else {
        this.contract = contract;
        this.domainItems = [{ name: contract.domain.name, value: '', data: contract.domain }];
      }
      
      this.isNew = false;
      
    } else {
      if (contract && contract.id) {
        this.contract = new Contract();
      }else {
        this.contract = contract;
        this.domainItems = [{ name: contract.domain.name, value: '', data: contract.domain }];
      }
    }
    
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.selectDomain();
  }

  public getContractFromStorage(): Contract {
    const contract = this.storage.getSession('contract');
    if (contract) {
      return JSON.parse(contract) as Contract;
    }
    return null;
  }

  public findContractors($event: any) {
    if ($event.target.value.length === 0) {
      this.contractorsComponent.clear();
    } else if ($event.target.value.length >= 3) {
      this.endpoints.post('findContractorsByName', $event.target.value).then((domains: Domain[]) => {
        this.domainItems = [];
        domains.forEach(domain => {
          this.domainItems.push({ name: domain.name, value: '', data: domain });
        });

        this.contractorsComponent.setItems(this.domainItems);
      });
    }
  }

  public getContractById(): void {
    this.endpoints.get('getContractById').then((contract: Contract) => {
      this.contract = new Contract();
      this.contract.id = contract.id;
      this.contract.description = contract.description;
      this.contract.accepted = contract.accepted;
      this.contract.dateCreated = contract.dateCreated;
      this.contract.domain = contract.domain;
      this.contract.mainCategories = contract.mainCategories;

      this.storage.setSession('contract', JSON.stringify(this.contract), true);
      this.domainItems = [{ name: contract.domain.name, value: '', data: contract.domain }];
      this.selectDomain();
    });
  }

  public getDomainName(domain: Domain): string {
    return domain.company ? domain.company.name + ' - ' + domain.name : domain.name;
  }

  public selectDomain() {
    console.log(this.contract);
    if ( this.contractorsComponent) {
      if (!this.contract?.domain) {
        this.contractorsComponent.select(null);
        return;
      }

      const a = this.domainItems.find( type => !type.data || type.data.id === this.contract.domain.id);
      console.log(a);
      this.contractorsComponent.select(a);
    }
  }

  public hasCategories(mainCategory: MainCategory): boolean {
    return mainCategory.categories && mainCategory.categories.length > 0;
  }

  public cancel(): void {
    this.transform.deleteVariable('contract');
    this.storage.clearProcessData();
    this.navigationService.navigateToParent(this.activatedRoute);
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
      this.storage.clearProcessData();
      this.navigationService.navigateToParent(this.activatedRoute);
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
      })
      .catch((response) => {
        this.transform.deleteVariable('status');
        this.setErrors(response);
      });
    }
  }
}
