import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActionService } from '../../../../services/action/action.service';
import { ApiService } from '../../../../services/api/api.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { DomainService } from '../../../../services/domain/domain.service';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { TransformService } from '../../../../services/transform/transform.service';
import { PageAbstract } from '../../page';
import { Call } from '../../../../../model/call';
import { CallList } from '../../../../../model/call-list';
import { Order } from '../../../../../model/order';
import { Message } from '../../../../../model/message';
import { ButtonT } from '../../../../../model/template';
import { Loader } from '../../../../services/loader/loader.service';
import { Status } from '../../../../../model/status';
import { StatusTypes } from '../../../../../model/intefaces';



@Component({
  selector: 'lib-orderitem-confirmation',
  templateUrl: './orderitem-confirmation.component.html',
  styleUrls: ['./orderitem-confirmation.component.scss']
})
export class OrderitemConfirmationComponent extends PageAbstract implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];
  public call: Call;
  public order: Order;
  public getUrlImages: string;
  public getUrlImage: string;
  public postUrlImage: string;
  public postUrlNote: string;
  public headerData: CallList;
  public buttonsLeft: ButtonT[];
  public buttonsRight: ButtonT[];
  private sending = false;
  public orderitems: { name: string, value?: string, selected?: boolean, data?: any }[] = [];

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
    private loader: Loader
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation);

    const order = this.storage.getSession('order');
    if (order) {
      this.order = JSON.parse(order) as Order;
      if (this.order.miscOrderitems) {
        this.order.miscOrderitems.forEach(item => {
          if (item.id < 0) {
            delete item.id;
          }
        });
      }
      this.transform.setVariable('order', this.order);
    }
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.getCall();
    this.buttonsLeft = this.domain.config.order.confirmation.buttonsLeft;
    this.buttonsRight = this.domain.config.order.confirmation.buttonsRight;
    if (this.domain.config.order.confirmation.pageType) {
      this.pageLayoutType = this.domain.config.order.confirmation.pageType;
    }

    this.action.register('save', () => { this.save(); });
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
      this.headerData = this.domain.transformCallOrder(call);

    }));
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

      this.order.isExecuted = isExecuted;
      this.subscription.push(
        this.apiService.put(this.transform.URL(this.domain.getEndpoint('putOrder').endpoint), this.order).subscribe((message: Message) => {
          this.storage.clearProcessData();
          this.navigationService.navigateHome();
          this.loader.remove(loaderId);
        },
        () => {
          this.loader.remove(loaderId);
          this.sending = false;
        }));
    }
  }

  public submit(): void {
    this.send(true);
  }
}
