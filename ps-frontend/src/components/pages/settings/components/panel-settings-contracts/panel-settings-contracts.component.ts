import { Component, Injector, OnInit, ViewChild } from '@angular/core';

import { AuthorisationService } from '../../../../../services/authorisation/authorisation.service';
import { EndpointService } from '../../../../../services/endpoint/endpoint.service';
import { TransformService } from '../../../../../services/transform/transform.service';
import { ListTemplateT } from '../../../../../model/template';
import { Contract } from '../../../../../model/contract';
import { DomainTypeEnum } from '../../../../../model/intefaces';
import { DynamicDirective } from '../../../../../directives/dynamic.directive';
import { NavigationService } from '../../../../../services/navigation/navigation.service';

@Component({
  selector: 'app-panel-settings-contracts',
  templateUrl: './panel-settings-contracts.component.html',
  styleUrls: ['./panel-settings-contracts.component.scss']
})
export class PanelSettingsContractsComponent implements OnInit {

  @ViewChild(DynamicDirective, {static: true}) private dynamicHost!: DynamicDirective;
  
  public contracts: Contract[];
  public selectedContract: Contract;

  public data: any[] = [];
  public listTemplate: ListTemplateT;
  public isNew = false;
  public open = false;

  public isGovernment: boolean;

  constructor(
    private endpoints: EndpointService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService,
    private navigationService: NavigationService
  ) {
    this.isGovernment = this.authorisation.isDomainType(DomainTypeEnum.GOVERNMENT);
    this.listTemplate = {
      toggle: false,
      route: 'settings/contracts/new',
      columns: [
        
        {
          name: 'name',
          title: 'Naam',
          type: 'string',
          css: 'col-sm-12 col-md-4 col-lg-4 one'
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

  public clearComponent() {
    this.dynamicHost.viewContainerRef.clear();
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

  public newContract($event: string) {
    if (this.authorisation.isDomainType(DomainTypeEnum.GOVERNMENT)) {
      this.navigationService.navigate(['settings/contracts/government'], true);
    } else {
      this.navigationService.navigate(['settings/contracts/contractor'], true);
    }
  }

  public changeContract(data: { data: Contract, index: number, opened: boolean}): void {
    if (this.authorisation.isDomainType(DomainTypeEnum.GOVERNMENT)) {
      this.navigationService.navigate(['settings/contracts/government/' + data.data.id], true);
    } else {
      this.navigationService.navigate(['settings/contracts/contractor/' + data.data.id], true);
    }
  }
}
