import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Call } from '../../../../../model/call';
import { Order } from '../../../../../model/order';
import { CallList } from '../../../../../model/call-list';
import { ButtonT } from '../../../../../model/template';
import { PopupETypes, StatusTypes } from '../../../../../model/intefaces';
import { Note } from '../../../../../model/note';
import { Message } from '../../../../../model/message';

import { NavigationService } from '../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { DomainService } from '../../../../services/domain/domain.service';
import { ActionService } from '../../../../services/action/action.service';
import { ApiService } from '../../../../services/api/api.service';
import { Loader } from '../../../../services/loader/loader.service';
import { Popup } from '../../../../services/popup/popup.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { PopupConfirmComponent } from '../../../popup/components/popup-confirm/popup-confirm.component';
import { PageAbstract } from '../../page';
import { TransformService } from '../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';



@Component({
  selector: 'lib-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent extends PageAbstract implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];
  public call: Call;
  public getUrlImages: string;
  public getUrlImage: string;
  public postUrlImage: string;
  public postUrlNote: string;
  public headerData: CallList;
  public buttonsLeft: ButtonT[];
  public buttonsRight: ButtonT[];

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected navigationService: NavigationService,
    protected storage: StorageService,
    protected action: ActionService,
    protected transform: TransformService,
    protected authorisation: AuthorisationService,
    private domain: DomainService,
    private apiService: ApiService,
    private loader: Loader,
    private popup: Popup,
    private toast: ToastService
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation);
   }

  public ngOnInit(): void {
    super.ngOnInit();
    this.getCall();
    this.buttonsLeft = this.domain.config.details.buttonsLeft;
    this.buttonsRight = this.domain.config.details.buttonsRight;
    if (this.domain.config.details.pageType) {
      this.pageType = this.domain.config.details.pageType;
    }

    this.action.register('abort-call', () => { this.abortCall(); });
    this.action.register('close-call', () => { this.closeCall(); });
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

  public getCall(): void {
    this.subscription.push(this.apiService.get(this.transform.URL(this.domain.getEndpoint('getDetailCall').endpoint)).subscribe((call: Call) => {
      this.transform.setVariable('call', call);
      this.call = call;
      this.getUrlImages = this.transform.URL(this.domain.getEndpoint('getImages').endpoint);
      this.getUrlImage = this.transform.URL(this.domain.getEndpoint('getImage').endpoint);
      this.postUrlImage = this.transform.URL(this.domain.getEndpoint('postImage').endpoint);
      this.postUrlNote = this.transform.URL(this.domain.getEndpoint('postNote').endpoint);
      this.headerData = this.domain.transformCall(call);
    }));
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

  public rejectOrder(data: {order: Order, note: Note}): void {
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
      const url = this.navigationService.transformURL(this.domain.getEndpoint('putOrderStatus').endpoint, {
        id: this.call.id,
        orderId: order.id,
        status
      });

      this.apiService.put(url, note).subscribe((mesage: Message) => {
        this.toast.success('De status is aangepast!', 5);
        this.getCall();
      });
    }
  }

  public findOrder(order: Order): Order {
    return this.call.orders.find(o => o.contractor.id === order.contractor.id);
  }

  public abortCall(): void {
    this.popup.add('Melding afbreken', PopupConfirmComponent, {
      description: '*** De opdrachten zullen ook afgebroken worden. Dit kan effect hebben op de verdere afhandelingen bij de partijen.'
    }, [{type: PopupETypes.ok, event: (text: string) => {
        if (text && text.length > 0) {
          const loaderId = this.loader.add('Bezig met opslaan!');
          const url = this.transform.URL(this.domain.getEndpoint('postCallAbort').endpoint);
          this.apiService.post(url, text).subscribe((mesage: Message) => {
            this.loader.remove(loaderId);
            this.cancel();
          },
          (error => {
            this.loader.remove(loaderId);
          }));
        }
      }}]);
  }

  public closeCall(): void {
    this.popup.add('Melding afsluiten', PopupConfirmComponent, {
    }, [{type: PopupETypes.ok, event: (text: string) => {
        if (text && text.length > 0) {
          const loaderId = this.loader.add('Bezig met opslaan!');
          const note = new Note();
          note.description = text;
          const url = this.transform.URL(this.domain.getEndpoint('postCallClose').endpoint);
          this.apiService.post(url, note).subscribe((mesage: Message) => {
            this.loader.remove(loaderId);
            this.cancel();
          },
          (error => {
            this.loader.remove(loaderId);
          }));
        }
      }}]);
  }
}
