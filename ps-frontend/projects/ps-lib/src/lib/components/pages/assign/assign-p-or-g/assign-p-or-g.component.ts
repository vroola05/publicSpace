import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../../../services/api/api.service';
import { ConfigService } from '../../../../services/config/config.service';
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
import { ToastService } from '../../../../services/toast/toast.service';
import { TransformService } from '../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { ActionService } from '../../../../services/action/action.service';

@Component({
  selector: 'lib-assign-p-or-g',
  templateUrl: './assign-p-or-g.component.html',
  styleUrls: ['./assign-p-or-g.component.scss']
})
export class AssignPOrGComponent extends PageAbstract implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];
  private sending = false;

  public call: Call;
  public buttonsLeft: ButtonT[];
  public buttonsRight: ButtonT[];
  public tabs: {name: string, value?: string, data?: any, selected: boolean}[] = [];

  public searchtext = '';
  
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
//  private group: Group;
//  private user: User;

  public headerData: CallList;
  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected navigationService: NavigationService,
    protected storage: StorageService,
    protected action: ActionService,
    protected transform: TransformService,
    protected authorisation: AuthorisationService,
    private apiService: ApiService,
    private config: ConfigService,
    private loader: Loader,
    private toast: ToastService
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.getCall();

    this.buttonsLeft = this.config.template.assign.buttonsLeft;
    this.buttonsRight = this.config.template.assign.buttonsRight;
    if (this.config.template.assign.pageType) {
      this.pageLayoutType = this.config.template.assign.pageType;
    }

    this.tabs.push({name: 'Medewerker', value: 'user', selected: false});
    this.tabs.push({name: 'Team', value: 'group', selected: false});
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

  public getCall(): void {
    this.subscription.push(this.apiService.get(this.transform.URL(this.config.getEndpoint('getDetailCall').endpoint)).subscribe((call: Call) => {
      this.transform.setVariable('call', call);
      this.call = call;
      this.headerData = this.config.transformCall(call);
    }));
  }

  public clearSelection(): void {
    this.transform.deleteVariable('user');
    this.transform.deleteVariable('group');
  }

  public onTabChanged($event): void {
    this.clearSelection();
    this.type = $event.tab.value;
    if (this.type === 'user') {
      this.getPersons();
    } else if (this.type === 'group') {
      this.getTeams();
    }
  }

  public getPersons() {
    this.items = [];
    const url = this.transform.URL(this.config.getEndpoint('getAssignUsersOfGroup').endpoint);
    this.subscription.push(this.apiService.get(url )
      .subscribe((users: User[]) => {
        const items = [];
        users.forEach(user => {
          items.push({selected: false, image: this.getImageOfUser(user), data: user});
        });
        this.items = items;
      }));
  }

  public getTeams() {
    this.items = [];
    const url = this.transform.URL(this.config.getEndpoint('getAssignGroups').endpoint);
    this.subscription.push(this.apiService.get(url)
      .subscribe((groups: Group[]) => {
        const items = [];
        groups.forEach(group => {
          items.push({selected: false, image: this.getImageOfGroup(group), data: group});
        });
        this.items = items;
      }));
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
      this.transform.setVariable('user', data);
    } else if (this.type === 'group') {
      this.transform.setVariable('group', data);
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

  public cancel(): void {
    this.storage.clearProcessData();
    this.navigationService.navigateHome();
  }

  public submitUser(): void {
    if (!this.sending) {
      const user = this.transform.getVariable('user') as User;
      if (user && user.username) {
        this.sending = true;

        const loaderId = this.loader.add('Bezig met opslaan!');
        const url = this.transform.URL(this.config.getEndpoint('putAssignUser').endpoint);
        this.subscription.push(this.apiService.put(url, {}).subscribe((message: Message) => {
          this.loader.remove(loaderId);
          this.sending = false;
          this.storage.clearProcessData();
          this.navigationService.navigateHome();
        },
        () => {
          this.loader.remove(loaderId);
          this.sending = false;
        }));
      } else {
        this.toast.error('Er is geen gebruiker geselecteerd.', 5, true);
      }
    }
  }

  public submitGroup(): void {
    if (!this.sending) {
      const group = this.transform.getVariable('group') as Group;
      if (group && group.id) {
        this.sending = true;

        const loaderId = this.loader.add('Bezig met opslaan!');
        const url = this.transform.URL(this.config.getEndpoint('putAssignGroup').endpoint);
        this.subscription.push(this.apiService.put(url, {}).subscribe((message: Message) => {
          this.loader.remove(loaderId);
          this.sending = false;
          this.storage.clearProcessData();
          this.navigationService.navigateHome();
        },
        () => {
          this.loader.remove(loaderId);
          this.sending = false;
        }));
      } else {
        this.toast.error('Er is geen groep geselecteerd.', 5, true);
      }
    }
  }

  public submit(): void {
    if (this.type === 'user') {
      this.submitUser();
    } else if (this.type === 'group') {
      this.submitGroup();
    }
  }
}
