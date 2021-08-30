import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { NavigationService, DomainService, AuthorisationService, StorageService } from 'ps-lib';
import { User } from '../../../ps-lib/src/model/user';
import { DomainT } from '../../../ps-lib/src/model/template';
import { HeaderMenuItemT } from '../../../ps-lib/src/model/template';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public loaded = false;
  public groupsLoaded = false;
  title = 'Public space';

  constructor(
    private activatedRoute: ActivatedRoute,
    private authorisation: AuthorisationService,
    private navigationService: NavigationService,
    private storage: StorageService,
    private domain: DomainService
  ) {
    this.domain.api = environment.api;

    this.domain.readConfig(this.domain.api + '/config').then((config: DomainT) => {
      if (config.info.prefix) {
        this.storage.setPrefix(config.info.prefix);
      }

      this.authorisation.readUser();
      this.navigationService.readNavigation();

      this.authorisation.userObservable.subscribe((user: User) => {
        this.navigationService.clearHeaderItems();
        if (user === null) {
          //this.navigationService.navigate([this.domain.config.login.login.route]);
          this.navigationService.navigate(['login']);
          this.loaded = true;
        } else {
          this.navigationService.addHeaderItems(this.domain.config.components.header.headerMenu);

          if (this.storage.getSession('haslogin') !== '1' && this.navigationService.getHeaderItems().length > 0) {
            this.storage.setSession('haslogin', '1');
            this.navigationService.navigate(['/overview/' + this.navigationService.getHeaderItems()[0].id]);
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
      && this.activatedRoute.snapshot.firstChild.data.noLogin) {
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
    const groupT: HeaderMenuItemT = this.domain.config.components.header.group;

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
    this.navigationService.addHeaderItems(headerItems);
  }
}
