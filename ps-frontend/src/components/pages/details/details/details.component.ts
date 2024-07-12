import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDirective } from '../../../../directives/dynamic.directive';
import { Call } from '../../../../model/call';
import { ActionTypeEnum, DomainTypeEnum, DynamicPanel, NoteTypeEnum, PopupETypes, StatusTypes } from '../../../../model/intefaces';
import { Message } from '../../../../model/message';
import { Note, NoteType } from '../../../../model/note';
import { Order } from '../../../../model/order';
import { Page } from '../../../../model/page';
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
import { PageAbstract } from '../../page';
import { DynamicLeftDirective } from '../../../../directives/dynamic-left.directive';
import { DynamicRightDirective } from '../../../../directives/dynamic-right.directive';
import { OrderNote } from '../../../../model/order-note';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent extends PageAbstract implements OnInit, OnDestroy {

  @ViewChild(DynamicLeftDirective, { static: false }) private dynamicHostLeft!: DynamicLeftDirective;
  @ViewChild(DynamicRightDirective, { static: false }) private dynamicHostRight!: DynamicRightDirective;

  public override page: Page;
  public getUrlImage: string;
  
  protected loaderId: number;

  constructor(
    protected override router: Router,
    protected override activatedRoute: ActivatedRoute,
    protected override navigationService: NavigationService,
    protected override storage: StorageService,
    protected override action: ActionService,
    protected override transform: TransformService,
    protected override authorisation: AuthorisationService,
    protected override config: ConfigService,
    private endpoints: EndpointService,
    private loader: Loader,
    private popup: Popup,
    private toast: ToastService
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation, config);

    this.page = this.config.getPage(PageTypes.details);
    this.pageConfig = this.page.pageConfig;
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this.getCall();
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();

    this.action.register(ActionTypeEnum.CALL_CLOSE, () => { return super.callClose() });
    this.action.register(ActionTypeEnum.CALL_KILL, () => { return super.callKill() });

    this.action.register(ActionTypeEnum.ORDER_CANCEL, () => { return super.orderCancel(); });
    this.action.register(ActionTypeEnum.ORDER_ACCEPT, () => { return super.orderAccept(); });
    this.action.register(ActionTypeEnum.ORDER_REJECT, () => { return super.orderReject(); });
  }

  public getCall(): void {

    this.endpoints.get(this.pageConfig.getEndpoint('getCall')).then((call: Call) => {
      this.parseCall(call)
      
      
      this.setCall(call);

      this.loadComponent(this.dynamicHostLeft.viewContainerRef, this.pageConfig.getComponent('left'));
      this.loadComponent(this.dynamicHostRight.viewContainerRef, this.pageConfig.getComponent('right'));
    });
  }

  public setCall(call: Call): void {
    this.transform.setVariable('call', call);
      this.call = call;
      if (this.authorisation.isDomainType(DomainTypeEnum.CONTRACTOR)) {
        console.log(call);
        console.log(call.orders[0]);
        this.transform.setVariable('order', call.orders[0]);
      }
  }

  
  public getOrder(): Order {
    const order = this.transform.getVariable('order');
    if (order) {
      return order;
    }
    throw 'Order not found';
  }

  public setOrder(order: Order): void {
    if (this.authorisation.isDomainType(DomainTypeEnum.CONTRACTOR)) {
      this.transform.setVariable('order', order);
    }
  }

  public override changed($event: { action: string, data: any, note?: any }): void {
    this.transform.setVariable('order', $event.data);

    switch ($event.action) {
      case 'order-cancel':
        this.orderCancel();
        break;
      case 'order-reject':
        this.orderDoneReject();
        break;
      case 'order-close':
        this.orderClose();
        break;
      case 'close-rejected':
        this.orderClose();
        break;
      case 'order-note':
          this.orderNote($event.note);
          break;
      case 'delete-created':
        this.orderDeleteCreated();
    }
  }

  public orderNote(orderNote: OrderNote) {
    return new Promise((resolve, reject) => {
      try {
        this.loaderId = this.loader.add('Bezig met opslaan!');
        this.endpoints.post('postOrderNote', orderNote).then((orderNoteNew: OrderNote) => {
          const order = this.getOrder();
          order.notes.push(orderNoteNew);
          this.loader.remove(this.loaderId);
        })
        .catch(err => {
          this.loader.remove(this.loaderId);
            reject(false);
          });
      } catch (e) {
        this.loader.remove(this.loaderId);
        console.error(e);
        reject(false);
      }
    });
  }

  // TODO - delete this function
  orderDeleteCreated() {
    const order = this.getOrder();
        
        this.endpoints.delete('deleteOrder').then(() => {
          console.log('done');
        })
        .catch(err => {
            
          });
    
    throw new Error('Method not implemented.');
  }

  public override orderReject(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.loaderId = this.loader.add('Bezig met opslaan!');
        const order = this.getOrder();
        this.transform.setVariable('actionType', { id: ActionTypeEnum.ORDER_REJECT });
        this.endpoints.put('putActionOrderReject', order).then((call: Call) => {
          this.setCall(call);
          this.onActionFinishedContractor('Opgeslagen!', resolve);
        })
        .catch(err => {
          this.loader.remove(this.loaderId);
            reject(false);
          });
      } catch (e) {
        this.loader.remove(this.loaderId);
        console.error(e);
        reject(false);
      }
    });
  }

  public override orderAccept(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.loaderId = this.loader.add('Bezig met opslaan!');
        const order = this.getOrder();
        this.transform.setVariable('actionType', { id: ActionTypeEnum.ORDER_CANCEL });
        this.endpoints.put('putActionOrderAccept', order).then((call: Call) => {
          this.setCall(call);
          this.onActionFinishedContractor('Opgeslagen!', resolve)
        })
          .catch(err => {
            this.loader.remove(this.loaderId);
            reject(false);
          });
      } catch (e) {
        this.loader.remove(this.loaderId);
        console.error(e);
        reject(false);
      }
    });
  }

  public override orderCancel(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.loaderId = this.loader.add('Bezig met opslaan!');
        const order = this.getOrder();
        this.transform.setVariable('actionType', { id: ActionTypeEnum.ORDER_CANCEL });
        this.endpoints.put('putActionOrderCancel', order).then((call: Call) => {
          this.loader.remove(this.loaderId);
          this.setCall(call);
          resolve(true);
        })
          .catch(err => {
            this.loader.remove(this.loaderId);
            reject(false);
          });
      } catch (e) {
        this.loader.remove(this.loaderId);
        console.error(e);
        reject(false);
      }

    });
  }

  public override orderClose(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.loaderId = this.loader.add('Bezig met opslaan!');
        const order = this.getOrder();
        this.transform.setVariable('actionType', { id: ActionTypeEnum.ORDER_CLOSE });
        this.endpoints.put('putActionOrderClose', order).then((call: Call) => {
          this.loader.remove(this.loaderId);
          this.setCall(call);
          resolve(true);
        })
          .catch(err => {
            this.loader.remove(this.loaderId);
            reject(false);
          });
      } catch (e) {
        this.loader.remove(this.loaderId);
        console.error(e);
        reject(false);
      }
    });
  }

  public override orderDoneReject(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.loaderId = this.loader.add('Bezig met opslaan!');
        const order = this.getOrder();
        this.transform.setVariable('actionType', { id: ActionTypeEnum.ORDER_DONE_REJECT });
        this.endpoints.put('putActionOrderRejectDone', order).then((call: Call) => {
          this.loader.remove(this.loaderId);
          this.setCall(call);
          resolve(true);
        })
          .catch(err => {
            this.loader.remove(this.loaderId);
            reject(false);
          });
      } catch (e) {
        this.loader.remove(this.loaderId);
        console.error(e);
        reject(false);
      }
    });
  }

  public onActionFinishedContractor(message: string = '', resolve: (value: boolean) => void): void {
    this.storage.clearProcessData();
    this.navigationService.navigateHome();
    this.loader.remove(this.loaderId);
    if (message !== '') {
      this.toast.success(message, 15);
    }
    resolve(true);
  }

  public findOrder(order: Order): Order {
    return this.call.orders.find(o => o.contractorDomain.id === order.contractorDomain.id);
  }

  // public callKill(): Promise<boolean> { 
  //   return new Promise((resolve, reject) => {
  //     this.popup.add('Melding afbreken', PopupConfirmComponent, {
  //       description: '*** De opdrachten zullen ook afgebroken worden. Dit kan effect hebben op de verdere afhandelingen bij de partijen.'
  //     }, [{
  //       type: PopupETypes.ok, event: (text: string) => {
  //         if (text && text.length > 0) {
  //           const loaderId = this.loader.add('Bezig met opslaan!');

  //           this.endpoints.put('postCallAbort', text).then((mesage: Message) => {
  //             this.loader.remove(loaderId);
  //             resolve(true);
  //           })
  //             .catch(error => {
  //               this.loader.remove(loaderId);
  //               reject(false);
  //             });
  //         }
  //       }
  //     }]);
  //   });
  // }

  // public callClose(): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     this.popup.add('Melding afsluiten', PopupConfirmComponent, {
  //     }, [{
  //       type: PopupETypes.ok, event: (content: string) => {
  //         if (content && content.length > 0) {
  //           const loaderId = this.loader.add('Bezig met opslaan!');
  //           const note = new Note();
  //           note.content = content;

  //           this.endpoints.post('postCallClose', note).then((mesage: Message) => {
  //             this.loader.remove(loaderId);
  //             resolve(true);
  //           })
  //             .catch(error => {
  //               this.loader.remove(loaderId);
  //               reject(false);
  //             });
  //         }
  //       }
  //     }]);
  //   });
  // }
}
