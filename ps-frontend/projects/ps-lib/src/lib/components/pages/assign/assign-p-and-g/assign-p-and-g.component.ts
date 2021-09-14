import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { ActionService } from '../../../../services/action/action.service';
import { ApiService } from '../../../../services/api/api.service';
import { DomainService } from '../../../../services/domain/domain.service';
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


@Component({
  selector: 'lib-assign-p-and-g',
  templateUrl: './assign-p-and-g.component.html',
  styleUrls: ['./assign-p-and-g.component.scss']
})
export class AssignPAndGComponent extends PageAbstract implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];
  private sending = false;
  private type: 'user' | 'group' = 'user';

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
    private domain: DomainService,
    private loader: Loader,
    private toast: ToastService
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.getCall();

    this.buttonsLeft = this.domain.config.assign.buttonsLeft;
    this.buttonsRight = this.domain.config.assign.buttonsRight;
    if (this.domain.config.assign.pageType) {
      this.pageType = this.domain.config.assign.pageType;
    }

    this.action.register('submit-group', () => { this.submitGroup(); });
    this.action.register('submit-user', () => { this.submitUser(); });
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

  public getCall(): void {
    this.subscription.push(this.apiService.get(this.transform.URL(
      this.domain.getEndpoint('getDetailCall').endpoint)).subscribe((call: Call) => {
      this.transform.setVariable('call', call);
      this.call = call;
      this.getTeams();
      this.headerData = this.domain.transformCall(call);
    }));
  }
  public onTabChanged($event): void {
    this.transform.deleteVariable('user');
    this.transform.setVariable('group', $event.tab.data);
    this.getPersons();
  }

  public getPersons() {
    this.items = [];
    const url = this.transform.URL(this.domain.getEndpoint('getAssignUsersOfGroup').endpoint);
    this.subscription.push(this.apiService.get(url)
      .subscribe((users: User[]) => {
        const items = [];
        users.forEach(user => {
          items.push({ selected: false, image: this.getImageOfUser(user), data: user });
        });
        this.items = items;
      }));
  }

  public getTeams() {
    this.items = [];
    const url = this.transform.URL(this.domain.getEndpoint('getAssignGroups').endpoint);
    this.subscription.push(this.apiService.get(url)
      .subscribe((groups: Group[]) => {
        const tabs = [];
        groups.forEach(group => {
          tabs.push({ name: group.name, value: group.name, data: group, selected: false });
        });
        this.tabs = tabs;
      }));
  }

  public onItemChanged($event): void {
    this.transform.setVariable('user', $event.data.data);
    this.items.forEach(item => {
      if ($event.data.image.alt === item.image.alt) {
        item.selected = true;
      } else {
        item.selected = false;
      }
    });
  }

  public getImageOfUser(user: User): Image {
    const image = new Image();
    if (user && user.name) {
      image.api = true;
      image.url = (user.profilePhoto && user.profilePhoto !== '') ? this.domain.getEndpoint('getProfileImage').endpoint + user.profilePhoto : '';
      image.name = 'Medewerker';
      image.alt = user.name;
    }

    return image;
  }

  public onTyping($event): void {
    this.searchtext = $event.target.value;
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
        const url = this.transform.URL(this.domain.getEndpoint('putAssignUser').endpoint);
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
        const url = this.transform.URL(this.domain.getEndpoint('putAssignGroup').endpoint);
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
}
