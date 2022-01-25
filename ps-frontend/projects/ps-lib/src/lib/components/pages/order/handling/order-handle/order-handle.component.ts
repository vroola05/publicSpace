import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActionService } from '../../../../../services/action/action.service';
import { AuthorisationService } from '../../../../../services/authorisation/authorisation.service';
import { ConfigService } from '../../../../../services/config/config.service';
import { NavigationService } from '../../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../../services/storage/storage.service';
import { TransformService } from '../../../../../services/transform/transform.service';
import { EndpointService } from '../../../../../services/endpoint/endpoint.service';
import { PageAbstract } from '../../../page';

import { Call } from '../../../../../../model/call';
import { CallList } from '../../../../../../model/call-list';
import { ButtonT } from '../../../../../../model/template';
import { Order } from '../../../../../../model/order';
import { StatusTypes } from '../../../../../../model/intefaces';
import { TextareaFieldComponent } from '../../../../fields/textarea-field/textarea-field.component';
import { Status } from '../../../../../../model/status';
import { Message } from '../../../../../../model/message';
import { Loader } from '../../../../../services/loader/loader.service';

@Component({
  selector: 'lib-order-handle',
  templateUrl: './order-handle.component.html',
  styleUrls: ['./order-handle.component.scss']
})
export class OrderHandleComponent extends PageAbstract implements OnInit, OnDestroy {
  @ViewChild('explanationField') public explanationField: TextareaFieldComponent;
  private subscription: Subscription[] = [];

  public call: Call;
  public order: Order;
  private sending = false;
  public explanation = '';
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
    private loader: Loader
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation);
  }

  public ngOnInit(): void {
    super.ngOnInit();

    // this.buttonsLeft = this.config.template.order.handle.buttonsLeft;
    // this.buttonsRight = this.config.template.order.handle.buttonsRight;

    //this.action.register('next', () => { this.next(); });
    //this.action.register('save', () => { this.save(); });
    //this.action.register('submit', () => { this.submit(); });

    this.getCall();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

  public getCall(): void {
    this.endpoints.get('getDetailCall').then((call: Call) => {
      this.transform.setVariable('call', call);
      this.call = call;
      if (this.call.orders) {
        this.order = this.call.orders[0];
        this.storage.setSession('order', JSON.stringify(this.order), true);
        this.transform.setVariable('order', this.order);
      }

      this.getUrlImage = this.transform.URL(this.config.getEndpoint('getImage').endpoint);
      this.headerData = this.config.transformCall(call);
    });
  }

  public getDays(date: Date): string {
    const now = new Date().setHours(0, 0, 0, 0);
    const dateStatus = new Date(date).setHours(0, 0, 0, 0);
    const days = Math.abs(Math.round(((now - dateStatus) / 1000) / (60 * 60 * 24)));
    return (days === 0 ? 'Vandaag' : (days === 1 ? days + ' dag' : days + ' dagen'));
  }

  public onExplanationChanged($event): void {
    // this.order.explanation = $event;
    this.explanation = $event;
    this.storage.setSession('order', JSON.stringify(this.order), true);
  }

  public validate(): boolean {
    const c = this.explanationField.validate();
    return c;
  }

  public next(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        resolve(this.validate());
        //this.navigationService.navigate([this.transform.URL('/order/${path.id}/${path.orderId}/orderitem-confirmation')], true);
    });
  }

  public save(): void {
    if (!this.sending && this.validate()) {
      this.send(false);
    }
  }

  public send(isExecuted: boolean): void {
    if (!this.sending) {
      this.sending = true;
      const loaderId = this.loader.add('Bezig met opslaan!');

      this.order.status = new Status();
      this.order.status.id = StatusTypes.ORDER_DONE;

      // this.order.isExecuted = isExecuted;
      this.endpoints.put('putOrder', this.order).then((message: Message) => {
        this.storage.clearProcessData();
        this.navigationService.navigateHome();
        this.loader.remove(loaderId);
      })
      .catch(() => {
        this.loader.remove(loaderId);
        this.sending = false;
      });
    }
  }
}
