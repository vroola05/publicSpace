import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDirective } from '../../../../directives/dynamic.directive';
import { Call } from '../../../../../model/call';
import { ActionTypeEnum, DomainTypeEnum, DynamicPanel, PopupETypes, StatusTypes } from '../../../../../model/intefaces';
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

    this.action.register(ActionTypeEnum.ORDER_CANCEL, () => { return super.orderCancel(); });
    this.action.register(ActionTypeEnum.ORDER_REJECT, () => { return super.orderReject(); });
  }

  public getCall(): void {
    this.endpoints.get(this.pageConfig.getEndpoint('getCall')).then((call: Call) => {
      this.transform.setVariable('call', call);

      this.call = call;

      if (this.authorisation.isDomainType(DomainTypeEnum.CONTRACTOR)) {
        this.transform.setVariable('order', call.orders[0]);
      }

      this.loadComponent(this.dynamicHostLeft.viewContainerRef, this.pageConfig.getComponent('left'));
      this.loadComponent(this.dynamicHostRight.viewContainerRef, this.pageConfig.getComponent('right'));
    });
  }

  public changed($event: {action: string, data: any, note?: Note}): void {
    this.transform.setVariable('order', $event.data);
    
console.log('lala', $event.data);
    switch ($event.action) {
      case 'order-cancel':
        this.orderCancel();
        break;
      case 'order-reject':
        this.orderDoneReject();
        break;
      case 'order-accept':
        this.orderDoneReject();
        break;
      case 'order-close':
        this.orderClose();
        break;
      case 'close-rejected':
        this.orderClose();
        break;
    }
  }

  public orderAccept(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log('orderAccept');
      reject(false);
    });
  }

  public orderReject(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const order = this.getOrder();
        this.transform.setVariable('actionType', {id: ActionTypeEnum.ORDER_CANCEL});
        this.endpoints.put('putActionOrderReject', order).then((order: Order) => {
          resolve(true);
        })
        .catch(err => {
          reject(false);
        });
      } catch (e) {
        console.error(e);
        reject(false);
      }
    });
  }
  
  public orderCancel(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const order = this.getOrder();
        this.transform.setVariable('actionType', {id: ActionTypeEnum.ORDER_CANCEL});
        this.endpoints.put('putActionOrderCancel', order).then((order: Order) => {
          resolve(true);
        })
        .catch(err => {
          reject(false);
        });
      } catch (e) {
        console.error(e);
        reject(false);
      }

    });
  }

  public orderClose(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log('orderClose');
      reject(false);
    });
  }

  public orderDone(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log('orderDone');
      reject(false);
    });
  }

  public orderDoneReject(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const order = this.getOrder();
        this.transform.setVariable('actionType', {id: ActionTypeEnum.ORDER_DONE_REJECT});
        this.endpoints.put('putActionOrderRejectDone', order).then((order: Order) => {
          resolve(true);
        })
        .catch(err => {
          reject(false);
        });
      } catch (e) {
        console.error(e);
        reject(false);
      }
    });
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
        type: PopupETypes.ok, event: (content: string) => {
          if (content && content.length > 0) {
            const loaderId = this.loader.add('Bezig met opslaan!');
            const note = new Note();
            note.content = content;

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

  public getOrder(): Order {
    const order = this.transform.getVariable('order');;
    if (order) {
      return order;
    }
    throw 'Order not found';
  }
}
