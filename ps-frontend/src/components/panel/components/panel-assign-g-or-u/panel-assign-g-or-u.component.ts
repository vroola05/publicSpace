import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Call } from '../../../../model/call';
import { DynamicPanel } from '../../../../model/intefaces';
import { Image } from '../../../../model/image';
import { TransformService } from '../../../../services/transform/transform.service';
import { EndpointService } from '../../../../services/endpoint/endpoint.service';
import { Group } from '../../../../model/group';
import { User } from '../../../../model/user';
import { ConfigService } from '../../../../services/config/config.service';
import { PageConfig } from '../../../../model/domain-type-config';

@Component({
  selector: 'app-panel-assign-g-or-u',
  templateUrl: './panel-assign-g-or-u.component.html',
  styleUrls: ['./panel-assign-g-or-u.component.scss']
})
export class PanelAssignGOrUComponent implements DynamicPanel, OnInit {
  private _call: Call;
  @Input() public set call(call: Call) {
    this._call = call;
    this.transform.setVariable('group', call.group);
    if (call) {
      this.getUsers();
    }
  }
  public get call() {
    return this._call;
  }
  @Output() public changed: EventEmitter<any> = new EventEmitter<any>();
  
  @Input() public pageConfig: PageConfig;

  private search: string = '';
  private tab: 'user' | 'group' = 'user';

  public tabs: {name: string, value?: string, data?: any, selected: boolean}[] = [];

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
    return this.search === ''
      ? this._items
      : this._items.filter(item => item.image.alt.toLowerCase().includes(this.search.toLowerCase()));
  }

  constructor(
    protected transform: TransformService,
    private endpoints: EndpointService,
    protected config: ConfigService
  ) {
    this.tabs.push({name: 'Gebruiker', value: 'user', selected: false});
    this.tabs.push({name: 'Groep', value: 'group', selected: false});
  }

  public ngOnInit(): void {
    this.getGroups();
  }

  public setItems(): void {
    if (this.tab === 'user') {
      this.items = this._itemsUser;
      const user = this.transform.getVariable('user') as User;
      if (user) {
        this.items.forEach(g => g.selected = g.data.id === user.id);
      }
    } else if (this.tab === 'group') {
      this.items = this._itemsGroup;
      const group = this.transform.getVariable('group') as Group;
      if (group) {
        this.items.forEach(g => g.selected = g.data.id === group.id);
      }
    }
  }

  public getUsers() {
    this._itemsUser = [];
    this.endpoints.get(this.pageConfig.getEndpoint('getUsers')).then((users: User[]) => {
      const items = [];
      users.forEach(user => {
        items.push({selected: false, image: this.getImageOfUser(user), data: user});
      });
      this._itemsUser = items;
      this.setItems();
    });
  }

  public getGroups() {
    this._itemsGroup = [];
    this.endpoints.get(this.pageConfig.getEndpoint('getGroups')).then((groups: Group[]) => {
      const items = [];
        groups.forEach(group => {
          items.push({selected: false, image: this.getImageOfGroup(group), data: group});
        });
        this._itemsGroup = items;
    });
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
      image.alt = user.name;
    }

    return image;
  }

  public onTabChange($event) {
    this.tab = $event.tab.value;
    this.transform.setVariable('tab', this.tab);
    this.setItems();
  }

  public onItemChange($event) {
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
    console.log(this.tab, data);
    this.transform.setVariable(this.tab, data);
    this.changed.emit({ action: this.tab, data});
  }

  public onTyping($event): void {
    this.search = $event.target.value;
  }

  public getNoItemsText(): string {
    return this.tab === 'user' ? 'Geen personen!' : 'Geen groepen!';
  }
}
