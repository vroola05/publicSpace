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

import { Call } from '../../../../../model/call';
import { Order } from '../../../../../model/order';
import { StatusTypes } from '../../../../../model/intefaces';
import { TextareaFieldComponent } from '../../../../fields/textarea-field/textarea-field.component';
import { Status } from '../../../../../model/status';
import { Message } from '../../../../../model/message';
import { Loader } from '../../../../../services/loader/loader.service';
import { PageButton } from '../../../../../model/page-button';

@Component({
  selector: 'app-order-handle-no-login',
  templateUrl: './order-handle-no-login.component.html',
  styleUrls: ['./order-handle-no-login.component.scss']
})
export class OrderHandleNoLoginComponent extends PageAbstract implements OnInit, OnDestroy {
  @ViewChild('explanationField') public explanationField: TextareaFieldComponent;
  private subscription: Subscription[] = [];

  public order: Order;
  private sending = false;
  public explanation = '';
  public getUrlImage: string;
  public buttonsLeft: PageButton[];
  public buttonsRight: PageButton[];
  public state = 0;

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
    private loader: Loader
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation, config);
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    // this.buttonsLeft = this.config.template.order.handleNoLogin.buttonsLeft;
    // this.buttonsRight = this.config.template.order.handleNoLogin.buttonsRight;

    //this.action.register('reject', () => { this.reject(); });
    //this.action.register('accept', () => { this.accept(); });
    this.getCall();
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

  public noLogin(): boolean {
    if (
      this.activatedRoute.snapshot
      && this.activatedRoute.snapshot.data
      && this.activatedRoute.snapshot.data['noLogin']) {
      return true;
    }
    return false;
  }

  public getCall(): void {
    this.endpoints.get('getNoLoginDetailCall').then((call: Call) => {
      this.transform.setVariable('call', call);
      this.call = call;
      if (this.call.orders) {
        this.order = this.call.orders[0];
        this.transform.setVariable('order', this.order);
      }

      if (this.noLogin()) {
        this.getUrlImage = this.transform.URL(this.config.getEndpoint('getNoLoginImage').endpoint);
      } else  {
        this.getUrlImage = this.transform.URL(this.config.getEndpoint('getImage').endpoint);
      }
    })
    .catch((error) => {
      if (error.status && error.status === 406 ) {
        this.state = 2;
      }
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

  public setOrderStatus(status: number): void {
    if (!this.order.status) {
      this.order.status = new Status();
    }
    this.order.status.id = status;
    this.transform.setVariable('order', this.order);
  }

  public submit(): void {
    if (!this.sending && this.explanationField.validate()) {
      this.sending = true;
      const loaderId = this.loader.add('Bezig met opslaan!');

      this.endpoints.put('putNoLoginOrder', this.explanation).then((message: Message) => {
        this.storage.clearProcessData();
        this.transform.clearVariable();
        this.loader.remove(loaderId);
        this.state = 1;
      })
      .catch(() => {
        this.loader.remove(loaderId);
        this.sending = false;
      });
    }
  }

  public reject(): void {
    this.setOrderStatus(StatusTypes.ORDER_REJECTED);
    this.submit();
  }

  public accept(): void {
    this.setOrderStatus(StatusTypes.ORDER_DONE);
    this.submit();
  }
}
