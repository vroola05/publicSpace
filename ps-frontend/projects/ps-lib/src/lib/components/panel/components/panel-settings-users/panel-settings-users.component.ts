import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ApiService } from '../../../../services/api/api.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { DomainService } from '../../../../services/domain/domain.service';
import { TransformService } from '../../../../services/transform/transform.service';
import { User } from '../../../../../model/user';
import { Group } from '../../../../../model/group';
import { ListTemplateT } from '../../../../../model/template';
import { first } from 'rxjs/operators';


@Component({
  selector: 'lib-panel-settings-users',
  templateUrl: './panel-settings-users.component.html',
  styleUrls: ['./panel-settings-users.component.scss']
})
export class PanelSettingsUsersComponent implements OnInit {
  public roles: {name: string, value?: string, selected?: boolean, data?: any}[] = [];
  public groups: {name: string, value?: string, selected?: boolean, data?: any}[] = [];

  public users: User[];

  public data: any[] = [];
  public listTemplate: ListTemplateT;

  public selectedUser: User;
  public isNew = false;
  public open = false;
  
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
          id: 'name',
          name: 'Naam',
          type: 'string',
          css: 'col-sm-12 col-md-2 col-lg-2 bold'
        },
        {
          id: 'username',
          name: 'Gebruikersnaam',
          type: 'string',
          css: 'col-sm-12 col-md-2 col-lg-2'
        },
        {
          id: 'roles',
          name: 'Rollen',
          type: 'string',
          css: 'col-sm-12 col-md-4 col-lg-4'
        },
        {
          id: 'groups',
          name: 'Groepen',
          type: 'string',
          css: 'col-sm-12 col-md-4 col-lg-4'
        }
      ]
    };
  }

  public ngOnInit(): void {
    this.getUsers();
    this.getRoles();
    this.getGroups();
  }

  public clearRoles(): void {
    this.roles.forEach(role => role.selected = false);
  }

  public clearGroups(): void {
    this.groups.forEach(role => role.selected = false);
  }

  public getRoles(): void {
    const endpointT = this.domain.getEndpoint('getRoles');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      this.apiService.get(this.transform.URL(endpointT.endpoint)).pipe(first()).subscribe((roles: string[]) => {
        roles.forEach(role => {
          this.roles.push({name: role, value: role, selected: false});
        });
      });
    }
  }

  public getGroups(): void {
    const endpointT = this.domain.getEndpoint('getGroups');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      this.apiService.get(this.transform.URL(endpointT.endpoint)).pipe(first()).subscribe((groups: Group[]) => {
        groups.forEach(group => {
          this.groups.push({name: group.name, value: String(group.id), data: group, selected: false});
        });
      });
    }
  }

  public getUsers(): void {
    const endpointT = this.domain.getEndpoint('getUsers');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      this.apiService.get(this.transform.URL(endpointT.endpoint)).pipe(first()).subscribe((users: User[]) => {
        this.users = users;
        this.addListUsers(users);
      });
    }
  }

  public addListUsers(users: User[]) {
    let data = [];
    users.forEach(user => {
      data.push({
        name: user.name,
        username: user.username,
        roles: user.roles.join(', '),
        groups: user.groups.map(o => o.name).join(', '),
      });
    });

    this.data = data;
  }

  public createNewUser(): void {
    this.clearRoles();
    this.clearGroups()
    this.selectedUser = new User();
    this.selectedUser.admin = false;
    this.selectedUser.name = '';
    this.selectedUser.username = '';
    this.selectedUser.email = '';
  }

  public events($event): void {
    if ($event.action === 'create') {
      this.createNewUser();
      this.isNew = true;
      this.open = true;
    } else if ($event.action === 'toggle') {
      const u = this.users.find(user => { return user.username === $event.data.username});
      this.roles.forEach(role => role.selected = u.roles.includes(role.value));

      
      this.groups.forEach(group => group.selected = this.findGroup(u.groups, group.data.id));
      this.selectedUser = u;
      this.isNew = false;
      this.open = true;
    } else if ($event.action === 'save') {
      this.open = false;
      this.getUsers();
    } else if ($event.action === 'cancel') {
      this.open = false;
    }
  }
  
  public findGroup(groups: Group[], id: number): boolean {
    if (groups) {
      for (const group of groups) {
        if (group.id === id) {
          return true;
        }
      }
    }
    return false;
  }
}

