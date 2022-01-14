import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

import { ActionService } from '../../../../../services/action/action.service';
import { ConfigService, PageTypes } from '../../../../../services/config/config.service';
import { MailService } from '../../../../../services/mail/mail.service';
import { NavigationService } from '../../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../../services/storage/storage.service';
import { DropdownFieldComponent } from '../../../../fields/dropdown-field/dropdown-field.component';
import { PageAbstract } from '../../../page';
import { Call } from '../../../../../../model/call';
import { CallList } from '../../../../../../model/call-list';
import { TransformService } from '../../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../../services/authorisation/authorisation.service';
import { EndpointService } from '../../../../../services/endpoint/endpoint.service';
import { Contract } from '../../../../../../model/contract';
import { EnvironmentService } from '../../../../../services/environment/environment.service';
import { Order } from '../../../../../../model/order';

@Component({
  selector: 'lib-order-creation',
  templateUrl: './order-creation.component.html',
  styleUrls: ['./order-creation.component.scss']
})
export class OrderCreationComponent extends PageAbstract implements OnInit, OnDestroy {
  @ViewChild('contractorComponent') public contractorComponent: DropdownFieldComponent;

  public contracts: Contract[];

  public call: Call;
  public getUrlImage: string;
  public headerData: CallList;

  public order: Order;

  public index = 0;

  public _categoryItems: { name: string, value?: string, selected?: boolean, data?: any }[] = [];

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected navigationService: NavigationService,
    protected storage: StorageService,
    protected action: ActionService,
    protected transform: TransformService,
    protected authorisation: AuthorisationService,
    private endpoints: EndpointService,
    private config: ConfigService,
    private environmentService: EnvironmentService,
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation);

    const index = this.storage.getSession('index');
    if (index) {
       this.index = JSON.parse(index) as number;
    }
  }

  public ngOnInit(): void {
    super.ngOnInit();

    this.transform.setVariable('environment', this.environmentService.get());

    this.page = this.config.getPage(PageTypes.orderCreation);

    this.initCall();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public initCall(): void {
    const callData = this.storage.getSession('call');
    let call: Call;
    if (callData) {
      call = JSON.parse(callData) as Call;
    }

    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (!call || call.id !== id) {
      this.endpoints.get('getCallById').then((call: Call) => {
        this.setCall(call);
        this.initOrder();
        this.getContracts();
      });
    } else {
      this.setCall(call);
      this.initOrder();
      this.getContracts();
    }
  }

  public initOrder(): void {
    if (!this.index) {
      this.index = 0;
    }
    if (!this.call.orders) {
      this.call.orders = [];
    }
  
    if (this.index >= this.call.orders.length) {
      this.index = this.call.orders.length;
    }

    if (!this.call.orders[this.index]) {
      const order = new Order();
      this.call.orders.push(order);
    } 

    this.order = this.call.orders[this.index]
    this.storeCall();
  }

  public setCall(call: Call): void {
    this.transform.setVariable('call', call);
    this.call = call;
    this.headerData = this.config.transformCall(call);
    this.storeCall();
  }

  public storeCall(): void {
    this.storage.setSession('call', JSON.stringify(this.call), true);
  }

  public getContracts(): void {
    this.endpoints.get('getContracts').then((contracts: Contract[]) => {
      this.contracts = contracts;
      const contractorItems = [];
      this.contracts.forEach(contract => {
        contractorItems.push({ name: contract.domain.name, value: '' + contract.id, data: contract });
      });
      this.contractorComponent.options = contractorItems;
      this.contractorComponent.select(this.contractorComponent.options.find(option => option.data.domain.id === this.order.contractorDomain.id));
    });
  }

  public onContractorChanged($event): void {
    this.transform.setVariable('contract', $event.data);

    this.endpoints.get('getContractById').then((contract: Contract) => {
      this.order.contractorDomain = contract.domain;
      this.storeCall();

      const categoryItems = [];
      contract.mainCategories.forEach(mainCategory => {
        mainCategory.categories.forEach(category => {
          categoryItems.push({ name: mainCategory.name + ' - ' + category.name, value: category.id, selected: false, data: category });
        });
        
      })
      this._categoryItems = categoryItems;

    });
  }

  public onDescriptionChanged($event): void {
    this.order.description = $event;
    this.storeCall();
  }

  public onCategoryChanged($event): void {
    const categories = [];
    this._categoryItems.forEach(categoryItem => {
      if (categoryItem.selected) {
        categories.push(categoryItem.data);
      }
    });
    this.order.categories = categories;
    this.storeCall();
  }
}
