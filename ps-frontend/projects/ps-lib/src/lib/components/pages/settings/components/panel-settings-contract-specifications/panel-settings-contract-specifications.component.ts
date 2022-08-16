import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthorisationService } from '../../../../../services/authorisation/authorisation.service';
import { EndpointService } from '../../../../../services/endpoint/endpoint.service';
import { TransformService } from '../../../../../services/transform/transform.service';
import { Contract } from '../../../../../../model/contract';
import { ListTemplateT } from '../../../../../../model/template';
import { DropdownFieldComponent } from '../../../../fields/dropdown-field/dropdown-field.component';
import { ContractSpecification } from '../../../../../../model/contract-specification';

@Component({
  selector: 'lib-panel-settings-contract-specifications',
  templateUrl: './panel-settings-contract-specifications.component.html',
  styleUrls: ['./panel-settings-contract-specifications.component.scss']
})
export class PanelSettingsContractSpecificationsComponent implements OnInit {
  @ViewChild('contractComponent') public contractComponent: DropdownFieldComponent;
  
  public contractItems: { name: string, value?: string, data?: any }[] = [];

  public selectedContract: Contract;
  public selectedContractSpecification: ContractSpecification;
  public contractSpecifications: ContractSpecification[];

  public data: any[] = [];
  public listTemplate: ListTemplateT;
  public isNew = false;
  public open = false;

  constructor(
    private endpoints: EndpointService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) {
    this.listTemplate = {
      toggle: true,
      columns: [
        {
          name: 'id',
          title: 'Id',
          type: 'string',
          css: 'col-sm-12 col-md-1 col-lg-1'
        },
        {
          name: 'name',
          title: 'Naam',
          type: 'string',
          css: 'col-sm-12 col-md-6 col-lg-6 three-a'
        },        
        {
          name: 'dateStart',
          title: 'Startdatum',
          type: 'date',
          css: 'col-sm-12 col-md-2 col-lg-2'
        },
        {
          name: 'dateEnd',
          title: 'Einddatum',
          type: 'date',
          css: 'col-sm-12 col-md-2 col-lg-2'
        },
        {
          name: 'active',
          title: 'Actief',
          type: 'boolean',
          css: 'col-sm-12 col-md-1 col-lg-1 three-b'
        }
      ]
    };
  }

  public ngOnInit(): void {
    this.getContracts();
  }

  public hasContract(): boolean {
    return this.selectedContract != null;
  }

  public onContractChanged($event): void {
    this.transform.setVariable('contract', $event.data);
    this.selectedContract = $event.data;
    this.getContractSpecifications();
  }

  public getContracts(): void {
    this.endpoints.get('getContracts').then((contracts: Contract[]) => {

      contracts.forEach(contract => {
        this.contractItems.push({ name: contract.domain.name, value: '' + contract.id, data: contract });
      });
      
    });
  }

  public getContractSpecifications(): void {
    this.endpoints.get('getContractSpecificationByContractId').then((contractSpecifications: ContractSpecification[]) => {
      this.contractSpecifications = contractSpecifications;

        let data = [];
        contractSpecifications.forEach(contractSpecification => {
          data.push({
            id: contractSpecification.id,
            name: contractSpecification.description,
            dateStart: contractSpecification.dateStart,
            dateEnd: contractSpecification.dateEnd,
            active: contractSpecification.active
          });
        });
        this.data = data;
    });
  }

  public createNew(): void {
    this.selectedContractSpecification = new ContractSpecification();
    this.selectedContractSpecification.description = '';
    this.selectedContractSpecification.dateStart = new Date();
    this.selectedContractSpecification.dateEnd = null;
    this.selectedContractSpecification.active = false;
  }

  public events($event): void {
    if ($event.action === 'create') {
      this.createNew();
      this.isNew = true;
      this.open = true;
    } else if ($event.action === 'toggle') {
      this.selectedContractSpecification = this.contractSpecifications[$event.data.index];
      this.isNew = false;
      this.open = true;
    } else if ($event.action === 'save') {
      this.open = false;
      this.getContractSpecifications();
    } else if ($event.action === 'cancel') {
      this.open = false;
    }
  }
}
