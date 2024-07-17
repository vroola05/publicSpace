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
    
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public isSelected(path: string): boolean {
    return path === this.router.url;
  }

  public buttonClicked(): void {
    this.isMenuOpen = false;
  }
 
  public toggleMenu($event): void {
    this.isMenuOpen = !this.isMenuOpen;
  }


  public isAdmin(): boolean {
    return this.authorisation.isAdmin();
  }

  public hasRoles(roles: string[]): boolean {
    return this.authorisation.hasRoles(roles);
  }
}
