import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthorisationService } from '../../../../../services/authorisation/authorisation.service';
import { EndpointService } from '../../../../../services/endpoint/endpoint.service';
import { TransformService } from '../../../../../services/transform/transform.service';
import { Contract } from '../../../../../../model/contract';
import { ListTemplateT } from '../../../../../../model/template';
import { DropdownFieldComponent } from '../../../../fields/dropdown-field/dropdown-field.component';

@Component({
  selector: 'lib-panel-settings-order-specifications',
  templateUrl: './panel-settings-order-specifications.component.html',
  styleUrls: ['./panel-settings-order-specifications.component.scss']
})
export class PanelSettingsOrderSpecificationsComponent implements OnInit {
  @ViewChild('contractComponent') public contractComponent: DropdownFieldComponent;
  
  public contractItems: { name: string, value?: string, data?: any }[] = [];

  public selectedContract: Contract;

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
          name: 'specificationNumber',
          title: 'Bestekpost nummer',
          type: 'string',
          css: 'col-sm-12 col-md-3 col-lg-3'
        },
        {
          name: 'name',
          title: 'Naam',
          type: 'string',
          css: 'col-sm-12 col-md-4 col-lg-4 three-a'
        },        
        {
          name: 'startDate',
          title: 'Startdatum',
          type: 'date',
          css: 'col-sm-12 col-md-2 col-lg-2'
        },
        {
          name: 'endDate',
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

  }

  public getContracts(): void {
    this.endpoints.get('getContracts').then((contracts: Contract[]) => {
      //this.contracts = contracts;
      
      contracts.forEach(contract => {
        this.contractItems.push({ name: contract.domain.name, value: '' + contract.id, data: contract });
      });
      
    });
  }

  public events($event): void {
    if ($event.action === 'create') {
      // this.createNew();
      this.isNew = true;
      this.open = true;
    } else if ($event.action === 'toggle') {
      // this.selectedCategory = this.categories[$event.data.index];
      this.isNew = false;
      this.open = true;
    } else if ($event.action === 'save') {
      this.open = false;
      // this.getCategories();
    } else if ($event.action === 'cancel') {
      this.open = false;
    }
  }
}
