import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigService, PageTypes } from '../../../../services/config/config.service';
import { Loader } from '../../../../services/loader/loader.service';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../services/storage/storage.service';

import { PageAbstract } from '../../page';

import { ButtonT } from '../../../../../model/template';
import { Call } from '../../../../../model/call';
import { CallList } from '../../../../../model/call-list';
import { User } from '../../../../../model/user';
import { Image } from '../../../../../model/image';
import { Group } from '../../../../../model/group';
import { Message } from '../../../../../model/message';
import { Environment } from '../../../../../model/intefaces';

import { ToastService } from '../../../../services/toast/toast.service';
import { TransformService } from '../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { EndpointService } from '../../../../services/endpoint/endpoint.service';
import { ActionService } from '../../../../services/action/action.service';
import { EnvironmentService } from '../../../../services/environment/environment.service';

@Component({
  selector: 'lib-assign-p-or-g',
  templateUrl: './assign-p-or-g.component.html',
  styleUrls: ['./assign-p-or-g.component.scss']
})
export class AssignPOrGComponent extends PageAbstract implements OnInit, OnDestroy {
  protected lock = false;

  public call: Call;
  public buttonsLeft: ButtonT[];
  public buttonsRight: ButtonT[];
  public tabs: {name: string, value?: string, data?: any, selected: boolean}[] = [];

  public searchtext = '';
  
  public _itemsUser: {selected: boolean, image: Image, data: any}[] = [];
  public _itemsGroup: {selected: boolean, image: Image, data: any}[] = [];

  public _items: {selected: boolean, image: Image, data: any}[] = [];
  @Input() set items(items: {selected: boolean, image: Image, data: any}[]) {
    if (items) {
      this._items = items;
    } else {
      this._items = [];
    }
  }
  get items() {
    return this.searchtext === ''
      ? this._items
      : this._items.filter(item => item.image.alt.toLowerCase().includes(this.searchtext.toLowerCase()));
  }

  private type: 'user' | 'group' = 'user';
  private group: Group;
  private user: User;

  public environment: Environment;

  public headerData: CallList;
  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected navigationService: NavigationService,
    protected storage: StorageService,
    protected action: ActionService,
    protected transform: TransformService,
    protected authorisation: AuthorisationService,
    private endpoints: EndpointService,
    private config: ConfigService,
    private loader: Loader,
    private toast: ToastService,
    private environmentService: EnvironmentService
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation);
  }

  public ngOnInit(): void {
    super.ngOnInit();

    this.environment = this.environmentService.get();
    this.transform.setVariable('environment', this.environment);

    this.page = this.config.getPage(PageTypes.assign);

    this.getCall();

    this.tabs.push({name: 'Medewerker', value: 'user', selected: false});
    this.tabs.push({name: 'Team', value: 'group', selected: false});
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public getCall(): void {
    this.endpoints.get('getCallById').then((call: Call) => {
      this.transform.setVariable('call', call);

      this.transform.setVariable('group', call.group);

      this.getPersons();
      this.getGroups();

      this.call = call;
      this.headerData = this.config.transformCall(call);
    });
  }

  public clearSelection(): void {
    this.transform.deleteVariable('user');
    this.transform.deleteVariable('group');
  }

  public onTabChanged($event): void {
    this.clearSelection();
    this.type = $event.tab.value;
    if (this.type === 'user') {
      this.items = this._itemsUser;
    } else if (this.type === 'group') {
      this.items = this._itemsGroup
    }
  }

  public getPersons() {
    this._itemsUser = [];
    this.endpoints.get('getUsersOfGroup').then((users: User[]) => {
      const items = [];
      users.forEach(user => {
        items.push({selected: false, image: this.getImageOfUser(user), data: user});
      });
      this._itemsUser = items;
    });
  }

  public getGroups() {
    this._itemsGroup = [];
    this.endpoints.get('getGroups').then((groups: Group[]) => {
      const items = [];
        groups.forEach(group => {
          items.push({selected: false, image: this.getImageOfGroup(group), data: group});
        });
        this._itemsGroup = items;
    });
  }

  public onTyping($event): void {
    this.searchtext = $event.target.value;
  }

  public onItemChanged($event): void {
    this.items.forEach(item => {
      if ($event.data.image.alt === item.image.alt) {
        item.selected = true;
        this.setSelected(item.data);
      } else {
        item.selected = false;
      }
    });
  }
  public setSelected(data: any): void {
    if (this.type === 'user') {
      this.group = null;
      this.transform.setVariable('user', data);
      this.user = data;
    } else if (this.type === 'group') {
      this.user = null;
      this.transform.setVariable('group', data);
      this.group = data;
    }
  }

  public getImageOfGroup(group: Group): Image {
    const image = new Image();
    if (group && group.name) {
      image.api = true;
      image.name = 'Groep';
      image.alt = group.name;
    }

    return image;
  }

  public getImageOfUser(user: User): Image {
    const image = new Image();
    if (user && user.name) {
      image.api = true;
      image.url = this.config.getEndpoint('getProfileImage').endpoint + user.profilePhoto;
      image.name = 'Medewerker';
      image.alt = user.name;
    }

    return image;
  }

  public assignGroup(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (!this.lock) {
        this.lock = true;
        const group = this.transform.getVariable('group') as Group;
        if (!group || !group.id) {
          this.toast.error('Er is geen groep geselecteerd.', 5, true);
          this.lock = false;
          resolve(false);
        }

        const loaderId = this.loader.add('Bezig met opslaan!');
        this.endpoints.put('putCallGroup', this.group).then((message: Message) => {
          this.loader.remove(loaderId);
          this.lock = false;
          this.storage.clearProcessData();
          this.navigationService.navigateHome();
          resolve(true);
        })
        .catch(() => {
          this.loader.remove(loaderId);
          this.lock = false;
          reject(false);
        });
      }
    });
  }

  public assignPerson(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (!this.lock) {
        this.lock = true;
        const user = this.transform.getVariable('user') as User;
        if (!user || !user.id) {
          this.toast.error('Er is geen gebruiker geselecteerd.', 5, true);
          this.lock = false;
          resolve(false);
        }
        const loaderId = this.loader.add('Bezig met opslaan!');
        this.endpoints.put('putCallUser', this.user).then((message: Call) => {
          this.loader.remove(loaderId);
          this.lock = false;
          this.storage.clearProcessData();
          this.navigationService.navigateHome();
          resolve(true);
        })
        .catch(() => {
          this.loader.remove(loaderId);
          this.lock = false;
          reject(false);
        });
      }
    });
  }
}
