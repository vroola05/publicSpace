import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PageAbstract } from '../../page';

import { NavigationService } from '../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { ActionService } from '../../../../services/action/action.service';
import { TransformService } from '../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from '../../../../model/domain';
import { Company } from '../../../../model/company';
import { EnvironmentService } from '../../../../services/environment/environment.service';
import { DropdownFieldComponent } from '../../../fields/dropdown-field/dropdown-field.component';
import { Subscription } from 'rxjs';
import { Environment, RolesEnum } from '../../../../model/intefaces';
import { EndpointService } from '../../../../services/endpoint/endpoint.service';
import { ConfigService } from '../../../../services/config/config.service';

@Component({
  selector: 'app-settings-start',
  templateUrl: './settings-start.component.html',
  styleUrls: ['./settings-start.component.scss']
})
export class SettingsStartComponent extends PageAbstract implements OnInit, OnDestroy {
  @ViewChild('companyComponent') public companyComponent: DropdownFieldComponent;
  @ViewChild('domainComponent') public domainComponent: DropdownFieldComponent;

  public isMenuOpen = false;
  public companyItems: { name: string, value?: string, data?: any }[] = [];
  public domainItems: { name: string, value?: string, data?: any }[] = [];

  private initCompany = false;

  public environment: Environment;

  constructor(
    protected override router: Router,
    protected override activatedRoute: ActivatedRoute,
    protected override navigationService: NavigationService,
    protected override storage: StorageService,
    protected override action: ActionService,
    protected override transform: TransformService,
    protected override authorisation: AuthorisationService,
    protected override config: ConfigService,
    private environmentService: EnvironmentService,
    private endpoints: EndpointService

  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation, config);
  }

  public override ngOnInit(): void {
    this.environment = this.environmentService.get();
    this.transform.setVariable('environment', this.environment);
    if (this.authorisation.isAdmin()) {
      this.getCompanies();
    }
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public isSelected(path: string): boolean {
    return path === this.router.url;
  }

  public getCompanies(): void {
    this.companyItems = [];

    this.endpoints.get('getCompany').then((companies: Company[]) => {
      if (companies.length === 0) {
        this.initCompany = true;
      } else {
        companies.forEach(company => {
          this.companyItems.push({ name: company.name, value: String(company.id), data: company });
        });
        this.companyComponent.select(this.companyComponent.options.find(option => option.value === String(this.environment.company.id)));
      }
    });
  }

  public getDomains(): void {
    this.domainItems = [];
    if (!this.environment || !this.environment.company || !this.environment.company.id) {
      return;
    }

    this.endpoints.get('getDomain').then((domains: Domain[]) => {
      domains.forEach(domain => {
        this.domainItems.push({ name: domain.domain, value: String(domain.id), data: domain });
      });
      this.domainComponent.select(this.domainComponent.options.find(option => option.value === String(this.environment.domain.id)));
    });
  }

  public onCompanyChanged($event): void {
    this.environment.company = $event.data as Company;

    if (this.initCompany) {
      this.environment.domain = new Domain();
    }
    this.initCompany = true;

    this.environmentService.store(this.environment);
    this.transform.setVariable('environment', this.environment);
    this.getDomains();
  }

  public onDomainChanged($event): void {
    this.environment.domain = $event.data as Domain;
    this.environmentService.store(this.environment);
    this.transform.setVariable('environment', this.environment);
  }
  public buttonClicked(): void {
    this.isMenuOpen = false;
  }
 
  public toggleMenu($event): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public showCompany(): boolean {
    return this.authorisation.isAdmin();
  }

  public showDomain(): boolean {
    return this.authorisation.hasRole(RolesEnum.ADMIN) || this.authorisation.isAdmin();
  }

  public showItems(): boolean {
    return this.environment
      && this.environment.company && this.environment.company.id != null
      && this.environment.domain && this.environment.domain.id != null;
  }

  public showCompanySelector(): boolean {
    return this.authorisation.isAdmin();
  }
}
