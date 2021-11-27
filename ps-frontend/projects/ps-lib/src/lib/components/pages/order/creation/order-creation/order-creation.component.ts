import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

import { ActionService } from '../../../../../services/action/action.service';
import { ConfigService } from '../../../../../services/config/config.service';
import { MailService } from '../../../../../services/mail/mail.service';
import { NavigationService } from '../../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../../services/storage/storage.service';
import { DropdownFieldComponent } from '../../../../fields/dropdown-field/dropdown-field.component';
import { SelectFieldComponent } from '../../../../fields/select-field/select-field.component';
import { TextareaFieldComponent } from '../../../../fields/textarea-field/textarea-field.component';
import { PageAbstract } from '../../../page';
import { Call } from '../../../../../../model/call';
import { CallList } from '../../../../../../model/call-list';
import { Ordertype } from '../../../../../../model/order-type';
import { Order } from '../../../../../../model/order';
import { Contractor } from '../../../../../../model/contractor';
import { ButtonT, ContractortypesT } from '../../../../../../model/template';
import { ContractorType } from '../../../../../../model/intefaces';
import { TransformService } from '../../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../../services/authorisation/authorisation.service';
import { EndpointService } from '../../../../../services/endpoint/endpoint.service';

@Component({
  selector: 'lib-order-creation',
  templateUrl: './order-creation.component.html',
  styleUrls: ['./order-creation.component.scss']
})
export class OrderCreationComponent extends PageAbstract implements OnInit, OnDestroy {
  @ViewChild('actions') public actions: DropdownFieldComponent;
  @ViewChild('options') public options: DropdownFieldComponent;
  @ViewChild('ordertypesField') public ordertypesField: SelectFieldComponent;
  @ViewChild('descriptionField') public descriptionField: TextareaFieldComponent;

  private phase: BehaviorSubject<string> = new BehaviorSubject<string>('init');

  public actionItems: { name: string, value?: string, data?: any }[] = [];
  public optionItems: { name: string, value?: string, data?: any }[] = [];

