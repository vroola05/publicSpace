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
import { environment } from '../environments/environment';

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
    this.config.api = environment.api;

    this.config.readConfig(this.config.api + '/config').then((template: Template) => {
      // I initiate this outside the config to avoid circulair dependencies
      this.config.template.pages.forEach((page: Page, key: string) => {
        page.pageConfig = this.getPageConfig(template.domain.domainType, pageConfig[key]);
      });

      if (template.info.prefix) {
        this.storage.setPrefix(template.info.prefix);
      }
      this.action.setActions(template.actions);
      
      this.authorisation.readUser();
      this.navigationService.readNavigation();

      this.authorisation.userObservable.subscribe((user: User) => {
        this.navigationService.clearHeaderItems();
        if (user === null) {
          //this.navigationService.navigate([this.domain.config.login.login.route]);
          this.navigationService.navigate(['login']);
          this.loaded = true;
        } else {
          //this.navigationService.addHeaderItems(this.config.template.components.header.headerMenu);
console.log(user);
          if (this.storage.getSession('haslogin') !== '1' && this.config.headers.length > 0) {
            this.storage.setSession('haslogin', '1');
            this.navigationService.navigate(['/overview/' + this.config.headers[0].id]);
          }
          this.loaded = true;
          this.setNavigationGroups();
        }
      });

      //this.authorisation.setAuthControls(this.domain.getEndpoint('getCheckToken').endpoint);
    }).catch((err) => {
      console.error('Cant read config', err);
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

  public setNavigationGroups(): void {
    if (this.groupsLoaded || !this.authorisation.user.groups) {
      return;
    }
    this.groupsLoaded = true;

    const headerItems: HeaderMenuItemT[] = [];
    /*const groupT: HeaderMenuItemT = this.config.template.components.header.group;

    this.authorisation.user.groups.forEach(group => {
      const headerItem: HeaderMenuItemT = {
        icon: '',
        name: group.name,
        route: `${groupT.route}/${group.id}`,
        api: `${groupT.api}/${group.id}`,
        selected: false,
        menuType: 'group'
      };
      headerItems.push(headerItem);
    });
    this.navigationService.addHeaderItems(headerItems);*/
  }


  private getPageConfig(domainType: DomainType, pageConfigContainer: PageConfigContainer): PageConfig {
    if (!pageConfigContainer) return undefined;

    const pageConfig = new PageConfig();
      if (domainType.id === DomainTypeEnum.GOVERNMENT) {
        pageConfig.components = [];
        for(const i in pageConfigContainer.government.components) {
          const component = this.componentService.get(pageConfigContainer.government.components[i].component)
          if (component) {
            pageConfig.components.push({id:pageConfigContainer.government.components[i].id , component});
          }
        }
        pageConfig.endpoints = pageConfigContainer.government.endpoints;
      } else {
        pageConfig.components = [];
        for(const i in pageConfigContainer.contractor.components) {
          const component = this.componentService.get(pageConfigContainer.contractor.components[i].component)
          if (component) {
            pageConfig.components.push({id:pageConfigContainer.contractor.components[i].id , component});
          }
        }
        pageConfig.endpoints = pageConfigContainer.contractor.endpoints;
      }
      return pageConfig;
  }
}
