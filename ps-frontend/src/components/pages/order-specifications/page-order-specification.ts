import { Directive, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ActionTypeEnum } from "../../../model/intefaces";
import { ActionService } from "../../../services/action/action.service";
import { ApiService } from "../../../services/api/api.service";
import { AuthorisationService } from "../../../services/authorisation/authorisation.service";
import { ConfigService } from "../../../services/config/config.service";
import { EndpointService } from "../../../services/endpoint/endpoint.service";
import { Loader } from "../../../services/loader/loader.service";
import { NavigationService } from "../../../services/navigation/navigation.service";
import { StorageService } from "../../../services/storage/storage.service";
import { ToastService } from "../../../services/toast/toast.service";
import { TransformService } from "../../../services/transform/transform.service";
import { PageAbstract } from "../page";
import { Order } from "../../../model/order";

@Directive()
export abstract class ActionOrderSpecification extends PageAbstract implements OnInit, OnDestroy {
  protected lock = false;
  protected loaderId: number;

  constructor(
    protected override router: Router,
    protected override activatedRoute: ActivatedRoute,
    protected override navigationService: NavigationService,
    protected override storage: StorageService,
    protected override action: ActionService,
    protected override transform: TransformService,
    protected override authorisation: AuthorisationService,
    protected apiService: ApiService,
    protected endpoints: EndpointService,
    protected override config: ConfigService,
    protected loader: Loader,
    protected toast: ToastService
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation, config);
  }


  public override ngOnInit(): void {
    super.ngOnInit();
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();

    this.action.register(ActionTypeEnum.ORDER_SAVE_TEMP, () => { return super.orderSaveTemporary() });
    this.action.register(ActionTypeEnum.ORDER_DONE, () => { return super.orderDone() });
  }

  public override orderSaveTemporary(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const action = this.config.getAction(ActionTypeEnum.CALL_CREATE);
      if (!this.lock) {
        this.lock = true;
        const orderData = this.storage.getSession('order');
        if (orderData) {
          this.loaderId = this.loader.add('Bezig met opslaan!');
          const order = JSON.parse(orderData) as Order;

          this.endpoints.put('putActionOrderSaveTemporary', order).then((newOrder: Order) => {
            
              this.loader.remove(this.loaderId);
              this.lock = false;
              resolve(true);
          })
            .catch(() => {
              this.loader.remove(this.loaderId);
              this.lock = false;
              this.toast.error('Er is iets foutgegaan bij het opslaan van de opdracht!');
              reject(false);
            });
        }
      }
    });
  }

  public override orderDone(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const action = this.config.getAction(ActionTypeEnum.CALL_CREATE);
      if (!this.lock) {
        this.lock = true;
        const orderData = this.storage.getSession('order');
        if (orderData) {
          this.loaderId = this.loader.add('Bezig met opslaan!');
          const order = JSON.parse(orderData) as Order;

          this.endpoints.put('putActionOrderDone', order).then((newOrder: Order) => {
            this.loader.remove(this.loaderId);
            this.lock = false;
            resolve(true);
          })
            .catch(() => {
              this.loader.remove(this.loaderId);
              this.lock = false;
              this.toast.error('Er is iets foutgegaan bij het opslaan van de opdracht!');
              reject(false);
            });
        }
      }
    });
  }
}