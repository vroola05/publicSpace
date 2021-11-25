import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { NavigationService, ConfigService, AuthorisationService, StorageService, ActionService } from 'ps-lib';
import { User } from '../../../ps-lib/src/model/user';
import { Template } from '../../../ps-lib/src/model/template';
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
    protected action: ActionService,
    private storage: StorageService,
    private config: ConfigService
  ) {
    this.config.api = environment.api;

    this.config.readConfig(this.config.api + '/config').then((template: Template) => {
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
}
