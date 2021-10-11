import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Call } from '../../../../../model/call';
import { Order } from '../../../../../model/order';
import { Group } from '../../../../../model/group';
import { User } from '../../../../../model/user';
import { Image } from '../../../../../model/image';
import { ConfigService } from '../../../../services/config/config.service';
import { Popup } from '../../../../services/popup/popup.service';
import { MapsComponent } from '../../../maps/maps.component';

@Component({
  selector: 'lib-panel-info-second',
  templateUrl: './panel-info-second.component.html',
  styleUrls: ['./panel-info-second.component.scss']
})
export class PanelInfoSecondComponent implements OnInit {
  @Input() public call: Call;
  @Input() public order: Order;
  @Output() public changed: EventEmitter<any> = new EventEmitter<any>();

  @Input() public urlImages: string;
  @Input() public urlImage: string;
  @Input() public urlImageUpload: string;

  constructor(
    private config: ConfigService,
    private popup: Popup
  ) { }

  ngOnInit(): void {
  }

  public getImage(user: User, title: string): Image {
    const image = new Image();
    image.api = false;
    image.url = 'assets/images/www.png';
    image.name = 'Webformulier';
    image.alt = 'Inwoner';

    const endpoint = this.config.getEndpoint('getProfileImage').endpoint;
    if (endpoint && user && image.name) {
      image.api = true;
      image.url = !user.profilePhoto ? '' : endpoint + user.profilePhoto;
      image.name = title;
      image.alt = user.name;
    }

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
      zoom: true,
      pan: true,
      zoomControl: true
    });
  }

  public isChanged(changed: string): void {
    this.changed.emit(changed);
  }
}
