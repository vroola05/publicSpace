import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Call } from '../../../../../model/call';
import { User } from '../../../../../model/user';
import { Image } from '../../../../../model/image';
import { DomainService } from '../../../../services/domain/domain.service';
import { Popup } from '../../../../services/popup/popup.service';
import { MapsComponent } from '../../../maps/maps.component';

@Component({
  selector: 'lib-panel-info',
  templateUrl: './panel-info.component.html',
  styleUrls: ['./panel-info.component.scss']
})
export class PanelInfoComponent implements OnInit {
  @Input() public call: Call;
  @Output() public changed: EventEmitter<any> = new EventEmitter<any>();

  @Input() public urlImages: string;
  @Input() public urlImage: string;
  @Input() public urlImageUpload: string;
  @Input() public urlNotes: string;

  constructor(
    private domain: DomainService,
    private popup: Popup
  ) { }

  ngOnInit(): void {
  }

  public getImage(createdBy: User): Image {
    const image = new Image();
    image.api = false;
    image.url = 'assets/images/www.png';
    image.name = 'Webformulier';
    image.alt = 'Inwoner';
    const endpoint = this.domain.getEndpoint('getProfileImage').endpoint;
    if (endpoint && createdBy && image.name) {
      image.api = true;
      image.url = endpoint + createdBy.profilePhoto;
      image.name = 'Toezichthouder';
      image.alt = createdBy.name;
    }

    return image;
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