  private subscription: Subscription[] = [];
  private phaseSubscription: Subscription;
  private ordertypeSubscription: Subscription;
  public call: Call;
  public getUrlImage: string;
  public headerData: CallList;
  public buttonsLeft: ButtonT[];
  public buttonsRight: ButtonT[];
  public contractortypes: ContractortypesT[];
  public contractors: Contractor[] = [];
  public orders: Order[] = [];
  public ordertypes: { name: string, value?: string, selected?: boolean, data?: any }[] = [];
  public index = 0;
  public contractortype: ContractorType;

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
    private mailService: MailService
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation);

    const index = this.storage.getSession('index');
    if (index) {
      this.index = JSON.parse(index) as number;
    }

    const order = this.storage.getSession('order');
    if (order) {
      this.orders = JSON.parse(order) as Order[];
    }
    if (!this.orders[this.index]) {
      this.orders.push(new Order());
      this.orders[this.index].description = '';
    }
  }

  public ngOnInit(): void {
    super.ngOnInit();

    let ordertypes;
    if (this.orders[this.index].ordertypes) {
      ordertypes = this.orders[this.index].ordertypes;
    }

    this.phaseSubscription = this.phase.subscribe(phase => {
      switch (phase) {
        case 'call-loaded':
          this.getContractors();
          break;
        case 'contractors-loaded':
          this.initialSelectAction();
          break;
        case 'contractor-selected':
          this.initialSelectOption();
          break;
        case 'loading-finished':
          this.initialOrdertypes(ordertypes);
          this.phaseSubscription.unsubscribe();
          break;
      }
    });

    this.getCall();

    this.contractortypes = this.config.template.order.creation.contractortypes;
    this.buttonsLeft = this.config.template.order.creation.buttonsLeft;
    this.buttonsRight = this.config.template.order.creation.buttonsRight;
    if (this.config.template.order.creation.pageType) {
      this.pageLayoutType = this.config.template.order.creation.pageType;
    }

    //this.action.register('next', () => { this.next(); });
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.mailService.clear();
    this.subscription.forEach(subscription => subscription.unsubscribe());

    if (this.ordertypeSubscription) {
      this.ordertypeSubscription.unsubscribe();
    }
    if (this.phaseSubscription) {
      this.phaseSubscription.unsubscribe();
    }
  }

  private initialSelectAction() {
    if (this.orders && this.orders[this.index] && this.orders[this.index].contractor) {
      setTimeout(() => {
        if (this.actions) {
          this.actions.select(this.actionItems.find(action => {
            return (this.orders[this.index].contractor.contractorGroup
              && action.value === this.orders[this.index].contractor.contractorGroup)
              || action.value === '' + this.orders[this.index].contractor.id;
          }));
        }
      });
    }
  }

  private initialSelectOption(): void {
    if (this.orders && this.orders[this.index] && this.orders[this.index].contractor) {
      setTimeout(() => {
        if (this.options) {
          this.options.select(this.optionItems.find(action => action.value === '' + this.orders[this.index].contractor.id));
        }
      });
    }
  }

  private initialOrdertypes(ordertypes: Ordertype[]): void {
    if (ordertypes && ordertypes.length > 0) {
      this.ordertypes.forEach(ordertype => {
        if (ordertypes.find(o => o.id === ordertype.data.id)) {
          ordertype.selected = true;
        }
      });
      this.orders[this.index].ordertypes = ordertypes;
      this.storage.setSession('order', JSON.stringify(this.orders), true);
    }
  }

  public getCall(): void {
    this.endpoints.get('getDetailCall').then((call: Call) => {
      this.phase.next('call-loaded');
      this.transform.setVariable('call', call);
      this.call = call;
      this.getUrlImage = this.transform.URL(this.config.getEndpoint('getImage').endpoint);
      this.headerData = this.config.transformCall(call);
    });
  }

  public getContractors(): void {
    this.endpoints.get('getOrderCreationContractors').then((contractors: Contractor[]) => {
        this.contractors = contractors;

        this.actionItems = [];
        const map = [];
        contractors.forEach(contractor => {
          if (!contractor.contractorGroup) {
            this.actionItems.push({ name: contractor.name, value: '' + contractor.id, data: contractor });
          } else if (contractor.contractorGroup && !map[contractor.contractorGroup]) {
            map[contractor.contractorGroup] = true;
            this.actionItems.push({ name: contractor.contractorGroup, value: contractor.contractorGroup });
          }
        });

        this.phase.next('contractors-loaded');
      });
  }

  public hasActionItems(): boolean {
    return this.actionItems && this.actionItems.length > 0;
  }

  public hasOptionItems(): boolean {
    return this.optionItems && this.optionItems.length > 0;
  }

  public onActionChanged($event): void {
    this.optionItems = [];
    this.ordertypes = [];
    if ($event && $event.data) {
      this.setContractor($event.data);
    } else {
      this.contractors.forEach(contractor => {
        if (contractor.contractorGroup === $event.value) {
          this.optionItems.push({ name: contractor.name, value: '' + contractor.id, data: contractor });
        }
      });
      setTimeout(() => {
        this.options.select(null);
      });
    }
    this.phase.next('contractor-selected');
  }

  public onOptionChanged($event): void {
    this.setContractor($event.data);
  }

  public setContractor(contractor: Contractor) {
    this.orders[this.index].contractor = contractor;
    this.orders[this.index].ordertypes = [];
    this.storage.setSession('order', JSON.stringify(this.orders), true);

    const contractortype = this.contractortypes.find(t => t.value === contractor.type);

    if (contractortype) {
      this.contractortype = contractortype.type as ContractorType;
      if (this.contractortype === ContractorType.contract) {
        this.mailService.clear();
        this.getOrdertypes(contractor);
      } else if (this.contractortype === ContractorType.noContract || this.contractortype === ContractorType.noJurisdiction) {
        this.getMailTemplate(contractortype.endpoint);
        this.phase.next('loading-finished');
      } else {
        this.phase.next('loading-finished');
      }
    }
  }

  public getMailTemplate(endpoint: string) {
    this.mailService.setDescriptor('({DESCRIPTION})');
    this.mailService.setText(this.orders[this.index].description);

    const order = { ...this.orders[this.index] };
    order.description = '({DESCRIPTION})';
    this.mailService.reveiveMailTemplate(this.transform.URL(endpoint), order, 'post');
  }

  public getOrdertypes(contractor: Contractor): void {
    if (this.ordertypeSubscription) {
      this.ordertypeSubscription.unsubscribe();
    }

    this.endpoints.get('getOrderCreationOrderTypesContractor').then((ordertypes: Ordertype[]) => {
      if (ordertypes) {
        ordertypes.forEach(ordertype => {
          this.ordertypes.push({ name: ordertype.name, value: '' + ordertype.id, data: ordertype });
        });
      }
      this.phase.next('loading-finished');
    });
  }

  public onDescriptionChanged($event): void {
    this.orders[this.index].description = $event;
    this.storage.setSession('order', JSON.stringify(this.orders), true);
  }

  public onTyping($event): void {
    if ($event.target && (this.contractortype === ContractorType.noContract || this.contractortype === ContractorType.noJurisdiction)) {
      this.mailService.setText($event.target.value);
    }
  }

  public getSelectedOrdertypes(): Ordertype[] {
    const ordertypes: Ordertype[] = [];
    this.ordertypes.forEach(ordertype => {
      if (ordertype.selected) {
        ordertypes.push(ordertype.data);
      }
    });
    return ordertypes;
  }

  public onOrdertypesChanged($event): void {
    this.orders[this.index].ordertypes = this.getSelectedOrdertypes();
    this.storage.setSession('order', JSON.stringify(this.orders), true);
  }

  public next(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        //this.navigationService.navigate([`/details/${this.call.id}/order/confirmation`], true);
      resolve(this.actions.validate() && (!this.options || this.options.validate()) && this.descriptionField.validate());
    });
  }
}
