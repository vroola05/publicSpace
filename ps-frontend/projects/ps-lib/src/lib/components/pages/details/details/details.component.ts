import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDirective } from '../../../../directives/dynamic.directive';
import { Call } from '../../../../../model/call';
import { ActionTypeEnum, DynamicPanel, PopupETypes, StatusTypes } from '../../../../../model/intefaces';
import { Message } from '../../../../../model/message';
import { Note } from '../../../../../model/note';
import { Order } from '../../../../../model/order';
import { Page } from '../../../../../model/page';
import { ActionService } from '../../../../services/action/action.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { ConfigService, PageTypes } from '../../../../services/config/config.service';
import { EndpointService } from '../../../../services/endpoint/endpoint.service';
import { Loader } from '../../../../services/loader/loader.service';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { Popup } from '../../../../services/popup/popup.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { TransformService } from '../../../../services/transform/transform.service';
import { PopupConfirmComponent } from '../../../popup/components/popup-confirm/popup-confirm.component';
import { PageAbstract } from '../../page';
import { DynamicLeftDirective } from '../../../../directives/dynamic-left.directive';
import { DynamicRightDirective } from '../../../../directives/dynamic-right.directive';
import { Subscription } from 'rxjs';



@Component({
  selector: 'lib-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent extends PageAbstract implements OnInit, OnDestroy {
  
  @ViewChild(DynamicLeftDirective, {static: false}) private dynamicHostLeft!: DynamicLeftDirective;
  @ViewChild(DynamicRightDirective, {static: false}) private dynamicHostRight!: DynamicRightDirective;

  public page: Page;
  public getUrlImage: string;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected navigationService: NavigationService,
    protected storage: StorageService,
    protected action: ActionService,
    protected transform: TransformService,
    protected authorisation: AuthorisationService,
    protected config: ConfigService,
    private endpoints: EndpointService,
    private loader: Loader,
    private popup: Popup,
    private toast: ToastService
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation, config);

    this.page = this.config.getPage(PageTypes.details);    
    this.pageConfig = this.page.pageConfig;
  }

  public ngOnInit(): void {
    super.ngOnInit();

    this.getCall();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();

    this.action.register(ActionTypeEnum.CALL_CLOSE, () => { return super.callClose() });
    this.action.register(ActionTypeEnum.CALL_KILL, () => { return super.callKill() });
  }

  public getCall(): void {
    this.endpoints.get(this.pageConfig.getEndpoint('getCall')).then((call: Call) => {
      this.transform.setVariable('call', call);

      this.call = call;
      this.loadComponent(this.dynamicHostLeft.viewContainerRef, this.pageConfig.getComponent('left'));
      this.loadComponent(this.dynamicHostRight.viewContainerRef, this.pageConfig.getComponent('right'));
    });
  }

  public changed($event): void {
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
    return this.call.orders.find(o => o.contractorDomain.id === order.contractorDomain.id);
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
