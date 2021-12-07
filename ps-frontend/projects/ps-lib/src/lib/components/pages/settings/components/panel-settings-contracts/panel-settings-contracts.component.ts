import { Component, OnInit } from '@angular/core';

import { AuthorisationService } from '../../../../../services/authorisation/authorisation.service';
import { EndpointService } from '../../../../../services/endpoint/endpoint.service';
import { TransformService } from '../../../../../services/transform/transform.service';
import { ListTemplateT } from '../../../../../../model/template';
import { Contract } from '../../../../../../model/contract';

@Component({
  selector: 'lib-panel-settings-contracts',
  templateUrl: './panel-settings-contracts.component.html',
  styleUrls: ['./panel-settings-contracts.component.scss']
})
export class PanelSettingsContractsComponent implements OnInit {
  public contracts: Contract[];
  public selectedContract:Contract;

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
          type: 'number',
          css: 'col-sm-12 col-md-1 col-lg-1 bold'
        },
        {
          name: 'domain',
          title: 'Domein',
          type: 'string',
          css: 'col-sm-12 col-md-11 col-lg-11 one'
        }
      ]
    };
  }

  public ngOnInit(): void {
    this.getContracts();
  }

  public getContracts(): void {
    this.endpoints.get('getContracts').then((contracts: Contract[]) => {
      this.contracts = contracts;
      this.addListContracts(contracts);
    });
  }

  public addListContracts(contracts: Contract[]) {
    let data = [];
    contracts.forEach(contract => {
      data.push({
        id: contract.id,
        domain: contract.domain.domain
      });
    });
    this.data = data;
  }

  public events($event): void {
    if ($event.action === 'create') {
      this.isNew = true;
      this.open = true;
    } else if ($event.action === 'toggle') {
      this.selectedContract = this.contracts[$event.data.index];
      this.isNew = false;
      this.open = true;
    } else if ($event.action === 'save') {
      this.open = false;
    } else if ($event.action === 'cancel') {
      this.open = false;
    }
  }
}
