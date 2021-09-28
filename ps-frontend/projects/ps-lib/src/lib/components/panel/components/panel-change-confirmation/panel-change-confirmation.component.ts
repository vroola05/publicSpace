import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConfigService } from '../../../../services/domain/domain.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { Category } from '../../../../../model/category';
import { Location } from '../../../../../model/location';
import { Call } from '../../../../../model/call';
import { MapsComponent } from '../../../maps/maps.component';
import { Popup } from '../../../../services/popup/popup.service';
import { ApiService } from '../../../../services/api/api.service';
import { Subscription } from 'rxjs';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { TransformService } from '../../../../services/transform/transform.service';

@Component({
  selector: 'lib-panel-change-confirmation',
  templateUrl: './panel-change-confirmation.component.html',
  styleUrls: ['./panel-change-confirmation.component.scss']
})
export class PanelChangeConfirmationComponent implements OnInit, OnDestroy {
  public _call: Call;
  @Input() public set call(call: Call) {
    this._call = call;

    if (this.callChanged && this.callChanged.priority == null) {
      this.callChanged.priority = call.priority;
      this.storage.setSession('call', JSON.stringify(this.callChanged), true);
    }
  }
  @Output() changed: EventEmitter<any> = new EventEmitter();
  public callChanged: Call;

  private categoriesMainSubscription: Subscription;

  constructor(
    private config: ConfigService,
    protected navigationService: NavigationService,
    private storage: StorageService,
    private apiService: ApiService,
    protected transform: TransformService,
    private popup: Popup
  ) {
    const callChanged = this.storage.getSession('call');
    if (callChanged) {
      this.callChanged = JSON.parse(callChanged) as Call;
    } else {
      this.callChanged = new Call();
    }
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    if (this.categoriesMainSubscription) {
      this.categoriesMainSubscription.unsubscribe();
    }
  }

  public onPriorityChanged($event): void {
    this.callChanged.priority = $event;
    this.storage.setSession('call', JSON.stringify(this.callChanged), true);
  }

  public changeInformation(): void {
    if (!this.callChanged) {
      this.callChanged = new Call();
    }
    if (!this.callChanged.description) {
      this.callChanged.description = this._call.description;
    }

    if (this.callChanged.mainCategory && this.callChanged.mainCategory.id && this.callChanged.mainCategory.category && this.callChanged.mainCategory.category.id) {
      this.storage.setSession('call', JSON.stringify(this.callChanged), true);
      this.changed.emit('change-information');
    } else {
      const url = this.transform.URL(this.config.getEndpoint('getNewInformationMainCategory').endpoint);
      this.categoriesMainSubscription = this.apiService.get(url)
        .subscribe((category: Category) => {
          this.storage.setSession('mainCategory', JSON.stringify(category), true);

          this.callChanged.mainCategory = this._call.mainCategory;
          this.storage.setSession('call', JSON.stringify(this.callChanged), true);
          this.changed.emit('change-information');
        });
    }
  }

  public changeLocation(): void {
    if (!this.callChanged) {
      this.callChanged = new Call();
    }
    this.callChanged.location = this._call.location;
    this.storage.setSession('call', JSON.stringify(this.callChanged), true);
    this.changed.emit('change-location');
  }

  public undoInformation(): void {
    delete this.callChanged.description;
    delete this.callChanged.mainCategory;
    this.storage.setSession('call', JSON.stringify(this.callChanged), true);
  }

  public undoLocation(): void {
    delete this.callChanged.location;
    this.storage.setSession('call', JSON.stringify(this.callChanged), true);
  }

  public hasLocationChanged(): boolean {
    if (this._call
      && this._call.location
      && this.callChanged
      && this.callChanged.location
      && !this.compareLocation(this.callChanged.location, this._call.location)) {
      return true;
    }
    return false;
  }

  public compareLocation(loc1: Location, loc2: Location): boolean {
    return loc1.street === loc2.street
      && loc1.number === loc2.number
      && loc1.city === loc2.city;
  }

  public hasinformationChanged(): boolean {
    if (this.hasDescriptionChanged() || this.hasCategoryChanged()) {
      return true;
    }
    return false;
  }

  public hasPriorityChanged(): boolean {
    if (this._call && this.callChanged) {
      if (this.callChanged.priority !== this._call.priority) {
        return true;
      }
    }
    return false;
  }

  public hasDescriptionChanged(): boolean {
    if (this._call && this.callChanged) {
      if (this.callChanged.description && this.callChanged.description !== this._call.description) {
        return true;
      }
    }
    return false;
  }

  public hasCategoryChanged(): boolean {
    if (this._call && this.callChanged) {
      if (
        this.callChanged.mainCategory
        && this.callChanged.mainCategory.id !== this._call.mainCategory.id
        && this.callChanged.mainCategory.category
        && this.callChanged.mainCategory.category.id !== this._call.mainCategory.category.id) {
        return true;
      }
    }
    return false;
  }

  public getShowCategory(): string {
    if (this.callChanged && this.callChanged.mainCategory && this.callChanged.mainCategory.category) {
      return (!this.callChanged.mainCategory ? ''
        : this.callChanged.mainCategory.name)
        + ' - ' + (!this.callChanged.mainCategory.category ? '' : this.callChanged.mainCategory.category.name);
    }
    return '';
  }

  public getShowAddress(location: Location): string {
    if (!location) {
      return '';
    }

    return (!location.street ? '' : location.street)
      + (!location.number ? '' : ' ' + location.number)
      + (!location.postal ? '' : ', ' + location.postal)
      + (!location.city ? '' : ' ' + location.city);
  }

  public popupMap($event, location: Location) {
    this.popup.add(location.street + ' ' + location.number, MapsComponent, {
      location,
      classes: 'big',
      zoom: true,
      pan: true,
      zoomControl: true
    });
  }
}
