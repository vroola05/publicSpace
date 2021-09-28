import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from '../../../../services/config/config.service';
import { ApiService } from '../../../../services/api/api.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { Location } from '../../../../../model/location';
import { Call } from '../../../../../model/call';
import { FieldError } from '../../../../../model/field-error';
import { CallList } from '../../../../../model/call-list';
import { ListTemplateT } from '../../../../../model/template';

import { Subscription } from 'rxjs';
import { TextFieldPrefillComponent } from '../../../fields/text-field-prefill/text-field-prefill.component';
import { TextFieldComponent } from '../../../fields/text-field/text-field.component';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { first } from 'rxjs/operators';
import { TransformService } from '../../../../services/transform/transform.service';


@Component({
  selector: 'lib-panel-new-map',
  templateUrl: './panel-new-map.component.html',
  styleUrls: ['./panel-new-map.component.scss']
})
export class PanelNewMapComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('streetComponent') streetComponent: TextFieldPrefillComponent;
  @ViewChild('numberComponent') numberComponent: TextFieldComponent;

  private searchLocationSubscription: Subscription;

  public call: Call;
  public callNearby: Call;
  public options: { name: string, value: string, data: any }[] = [];
  private number: string;
  private street: string;

  public errors: FieldError[] = [];

  public listTemplate: ListTemplateT;
  public callList: CallList[] = [];

  constructor(
    private apiService: ApiService,
    private config: ConfigService,
    private navigationService: NavigationService,
    private storage: StorageService,
    private transform: TransformService
  ) {
    const call = storage.getSession('call');
    if (call) {
      this.call = JSON.parse(call) as Call;
    } else {
      this.call = new Call();
      this.call.location = new Location();
    }

    this.listTemplate = this.config.template.pagesOld.newLocation.listTemplate;
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
  }

  public ngOnDestroy(): void {
    if (this.searchLocationSubscription) {
      this.searchLocationSubscription.unsubscribe();
    }
  }

  public showNearby(): boolean {
    return this.listTemplate != null && this.callList != null && this.callList.length > 0;
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

  public onNumberChanged($event): void {
    if ($event && $event > 0) {
      this.number = $event;
    } else {
      this.number = '';
    }
  }

  public onStreetChanged($event): void {
    if ($event !== null) {
      this.street = $event.data.street;
    } else {
      this.street = '';
    }
  }

  public storeLocation(location: Location) {
    this.errors = [];
    this.call.location = location;
    this.storage.setSession('call', JSON.stringify(this.call), true);
  }

  public clicked(location: Location) {
    this.transform.setVariable('location', location);
    this.apiService.get(
      this.transform.URL(this.config.getEndpoint('getLocationByCoordinates').endpoint))
      .pipe(first()).subscribe((result: Location) => {
        if (result) {
          result.latitude = location.latitude;
          result.longitude = location.longitude;
          this.storeLocation(result);
        }
      });

    /*if (this.listTemplate != null) {
      this.apiService.get(
        this.navigationService.transformURL(this.domain.getEndpoint('getNewLocationNearbyByCoordinates').endpoint, location))
        .pipe(first()).subscribe((callList: CallList[]) => {
          if (callList && callList.length > 0) {
            this.callList = callList;
          } else {
            this.callList = [];
          }
        });
      }*/
  }

  public getStreetList($event): void {
    if ($event.target.value.length === 0) {
      this.streetComponent.clear();
    } else {
      const location = new Location();
      location.street = $event.target.value;
      this.transform.setVariable('location', location);
      this.apiService.get(
        this.transform.URL(this.config.getEndpoint('getLocationByStreet').endpoint))
        .pipe(first()).subscribe((locations: Location[]) => {
          const options: { name: string, value: string, data: any }[] = [];

          locations.forEach(location => {
            options.push({ name: `${location.street}`, value: '', data: location });
          });

          this.streetComponent.setItems(options);
        });
    }
  }

  public search(): void {
    this.errors = [];
    if (this.street) {
      const location = new Location();
      location.street = this.street;
      location.number = this.number ? this.number : '';
      this.transform.setVariable('location', location);

      this.searchLocationSubscription = this.apiService.get(
        this.transform.URL(this.config.getEndpoint('getLocationByStreetAndNumber').endpoint))
        .subscribe(
          (location: Location) => {
            this.storeLocation(location);
          },
          () => {
            this.errors.push({ message: 'Het adres is niet gevonden!' });
          }
        );
    } else {
      this.errors.push({ message: 'De straat is verplicht!' });
    }
  }

  public clickedNearby($event): void {
    this.transform.setVariable('calllist', $event);
    this.callNearby = null;
    if (this.listTemplate.toggle) {
      this.apiService.get(
        this.transform.URL(this.config.getEndpoint('getListCall').endpoint))
        .pipe(first()).subscribe((call: Call) => {
        this.callNearby = call;
        this.transform.setVariable('call', call);
      });
    }

  }

  public validate(): boolean {
    const result = this.call
      && this.call.location
      && this.call.location.street
      && this.call.location.street.length > 0;
    if (!result) {
      this.errors = [{ message: 'Kies eerst een locatie!' }];
    }
    return result;
  }
}
