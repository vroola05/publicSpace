import { Component, OnInit } from '@angular/core';

import { AuthorisationService } from '../../../../../services/authorisation/authorisation.service';
import { TransformService } from '../../../../../services/transform/transform.service';
import { EndpointService } from '../../../../../services/endpoint/endpoint.service';
import { ListTemplateT } from '../../../../../../model/template';
import { Domain } from '../../../../../../model/domain';

@Component({
  selector: 'lib-panel-settings-domains',
  templateUrl: './panel-settings-domains.component.html',
  styleUrls: ['./panel-settings-domains.component.scss']
})
export class PanelSettingsDomainsComponent implements OnInit {
  public domains: Domain[];

  public data: any[] = [];
  public listTemplate: ListTemplateT;
  public isNew = false;
  public open = false;

  public selectedDomain: Domain;

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
    this.getDomains();
  }

  public getDomains(): void {
    this.endpoints.get('getDomain').then((domains: Domain[]) => {
      this.domains = domains;
      this.addListDomains(domains);
    });
  }

  public addListDomains(domains: Domain[]) {
    let data = [];
    domains.forEach(domain => {
      data.push({
        id: domain.id,
        domain: domain.domain
      });
    });
    this.data = data;
  }

  public createNewDomain(): void {
    this.selectedDomain = new Domain();
    this.selectedDomain.domain = '';
    this.selectedDomain.domainType = null
  }

  public events($event): void {
    if ($event.action === 'create') {
      this.createNewDomain();
      this.isNew = true;
      this.open = true;
    } else if ($event.action === 'toggle') {
      this.selectedDomain = this.domains[$event.data.index];
      this.isNew = false;
      this.open = true;
    } else if ($event.action === 'save') {
      this.open = false;
      this.getDomains();
    } else if ($event.action === 'cancel') {
      this.open = false;
    }
  }
}
