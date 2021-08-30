import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../../../services/api/api.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { DomainService } from '../../../../services/domain/domain.service';
import { TransformService } from '../../../../services/transform/transform.service';
import { ListTemplateT } from '../../../../../model/template';
import { Domain } from '../../../../../model/domain';
import { first } from 'rxjs/operators';

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
    private apiService: ApiService,
    private domain: DomainService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) {

    this.listTemplate = {
      toggle: true,
      columns: [
        {
          id: 'id',
          name: 'Id',
          type: 'number',
          css: 'col-sm-12 col-md-1 col-lg-1 bold'
        },
        {
          id: 'domain',
          name: 'Domein',
          type: 'string',
          css: 'col-sm-12 col-md-11 col-lg-11'
        }
      ]
    };
  }

  public ngOnInit(): void {
    this.getDomains();
  }

  public getDomains(): void {
    const endpointT = this.domain.getEndpoint('getDomain');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      this.apiService.get(this.transform.URL(endpointT.endpoint)).pipe(first()).subscribe((domains: Domain[]) => {
        this.domains = domains;
        this.addListDomains(domains);
      });
    }
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
      const d = this.domains.find(domain => { return domain.id === $event.data.id});
      this.selectedDomain = d;
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
