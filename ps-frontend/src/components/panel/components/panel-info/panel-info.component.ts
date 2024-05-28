import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Call } from '../../../../model/call';
import { User } from '../../../../model/user';
import { Image } from '../../../../model/image';
import { ConfigService } from '../../../../services/config/config.service';
import { Popup } from '../../../../services/popup/popup.service';
import { MapsComponent } from '../../../maps/maps.component';
import { DynamicPanel } from '../../../../model/intefaces';
import { PageConfig } from '../../../../model/domain-type-config';

@Component({
  selector: 'app-panel-info',
  templateUrl: './panel-info.component.html',
  styleUrls: ['./panel-info.component.scss']
})
export class PanelInfoComponent implements DynamicPanel, OnInit {
  @Input() public call: Call;
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

  public getImage(user: User): Image {
    const image = new Image();
    image.name = 'Toezichthouder';
    image.alt = user.name;

    return image;
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
