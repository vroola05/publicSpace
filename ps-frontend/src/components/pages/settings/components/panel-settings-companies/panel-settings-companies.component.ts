import { Component, OnInit } from '@angular/core';

import { AuthorisationService } from '../../../../../services/authorisation/authorisation.service';
import { TransformService } from '../../../../../services/transform/transform.service';
import { EndpointService } from '../../../../../services/endpoint/endpoint.service';
import { ListTemplateT } from '../../../../../model/template';
import { Company } from '../../../../../model/company';

@Component({
  selector: 'app-panel-settings-companies',
  templateUrl: './panel-settings-companies.component.html',
  styleUrls: ['./panel-settings-companies.component.scss']
})
export class PanelSettingsCompaniesComponent implements OnInit {
  public companies: Company[];

  public data: any[] = [];
  public listTemplate: ListTemplateT;
  public isNew = false;
  public open = false;

  public selectedCompany: Company;

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
          name: 'name',
          title: 'Bedrijf',
          type: 'string',
          css: 'col-sm-12 col-md-11 col-lg-11 one'
        }
      ]
    };
  }

  public ngOnInit(): void {
    this.getCompanies();
  }

  public getCompanies(): void {
    this.endpoints.get('getCompany').then((companies: Company[]) => {
      this.companies = companies;
      this.addListCompanies(companies);
    });
  }

  public addListCompanies(companies: Company[]) {
    let data = [];
    companies.forEach(company => {
      data.push({
        id: company.id,
        name: company.name
      });
    });
    this.data = data;
  }

  public createNewCompany(): void {
    this.selectedCompany = new Company();
    this.selectedCompany.name = '';
  }

  public events($event): void {
    if ($event.action === 'create') {
      this.createNewCompany();
      this.isNew = true;
      this.open = true;
    } else if ($event.action === 'toggle') {
      this.selectedCompany = this.companies[$event.data.index];
      this.isNew = false;
      this.open = true;
    } else if ($event.action === 'save') {
      this.open = false;
      this.getCompanies();
    } else if ($event.action === 'cancel') {
      this.open = false;
    }
  }
}
