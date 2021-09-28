import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PageAbstract } from '../../page';

import { ApiService } from '../../../../services/api/api.service';
import { ConfigService } from '../../../../services/domain/domain.service';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { ActionService } from '../../../../services/action/action.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { TransformService } from '../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Domain } from '../../../../../model/domain';
import { Company } from '../../../../../model/company';
import { EnvironmentService } from '../../../../services/environment/environment.service';
import { DropdownFieldComponent } from '../../../fields/dropdown-field/dropdown-field.component';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Environment } from '../../../../../model/intefaces';

@Component({
  selector: 'lib-settings-start',
  templateUrl: './settings-start.component.html',
  styleUrls: ['./settings-start.component.scss']
})
export class SettingsStartComponent extends PageAbstract implements OnInit, OnDestroy {
  @ViewChild('companyComponent') public companyComponent: DropdownFieldComponent;
  @ViewChild('domainComponent') public domainComponent: DropdownFieldComponent;

  private subscriptions: Subscription[] = [];

  public companyItems: { name: string, value?: string, data?: any }[] = [];
  public domainItems: { name: string, value?: string, data?: any }[] = [];

  private initCompany = false;

  public environment: Environment;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected navigationService: NavigationService,
    protected storage: StorageService,
    protected action: ActionService,
    protected transform: TransformService,
    protected authorisation: AuthorisationService,
    private config: ConfigService,
    private apiService: ApiService,
    private environmentService: EnvironmentService

  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation);
  }

  public ngOnInit(): void {
    this.environment = this.environmentService.get();
    this.transform.setVariable('environment', this.environment);
    if (this.authorisation.isAdmin()) {
      this.getCompanies();
    }
  }

  public ngOnDestroy(): void {
    this.transform.clearVariable();

    this.subscriptions.forEach(subscription => {subscription.unsubscribe();});
  }

  public isSelected(path: string): boolean {
    return path === this.router.url;
  }

  public getCompanies(): void {
    this.companyItems = [];
    const endpointT = this.config.getEndpoint('getCompany');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      this.apiService.get(this.transform.URL(endpointT.endpoint)).pipe(first()).subscribe((companies: Company[]) => {
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
  }

  public getDomains(): void {
    this.domainItems = [];
    if (!this.environment || !this.environment.company || !this.environment.company.id) {
      return;
    }
    const endpointT = this.config.getEndpoint('getDomain');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      this.apiService.get(this.transform.URL(endpointT.endpoint)).pipe(first()).subscribe((domains: Domain[]) => {
        domains.forEach(domain => {
          this.domainItems.push({ name: domain.domain, value: String(domain.id), data: domain });
        });
        this.domainComponent.select(this.domainComponent.options.find(option => option.value === String(this.environment.domain.id)));
      });
    }
  }

  public onCompanyChanged($event): void {
    this.navigationService.navigate(['/settings'], false);
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
    this.navigationService.navigate(['/settings'], false);
    this.environment.domain = $event.data as Domain;
    this.environmentService.store(this.environment);
    this.transform.setVariable('environment', this.environment);
  }

  public showCompany(): boolean {
    return this.authorisation.isAdmin();
  }

  public showDomain(): boolean {
    return this.authorisation.isAdmin();
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
