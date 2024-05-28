import { Directive, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { forkJoin, Observable } from "rxjs";
import { first } from "rxjs/operators";
import { Call } from "../../../../model/call";
import { Order } from "../../../../model/order";
import { ActionTypeEnum } from "../../../../model/intefaces";
import { ActionService } from "../../../../services/action/action.service";
import { ApiService } from "../../../../services/api/api.service";
import { AuthorisationService } from "../../../../services/authorisation/authorisation.service";
import { ConfigService } from "../../../../services/config/config.service";
import { EndpointService } from "../../../../services/endpoint/endpoint.service";
import { Loader } from "../../../../services/loader/loader.service";
import { NavigationService } from "../../../../services/navigation/navigation.service";
import { StorageService } from "../../../../services/storage/storage.service";
import { ToastService } from "../../../../services/toast/toast.service";
import { TransformService } from "../../../../services/transform/transform.service";
import { PageAbstract } from "../../page";

@Directive()
export abstract class ActionOrderCreate extends PageAbstract implements OnInit, OnDestroy {
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

        this.action.register(ActionTypeEnum.ORDER_CREATE, () => { return super.orderCreate() });
    }

    public override orderCreate(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            console.log('lalalal');
            if (!this.lock) {
                this.lock = true;
                const callData = this.storage.getSession('call');
                if (callData) {
                    this.loaderId = this.loader.add('Bezig met opslaan!');
                    const call = JSON.parse(callData) as Call;
                    if (call.orders) {
                        const orders: Order[] = call.orders.filter(order => order.id === undefined);

                        this.endpoints.post('postOrders', orders).then((orders: Order[]) => {
                            this.loader.remove(this.loaderId);
                            this.lock = false;
                            this.onOrderCreated(orders, resolve, reject);
                        }).catch(() => {
                                this.loader.remove(this.loaderId);
                                this.lock = false;
                                this.toast.error('Er is iets foutgegaan bij het opslaan van de opdracht!');
                                reject(false);
                            });
                    }
                }
            }
        });
    }

    public onOrderCreated(orders: Order[], resolve: (value: boolean) => void, reject: (reason: boolean) => void): void {
        this.storage.clearProcessData();
        this.navigationService.navigateHome();
        this.loader.remove(this.loaderId);
        this.toast.success('De opdrachten zijn opgeslagen.', 15);
        resolve(true);
    }
}