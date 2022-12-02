import { Directive, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Status } from "../../../../model/status";
import { forkJoin, Observable } from "rxjs";
import { first } from "rxjs/operators";
import { ActionTypeEnum } from "../../../../model/intefaces";
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
import { Order } from "../../../../model/order";

@Directive()
export abstract class ActionOrderSpecification extends PageAbstract implements OnInit, OnDestroy {
  protected lock = false;
  protected loaderId: number;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected navigationService: NavigationService,
    protected storage: StorageService,
    protected action: ActionService,
    protected transform: TransformService,
    protected authorisation: AuthorisationService,
    protected apiService: ApiService,
    protected endpoints: EndpointService,
    protected config: ConfigService,
    protected loader: Loader,
    protected toast: ToastService
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation, config);
  }


  public ngOnInit(): void {
    super.ngOnInit();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();

    this.action.register(ActionTypeEnum.ORDER_DONE, () => { return super.orderDone() });
  }

  public orderDone(): Promise<boolean> {



    return new Promise<boolean>((resolve, reject) => {
      const action = this.config.getAction(ActionTypeEnum.CALL_CREATE);
      if (!this.lock) {
        this.lock = true;
        const orderData = this.storage.getSession('order');
        if (orderData) {
          this.loaderId = this.loader.add('Bezig met opslaan!');
          const order = JSON.parse(orderData) as Order;

          this.endpoints.put('putActionOrderDone', order).then((newOrder: Order) => {
            
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