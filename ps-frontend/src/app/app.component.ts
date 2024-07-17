import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomainType } from '../model/domain-type';
import { PageConfigContainer, PageConfig } from '../model/domain-type-config';
import { DomainTypeEnum } from '../model/intefaces';
import { Page } from '../model/page';
import HeaderMenuItemT, { Template } from '../model/template';
import { User } from '../model/user';
import { ActionService } from '../services/action/action.service';
import { AuthorisationService } from '../services/authorisation/authorisation.service';
import { ComponentService } from '../services/component/component.service';
import { ConfigService } from '../services/config/config.service';
import { NavigationService } from '../services/navigation/navigation.service';
import { StorageService } from '../services/storage/storage.service';

import pageConfig from '../page-config.json' //Eventualy this will be added to the main-config file.

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public loaded = false;
  public groupsLoaded = false;
  title = 'Public space';

  constructor(
    private activatedRoute: ActivatedRoute,
    private authorisation: AuthorisationService,
    private navigationService: NavigationService,
    protected action: ActionService,
    private storage: StorageService,
    private config: ConfigService,
    private componentService: ComponentService
  ) {
    this.config.templateObservable().subscribe((template) => {
      if (!template || template == null) {
        return;
      }
      // I initiate this outside the config to avoid circulair dependencies
      template.pages.forEach((page: Page, key: string) => {
        page.pageConfig = this.getPageConfig(template.domain.domainType, pageConfig[key]);
      });

      this.navigationService.readNavigation();

      this.authorisation.userObservable.subscribe((user: User) => {
        this.navigationService.clearHeaderItems();

        if (user === null) {
          this.navigationService.navigate(['login']);
        } else if (
          this.storage.getSession('haslogin') !== 'true' && 
        this.config.headers.length > 0) {
          this.storage.setSession('haslogin', 'true');
          this.navigationService.navigate(['/overview/' + this.config.headers[0].id]);


        }
        this.loaded = true;
      });
    });
  }

  public noLogin(): boolean {
    if (
      this.activatedRoute.snapshot
      && this.activatedRoute.snapshot.firstChild
      && this.activatedRoute.snapshot.firstChild.data
      && this.activatedRoute.snapshot.firstChild.data['noLogin']) {
      return true;
    }
    return false;
  }




  private getPageConfig(domainType: DomainType, pageConfigContainer: PageConfigContainer): PageConfig {
    if (!pageConfigContainer) return undefined;

    const pageConfig = new PageConfig();
    if (domainType.id === DomainTypeEnum.GOVERNMENT) {
      pageConfig.components = [];
      for (const i in pageConfigContainer.government.components) {
        const component = this.componentService.get(pageConfigContainer.government.components[i].component);
        if (component) {
          pageConfig.components.push({ id: pageConfigContainer.government.components[i].id, component });
        }
      }
      pageConfig.endpoints = pageConfigContainer.government.endpoints;
    } else {
      pageConfig.components = [];
      for (const i in pageConfigContainer.contractor.components) {
        const component = this.componentService.get(pageConfigContainer.contractor.components[i].component)
        if (component) {
          pageConfig.components.push({ id: pageConfigContainer.contractor.components[i].id, component });
        }
      }
      pageConfig.endpoints = pageConfigContainer.contractor.endpoints;
    }
    return pageConfig;
  }
}
