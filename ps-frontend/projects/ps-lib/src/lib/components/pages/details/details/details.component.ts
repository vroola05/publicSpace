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

  public changed($event: {action: string, data: any, note?: Note}): void {
    console.log('$event', $event);
    switch ($event.action) {
      case 'order-cancel':
        this.orderCancel($event.data);
        break;
      case 'order-reject':
        this.orderDoneReject($event.data);
        break;
      case 'order-close':
        this.orderClose($event.data);
        break;
      case 'close-rejected':
        this.orderClose($event.data);
        break;
    }
  }

  public orderAccept(order: Order): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log('orderAccept');
      reject(false);
    });
  }

  public orderReject(order: Order): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log('orderReject');
      reject(false);
    });
  }
  
  public orderCancel(order: Order): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log('orderCancel');
      reject(false);
    });
  }

  public orderClose(order: Order): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log('orderClose');
      reject(false);
    });
  }

  public orderDone(order: Order): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log('orderDone');
      reject(false);
    });
  }

  public orderDoneReject(order: Order): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log('orderDoneReject');
      reject(false);
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

}
