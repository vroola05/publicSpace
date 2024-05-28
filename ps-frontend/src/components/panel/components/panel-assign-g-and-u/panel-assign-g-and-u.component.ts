import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Call } from '../../../../model/call';
import { DomainTypeEnum, DynamicPanel } from '../../../../model/intefaces';
import { Image } from '../../../../model/image';
import { TransformService } from '../../../../services/transform/transform.service';
import { EndpointService } from '../../../../services/endpoint/endpoint.service';
import { Group } from '../../../../model/group';
import { User } from '../../../../model/user';
import { ConfigService } from '../../../../services/config/config.service';
import { PageConfig } from '../../../../model/domain-type-config';

@Component({
  selector: 'app-panel-assign-g-and-u',
  templateUrl: './panel-assign-g-and-u.component.html',
  styleUrls: ['./panel-assign-g-and-u.component.scss']
})
export class PanelAssignGAndUComponent implements DynamicPanel, OnInit {
  private _call: Call;
  @Input() public set call(call: Call) {
    this._call = call;

    this.group = this.config.getDomainType().id === DomainTypeEnum.GOVERNMENT ? call.group : call.orders[0].group;
    this.transform.setVariable('group', this.group);
  
    if (call) {
      this.getGroups();
    }
  }
  
  public get call() {
    return this._call;
  }
  @Output() public changed: EventEmitter<any> = new EventEmitter<any>();
  @Input() public pageConfig: PageConfig;

  private search: string = '';

  public tabs: {name: string, value?: string, data?: any, selected: boolean}[] = [];

  public group: Group;

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
    
  }

  public ngOnInit(): void {
  }

  public getUsers() {
    this.endpoints.get(this.pageConfig.getEndpoint('getUsers')).then((users: User[]) => {
      const items = [];
      users.forEach(user => {
        items.push({selected: false, image: this.getImageOfUser(user), data: user});
      });
      this._items = items;

    });
  }

  public getGroups() {
    this.endpoints.get(this.pageConfig.getEndpoint('getGroups')).then((groups: Group[]) => {
      const tabs = [];
        groups.forEach(group => {
          tabs.push({ name: group.name, value: group.name, data: group, selected: this.group && group.id === this.group.id });
        });
        this.tabs = tabs;
        this.getUsers();
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
    this.group = $event.tab.data;
    this.transform.setVariable('group', this.group);
    this.changed.emit({ action: 'group', data: this.group});
    this.getUsers();
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
    this.transform.setVariable('user', data);
    this.changed.emit({ action: 'user', data});
  }

  public onTyping($event): void {
    this.search = $event.target.value;
  }

  public getNoItemsText(): string {
    return 'Geen personen!';
  }
}
