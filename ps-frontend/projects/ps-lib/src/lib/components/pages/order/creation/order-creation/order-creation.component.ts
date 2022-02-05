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
import { TransformService } from '../../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../../services/authorisation/authorisation.service';
import { EndpointService } from '../../../../../services/endpoint/endpoint.service';
import { Contract } from '../../../../../../model/contract';
import { EnvironmentService } from '../../../../../services/environment/environment.service';
import { Order } from '../../../../../../model/order';
import { ValidationService } from '../../../../../services/validation/validation.service';

@Component({
  selector: 'lib-order-creation',
  templateUrl: './order-creation.component.html',
  styleUrls: ['./order-creation.component.scss']
})
export class OrderCreationComponent extends PageAbstract implements OnInit, OnDestroy {
  @ViewChild('contractorComponent') public contractorComponent: DropdownFieldComponent;

  public contracts: Contract[];
  public initialized = false;
  public getUrlImage: string;

  public order: Order;

  public index: number;

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
    protected config: ConfigService,
    private environmentService: EnvironmentService,
    private validation: ValidationService
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation, config);
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
        this.getOrderContracts();
      });
    } else {
      this.setCall(call);
      this.initOrder();
      this.getOrderContracts();
    }
  }


  public initIndex(): void {
    const index = this.storage.getSession('index');
    if (index) {
       this.index = JSON.parse(index) as number;
    }

    if (this.index === undefined || this.index >= this.call.orders.length) {

      this.index = this.call.orders.length;
    }

    this.storage.setSession('index', JSON.stringify(this.index), true);
  }

  public initOrder(): void {
    if (!this.call.orders) {
      this.call.orders = [];
    }

    this.initIndex();

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
    this.storeCall();
  }

  public storeCall(): void {
    this.storage.setSession('call', JSON.stringify(this.call), true);
  }

  public getOrderContracts(): void {
    this.endpoints.get('getOrderContracts').then((contracts: Contract[]) => {
      this.contracts = contracts;
      const contractorItems = [];
      this.contracts.forEach(contract => {
        contractorItems.push({ name: contract.domain.name, value: '' + contract.id, data: contract });
      });
      this.contractorComponent.options = contractorItems;

      if (this.order && this.order.contractorDomain) {
        this.contractorComponent.select(this.contractorComponent.options.find(option => option.data.domain.id === this.order.contractorDomain.id));
      } else {
        this.initialized = true;
      }
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
          categoryItems.push({ name: mainCategory.name + ' - ' + category.name, value: category.id, selected: this.isCategorySelected(category.id), data: category });
        });
        
      })
      this._categoryItems = categoryItems;

    });
  }

  public isCategorySelected(id: number): boolean {
    return this.order.categories && this.order.categories.find(c => { return c.id === id}) !== undefined;
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

  public next(): Promise<boolean> {
    return new Promise((resolve) => {
      this.validation.clear();
      if (this.validation.validate('order')) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }
}
