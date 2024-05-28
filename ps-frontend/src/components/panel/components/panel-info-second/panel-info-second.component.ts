import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Call } from '../../../../model/call';
import { Order } from '../../../../model/order';
import { Group } from '../../../../model/group';
import { User } from '../../../../model/user';
import { Image } from '../../../../model/image';
import { ConfigService } from '../../../../services/config/config.service';
import { Popup } from '../../../../services/popup/popup.service';
import { MapsComponent } from '../../../maps/maps.component';
import { DynamicPanel } from '../../../../model/intefaces';
import { PageConfig } from '../../../../model/domain-type-config';
import { DomainTypeEnum } from '../../../../model/intefaces';

@Component({
  selector: 'app-panel-info-second',
  templateUrl: './panel-info-second.component.html',
  styleUrls: ['./panel-info-second.component.scss']
})
export class PanelInfoSecondComponent implements DynamicPanel, OnInit {
  @Input() public order: Order;
  public _call: Call;
  @Input() public set call(call: Call) {
    if (call) {
      this._call = call;
      if (this.config.getDomainType().id === DomainTypeEnum.CONTRACTOR) {
        if (this._call.orders && this._call.orders.length > 0) {
          this.order = this._call.orders[0];
        }
      }
    }
  }
  public get call() {
    return this._call;
  }
  @Output() public changed: EventEmitter<any> = new EventEmitter<any>();
  @Input() public pageConfig: PageConfig;



  @Input() public urlImages: string;
  @Input() public urlImage: string;
  @Input() public urlImageUpload: string;

  constructor(
    private config: ConfigService,
    private popup: Popup
  ) { }

  public ngOnInit(): void {
  }

  public getImage(user: User, title: string): Image {
    const image = new Image();
    image.name = title;
    image.alt = user.name;

    return image;
  }

  public groupsAsString(groups: Group[]): string {
    if (groups && groups.length > 0) {
      return groups.map((group) => group.name).join(', ');
    }

    return '';
  }

  public popupMap($event) {
    this.popup.add(this.call.location.street + ' ' + this.call.location.number, MapsComponent, {
      location: this.call.location,
      classes: 'big',
      controls: true
    });
  }

  public isChanged(changed: string): void {
    this.changed.emit(changed);
  }
}
