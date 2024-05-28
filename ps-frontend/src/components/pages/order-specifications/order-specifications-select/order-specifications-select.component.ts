import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DynamicLeftDirective } from '../../../../directives/dynamic-left.directive';
import { DynamicRightDirective } from '../../../../directives/dynamic-right.directive';
import { PageAbstract } from '../../page';

import { Page } from '../../../../model/page';
import { DomainTypeEnum } from '../../../../model/intefaces';
import { Call } from '../../../../model/call';

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

@Component({
  selector: 'app-order-specifications-select',
  templateUrl: './order-specifications-select.component.html',
  styleUrls: ['./order-specifications-select.component.scss']
})
export class OrderSpecificationsSelectComponent extends PageAbstract implements OnInit, OnDestroy {
  @ViewChild(DynamicLeftDirective, {static: false}) private dynamicHostLeft!: DynamicLeftDirective;
  @ViewChild(DynamicRightDirective, {static: false}) private dynamicHostRight!: DynamicRightDirective;

  public override page: Page;
  
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

    this.page = this.config.getPage(PageTypes.orderSpecificationSelect);    
    this.pageConfig = this.page.pageConfig;
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this.getCall();
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();

    
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
