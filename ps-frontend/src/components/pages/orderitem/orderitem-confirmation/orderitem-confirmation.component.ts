import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActionService } from '../../../../services/action/action.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { ConfigService } from '../../../../services/config/config.service';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { EndpointService } from '../../../../services/endpoint/endpoint.service';
import { TransformService } from '../../../../services/transform/transform.service';
import { PageAbstract } from '../../page';
import { Call } from '../../../../model/call';
import { Order } from '../../../../model/order';
import { Message } from '../../../../model/message';
import { Loader } from '../../../../services/loader/loader.service';
import { Status } from '../../../../model/status';
import { StatusTypes } from '../../../../model/intefaces';
import { PageButton } from '../../../../model/page-button';



@Component({
  selector: 'app-orderitem-confirmation',
  templateUrl: './orderitem-confirmation.component.html',
  styleUrls: ['./orderitem-confirmation.component.scss']
})
export class OrderitemConfirmationComponent extends PageAbstract implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];
  public order: Order;
  public getUrlImage: string;
  public buttonsLeft: PageButton[];
  public buttonsRight: PageButton[];
  private sending = false;
  public orderitems: { name: string, value?: string, selected?: boolean, data?: any }[] = [];

  constructor(
    protected override router: Router,
    protected override activatedRoute: ActivatedRoute,
    protected override navigationService: NavigationService,
    protected override storage: StorageService,
    protected override action: ActionService,
    protected override transform: TransformService,
    protected override authorisation: AuthorisationService,
    protected override config: ConfigService,
    private loader: Loader,
    private endpoints: EndpointService
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation, config);

    const order = this.storage.getSession('order');
    if (order) {
      this.order = JSON.parse(order) as Order;
      // if (this.order.miscOrderitems) {
      //   this.order.miscOrderitems.forEach(item => {
      //     if (item.id < 0) {
      //       delete item.id;
      //     }
      //   });
      // }
      this.transform.setVariable('order', this.order);
    }
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    this.getCall();
    // this.buttonsLeft = this.config.template.order.confirmation.buttonsLeft;
    // this.buttonsRight = this.config.template.order.confirmation.buttonsRight;
    // if (this.config.template.order.confirmation.pageType) {
    //   this.pageLayoutType = this.config.template.order.confirmation.pageType;
    // }

    // this.action.register('save', () => { this.save(); });
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

  public getCall(): void {
    this.endpoints.get('getDetailCall').then((call: Call) => {
      this.transform.setVariable('call', call);
      this.call = call;

      this.getUrlImage = this.transform.URL(this.config.getEndpoint('getImage').endpoint);
    });
  }

  public save(): void {
    this.send(false);
  }

  public send(isExecuted: boolean): void {
    if (!this.sending) {
      this.sending = true;
      const loaderId = this.loader.add('Bezig met opslaan!');

      this.order.status = new Status();
      this.order.status.id = StatusTypes.ORDER_DONE;

      //this.order.isExecuted = isExecuted;
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

  public submit(): void {
    this.send(true);
  }
}
