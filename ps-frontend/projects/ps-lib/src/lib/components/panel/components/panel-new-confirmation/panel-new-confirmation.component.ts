import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfigService } from '../../../../services/config/config.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { Category } from '../../../../../model/category';
import { Call } from '../../../../../model/call';
import { MapsComponent } from '../../../maps/maps.component';
import { Popup } from '../../../../services/popup/popup.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { User } from '../../../../../model/user';
import { Image } from '../../../../../model/image';

@Component({
  selector: 'lib-panel-new-confirmation',
  templateUrl: './panel-new-confirmation.component.html',
  styleUrls: ['./panel-new-confirmation.component.scss']
})
export class PanelNewConfirmationComponent implements OnInit, OnDestroy {
  public call: Call;
  public askContact = false;
  public files: File[] = [];

  constructor(
    private config: ConfigService,
    private authorisation: AuthorisationService,
    private storage: StorageService,
    private popup: Popup
  ) {
    const call = this.storage.getSession('call');
    if (call) {
      this.call = JSON.parse(call) as Call;

      const user = this.authorisation.user;
      this.call.createdBy = new User();
      this.call.createdBy.username = user.username;
      this.call.createdBy.name = user.name;
      this.call.createdBy.profilePhoto = user.profilePhoto;
      this.storage.setSession('call', JSON.stringify(this.call), true);
    }
    const askContact = this.storage.getSession('askContact');
    if (askContact) {
      this.askContact = JSON.parse(askContact) as boolean;
    }

    const files = this.storage.getVariable('files');
    if (files) {
      this.files = files;
    }
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
  }

  public getShowCategory(): string {
    return (!this.call.mainCategory ? '' : this.call.mainCategory.name) + ' - '
      + (!this.call.mainCategory.category ? '' : this.call.mainCategory.category.name);
  }

  public getShowAddress(): string {
    if (!this.call && !this.call.location) {
      return '';
    }

    return (!this.call.location.street ? '' : this.call.location.street)
      + (!this.call.location.number ? '' : ' ' + this.call.location.number)
      + (!this.call.location.postal ? '' : ', ' + this.call.location.postal)
      + (!this.call.location.city ? '' : ' ' + this.call.location.city);
  }

  public getContact(): string {
    if (!this.call && !this.call.person) {
      return '';
    }

    return (!this.call.person.lastname ? '' : this.call.person.lastname)
      + '<br />'
      + (!this.call.person.email ? '' : this.call.person.email)
      + ' / '
      + (!this.call.person.phone ? '' : this.call.person.phone)
      + '<br />'
      + (!this.call.person.city ? '' : this.call.person.city)
      + (!this.call.person.street ? '' : ' ' + this.call.person.street)
      + (!this.call.person.number ? '' : ' ' + this.call.person.number)
      + (!this.call.person.letter ? '' : ' ' + this.call.person.letter);
  }

  public getImage(createdBy: User): Image {
    const image = new Image();
    image.api = false;
    image.url = 'assets/images/www.png';
    image.name = 'Webformulier';
    image.alt = 'Inwoner';

    const endpoint = this.config.getEndpoint('getProfileImage').endpoint;
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
      controls: true
    });
  }
}
