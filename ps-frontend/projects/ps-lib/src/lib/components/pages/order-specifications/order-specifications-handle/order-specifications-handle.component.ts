import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DynamicLeftDirective } from '../../../../directives/dynamic-left.directive';
import { DynamicRightDirective } from '../../../../directives/dynamic-right.directive';
import { PageAbstract } from '../../page';

import { Page } from '../../../../../model/page';
import { ActionTypeEnum, DomainTypeEnum } from '../../../../../model/intefaces';
import { Call } from '../../../../../model/call';

import { NavigationService } from '../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { ActionService } from '../../../../services/action/action.service';
import { TransformService } from '../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { ConfigService, PageTypes } from '../../../../services/config/config.service';
import { EndpointService } from '../../../../services/endpoint/endpoint.service';
import { Loader } from '../../../../services/loader/loader.service';
import { Popup } from '../../../../services/popup/popup.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { ValidationService } from '../../../../services/validation/validation.service';
import { ActionOrderSpecification } from '../page-order-specification';
import { ApiService } from '../../../../services/api/api.service';

@Component({
  selector: 'lib-order-specifications-handle',
  templateUrl: './order-specifications-handle.component.html',
  styleUrls: ['./order-specifications-handle.component.scss']
})
export class OrderSpecificationsHandleComponent extends ActionOrderSpecification implements OnInit, OnDestroy {
  @ViewChild(DynamicLeftDirective, {static: false}) private dynamicHostLeft!: DynamicLeftDirective;
  @ViewChild(DynamicRightDirective, {static: false}) private dynamicHostRight!: DynamicRightDirective;

  public page: Page;
  
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
    protected popup: Popup,
    protected toast: ToastService,
    private validation: ValidationService
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation, apiService, endpoints, config, loader, toast);

    this.page = this.config.getPage(PageTypes.orderSpecificationHandle);    
    this.pageConfig = this.page.pageConfig;
  }

  public ngOnInit(): void {
    super.ngOnInit();

    this.getCall();
  }

  
  public ngOnDestroy(): void {
    super.ngOnDestroy();

    this.action.register(ActionTypeEnum.NEXT, () => { return super.next() });
  }

  public next(): Promise<boolean> {
    return new Promise((resolve) => {
      this.validation.clear();
      resolve(this.validation.validate('handle-order'));
    });
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
}
