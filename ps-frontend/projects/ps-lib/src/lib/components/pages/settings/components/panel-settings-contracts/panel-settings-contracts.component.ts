import { Component, OnInit } from '@angular/core';

import { AuthorisationService } from '../../../../../services/authorisation/authorisation.service';
import { EndpointService } from '../../../../../services/endpoint/endpoint.service';
import { TransformService } from '../../../../../services/transform/transform.service';
import { ListTemplateT } from '../../../../../../model/template';
import { Contract } from '../../../../../../model/contract';
import { DomainTypeEnum } from '../../../../../../model/intefaces';

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

  public isGovernment: boolean;

  constructor(
    private endpoints: EndpointService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) {
    this.isGovernment = this.authorisation.isDomainType(DomainTypeEnum.GOVERNMENT);
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
          name: 'name',
          title: 'Naam',
          type: 'string',
          css: 'col-sm-12 col-md-3 col-lg-3 one'
        },
        {
          name: 'domain',
          title: 'Domain',
          type: 'string',
          css: 'col-sm-12 col-md-3 col-lg-3 two'
        },
        {
          name: 'dateCreated',
          title: 'Datum aangemaakt',
          type: 'date',
          css: 'col-sm-12 col-md-3 col-lg-3 three-a'
        },
        {
          name: 'accepted',
          title: 'Geaccepteerd',
          type: 'string',
          css: 'col-sm-12 col-md-2 col-lg-2 three-b'
        }
      ]
    };
  }

  public ngOnInit(): void {
    this.getContracts();
  }


  public isDomainType(domainTypeEnum: DomainTypeEnum): boolean {
    return this.authorisation.isDomainType(domainTypeEnum);
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
        name: contract.domain.name,
        domain: contract.domain.domain,
        dateCreated: contract.dateCreated,
        accepted: contract.accepted ? 'Ja' : 'Nee'
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
