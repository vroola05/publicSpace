import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TextareaFieldComponent } from '../../../fields/textarea-field/textarea-field.component';
import { StorageService } from '../../../../services/storage/storage.service';
import { Call } from '../../../../../model/call';
import { Person } from '../../../../../model/person';
import { Subscription } from 'rxjs';
import { EndpointService } from '../../../../services/endpoint/endpoint.service';
import { DropdownFieldComponent } from '../../../fields/dropdown-field/dropdown-field.component';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { ValidationService } from '../../../../services/validation/validation.service';

@Component({
  selector: 'lib-panel-new-contact',
  templateUrl: './panel-new-contact.component.html',
  styleUrls: ['./panel-new-contact.component.scss']
})
export class PanelNewContactComponent implements OnInit, OnDestroy {
  private channelsSubscription: Subscription;

  @ViewChild('nameComponent') nameComponent: TextareaFieldComponent;
  @ViewChild('emailComponent') emailComponent: TextareaFieldComponent;
  @ViewChild('phoneComponent') phoneComponent: TextareaFieldComponent;

  @ViewChild('cityComponent') cityComponent: TextareaFieldComponent;
  @ViewChild('streetComponent') streetComponent: TextareaFieldComponent;
  @ViewChild('numberComponent') numberComponent: TextareaFieldComponent;
  @ViewChild('letterComponent') letterComponent: TextareaFieldComponent;
  @ViewChild('channelComponent') channelComponent: DropdownFieldComponent;

  public call: Call;

  public askContact = false;
  public isCC = false;
  public files: File[] = [];
  public validatorsEmail = [{pattern: '/^[^\s@]+@[^\s@]+\.[^\s@]+$/', text: 'Geen geldig emailadres!'}];

  constructor(
    private endpoints: EndpointService,
    private storage: StorageService,
    private authorisation: AuthorisationService,
    private validation: ValidationService
  ) {

    this.getCall();

    const askContact = this.storage.getSession('askContact');
    if (askContact) {
      this.askContact = JSON.parse(askContact) as boolean;
    }

    const files = this.storage.getVariable('files');
    if (files) {
      this.files = files;
    }

    const user = this.authorisation.user;
    if (user && user.type === 'callcenter') {
      this.isCC = true;
    }
  }

  public ngOnInit(): void {
    if (this.isCC) {
      this.endpoints.get('getNewInformationChannels').then((channels: string[]) => {
        const items = [];
        channels.forEach(channel => {
          items.push({name: channel, value: channel});
        });
        this.channelComponent.setItems(items);
      });
    }
  }

  public ngOnDestroy(): void {
    if (this.channelsSubscription) {
      this.channelsSubscription.unsubscribe();
    }
  }

  public getCall(): void {
    const call = this.storage.getSession('call');
    if (call) {
      this.call = JSON.parse(call) as Call;
    } else {
      this.call =  new Call();
    }
  }

  public onAskContactChanged($event) {
    this.askContact = $event;
    this.storage.setSession('askContact', JSON.stringify($event), true);
    this.setContactFields();
  }

  public setContactFields() {
    this.getCall();
    if (this.askContact) {
      this.call.person = new Person();
      this.call.person.name = '';
      this.call.person.email = '';
      this.call.person.phone = '';
      this.call.person.city = '';
      this.call.person.street = '';
      this.call.person.number = '';
      this.call.person.letter = '';
    } else {
      this.call.person = null;
      this.nameComponent.value = '';
      this.emailComponent.value = '';
      this.phoneComponent.value = '';
      this.cityComponent.value = '';
      this.streetComponent.value = '';
      this.numberComponent.value = '';
      this.letterComponent.value = '';
    }
    this.storage.setSession('call', JSON.stringify(this.call), true);
  }

  public onNameChanged($event) {
    console.log(this.validation.validateField('new-call-information', 'name'));
    if (this.validation.validateField('new-call-information', 'name')) {
      this.getCall();
      this.call.person.name = $event;
      this.storage.setSession('call', JSON.stringify(this.call), true);
    }
  }

  public onEmailChanged($event) {
    console.log(this.validation.validateField('new-call-information', 'email'));
    if (this.validation.validateField('new-call-information', 'email')) {
      this.getCall();
      this.call.person.email = $event;
      this.storage.setSession('call', JSON.stringify(this.call), true);
    }
  }

  public onPhoneChanged($event) {
    if (this.validation.validateField('new-call-information', 'phone')) {
      this.getCall();
      this.call.person.phone = $event;
      this.storage.setSession('call', JSON.stringify(this.call), true);
    }
  }

  public onCityChanged($event) {
    if (this.validation.validateField('new-call-information', 'city')) {
      this.getCall();
      this.call.person.city = $event;
      this.storage.setSession('call', JSON.stringify(this.call), true);
    }
  }

  public onStreetChanged($event) {
    if (this.validation.validateField('new-call-information', 'street')) {
      this.getCall();
      this.call.person.street = $event;
      this.storage.setSession('call', JSON.stringify(this.call), true);
    }
  }

  public onNumberChanged($event) {
    if (this.validation.validateField('new-call-information', 'number')) {
      this.getCall();
      this.call.person.number = $event;
      this.storage.setSession('call', JSON.stringify(this.call), true);
    }
  }

  public onLetterChanged($event) {
    if (this.validation.validateField('new-call-information', 'letter')) {
      this.getCall();
      this.call.person.letter = $event;
      this.storage.setSession('call', JSON.stringify(this.call), true);
    }
  }

  public onFilesChanged($event) {
      this.storage.setVariable('files', $event, true);
  }

  public onChannelChanged($event) {
    if (this.validation.validateField('new-call-information', 'channel')) {
      this.getCall();
      this.call.channel = $event.value;
      this.storage.setSession('call', JSON.stringify(this.call), true);
    }
  }
}
