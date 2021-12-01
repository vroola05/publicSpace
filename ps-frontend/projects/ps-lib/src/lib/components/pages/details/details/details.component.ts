import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Call } from '../../../../../model/call';
import { Order } from '../../../../../model/order';
import { CallList } from '../../../../../model/call-list';
import { ActionTypeEnum, PopupETypes, StatusTypes } from '../../../../../model/intefaces';
import { Note } from '../../../../../model/note';
import { Message } from '../../../../../model/message';

import { NavigationService } from '../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { ConfigService, PageTypes } from '../../../../services/config/config.service';
import { ActionService } from '../../../../services/action/action.service';
import { Loader } from '../../../../services/loader/loader.service';
import { Popup } from '../../../../services/popup/popup.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { PopupConfirmComponent } from '../../../popup/components/popup-confirm/popup-confirm.component';
import { PageAbstract } from '../../page';
import { TransformService } from '../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { EndpointService } from '../../../../services/endpoint/endpoint.service';
import { Page } from '../../../../../model/page';


@Component({
  selector: 'lib-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent extends PageAbstract implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];
  public page: Page;
  public call: Call;
  public getUrlImage: string;
  public headerData: CallList;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected navigationService: NavigationService,
    protected storage: StorageService,
    protected action: ActionService,
    protected transform: TransformService,
    protected authorisation: AuthorisationService,
    private config: ConfigService,
    private endpoints: EndpointService,
    private loader: Loader,
    private popup: Popup,
    private toast: ToastService
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation);
  }

  public ngOnInit(): void {
    super.ngOnInit();

    this.getCall();

    this.page = this.config.getPage(PageTypes.details);
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();

    this.action.register(ActionTypeEnum.CALL_CLOSE, () => { return super.callClose() });
    this.action.register(ActionTypeEnum.CALL_KILL, () => { return super.callKill() });

    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

  public getCall(): void {
    this.endpoints.get('getCallById').then((call: Call) => {
      this.transform.setVariable('call', call);
      this.call = call;
      this.headerData = this.config.transformCall(call);
    });
  }

  public onOrderChanged($event): void {
    switch ($event.action) {
      case 'not-accept':
        this.rejectOrder($event.data);
        break;
      case 'accept':
        this.acceptOrder($event.data);
        break;
      case 'close-rejected':
        this.closeRejectedOrder($event.data);
        break;
    }
  }

  public rejectOrder(data: { order: Order, note: Note }): void {
    if (data.note && data.note.description) {
      this.updateStatus(data.order, StatusTypes.ORDER_SEND, data.note);
    } else {
      this.toast.error('Het is verplicht een omschrijving te geven.', 5);
    }
  }

  public acceptOrder(order: Order): void {
    this.updateStatus(order, StatusTypes.ORDER_DONE_CLOSED, new Note());
  }

  public closeRejectedOrder(order: Order): void {
    this.updateStatus(order, StatusTypes.ORDER_REJECTED_CLOSED, new Note());
  }

  public updateStatus(order: Order, status: number, note: Note) {
    const item = this.findOrder(order);
    if (item) {
      /*
      const url = this.navigationService.transformURL(this.config.getEndpoint('putOrderStatus').endpoint, {
        id: this.call.id,
        orderId: order.id,
        status
      });
      */
      this.endpoints.put('putOrderStatus', note).then((mesage: Message) => {
        this.toast.success('De status is aangepast!', 5);
        this.getCall();
      });
    }
  }

  public findOrder(order: Order): Order {
    return this.call.orders.find(o => o.contractor.id === order.contractor.id);
  }

  public callKill(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.popup.add('Melding afbreken', PopupConfirmComponent, {
        description: '*** De opdrachten zullen ook afgebroken worden. Dit kan effect hebben op de verdere afhandelingen bij de partijen.'
      }, [{
        type: PopupETypes.ok, event: (text: string) => {
          if (text && text.length > 0) {
            const loaderId = this.loader.add('Bezig met opslaan!');
  
            this.endpoints.put('postCallAbort', text).then((mesage: Message) => {
              this.loader.remove(loaderId);
              resolve(true);
            })
              .catch(error => {
                this.loader.remove(loaderId);
                reject(false);
              });
          }
        }
      }]);
    });
  }

  public callClose(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.popup.add('Melding afsluiten', PopupConfirmComponent, {
      }, [{
        type: PopupETypes.ok, event: (text: string) => {
          if (text && text.length > 0) {
            const loaderId = this.loader.add('Bezig met opslaan!');
            const note = new Note();
            note.description = text;

            this.endpoints.post('postCallClose', note).then((mesage: Message) => {
              this.loader.remove(loaderId);
              resolve(true);
            })
              .catch(error => {
                this.loader.remove(loaderId);
                reject(false);
              });
          }
        }
      }]);
    });
  }

}
