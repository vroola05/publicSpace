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
import { ConfigService } from '../../../../services/config/config.service';
import { ActionService } from '../../../../services/action/action.service';
import { Loader } from '../../../../services/loader/loader.service';
import { Popup } from '../../../../services/popup/popup.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { PopupConfirmComponent } from '../../../popup/components/popup-confirm/popup-confirm.component';
import { PageAbstract } from '../../page';
import { TransformService } from '../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { EndpointService } from '../../../../services/endpoint/endpoint.service';
import { Status } from '../../../../../model/status';



@Component({
  selector: 'lib-details-order',
  templateUrl: './details-order.component.html',
  styleUrls: ['./details-order.component.scss']
})
export class DetailsOrderComponent extends PageAbstract implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];
  public call: Call;
  public order: Order;
  public getUrlImage: string;
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
    /*this.buttonsLeft = this.config.template.details.buttonsLeft;
    this.buttonsRight = this.config.template.details.buttonsRight;
    if (this.config.template.details.pageType) {
      this.pageLayoutType = this.config.template.details.pageType;
    }*/

    //this.action.register('reject-order', () => { this.reject(); });
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

  public getCall(): void {
    this.endpoints.get('getDetailCall').then((call: Call) => {
      this.transform.setVariable('call', call);
      this.call = call;
      if (this.call.orders && this.call.orders.length > 0) {
        this.order = this.call.orders[0];
        this.transform.setVariable('order', this.order);
      }

      this.getUrlImage = this.transform.URL(this.config.getEndpoint('getImage').endpoint);
      this.headerData = this.config.transformCallOrder(call);
    });
  }

  public reject(): void {
    this.popup.add('Notitie bij weigering', PopupConfirmComponent, {},
    [{type: PopupETypes.ok, event: (text: string) => {
      if (text) {
        const note = new Note();
        note.description = text;

        this.order.status = new Status();
        this.order.status.id = StatusTypes.ORDER_REJECTED;

        this.endpoints.put('putOrderStatus', note).then((mesage: Message) => {
          this.toast.success('Opdracht is geweigerd!', 5);
          this.cancel();
        });
      } else {
        this.toast.error('Het is verplicht een omschrijving te geven.', 5);
      }

    }}]);
  }


}
