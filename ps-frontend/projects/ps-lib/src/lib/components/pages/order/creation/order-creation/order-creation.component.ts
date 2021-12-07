import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

import { ActionService } from '../../../../../services/action/action.service';
import { ConfigService, PageTypes } from '../../../../../services/config/config.service';
import { MailService } from '../../../../../services/mail/mail.service';
import { NavigationService } from '../../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../../services/storage/storage.service';
import { DropdownFieldComponent } from '../../../../fields/dropdown-field/dropdown-field.component';
import { SelectFieldComponent } from '../../../../fields/select-field/select-field.component';
import { TextareaFieldComponent } from '../../../../fields/textarea-field/textarea-field.component';
import { PageAbstract } from '../../../page';
import { Call } from '../../../../../../model/call';
import { CallList } from '../../../../../../model/call-list';
import { TransformService } from '../../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../../services/authorisation/authorisation.service';
import { EndpointService } from '../../../../../services/endpoint/endpoint.service';
import { Contract } from '../../../../../../model/contract';
import { EnvironmentService } from '../../../../../services/environment/environment.service';

@Component({
  selector: 'lib-order-creation',
  templateUrl: './order-creation.component.html',
  styleUrls: ['./order-creation.component.scss']
})
export class OrderCreationComponent extends PageAbstract implements OnInit, OnDestroy {
  @ViewChild('contractorComponent') public contractors: DropdownFieldComponent;
    // @ViewChild('ordertypesFieldComponent') public ordertypesFieldComponent: SelectFieldComponent;
  // @ViewChild('descriptionFieldComponent') public descriptionFieldComponent: TextareaFieldComponent;

  public contractorItems: { name: string, value?: string, data?: any }[] = [];
  

  public contracts: Contract[];

  public call: Call;
  public getUrlImage: string;
  public headerData: CallList;
  
  // public ordertypes: { name: string, value?: string, selected?: boolean, data?: any }[] = [];
  public index = 0;

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

    this.getCall();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public getCall(): void {
    this.endpoints.get('getCallById').then((call: Call) => {
      this.transform.setVariable('call', call);
      this.call = call;
      this.headerData = this.config.transformCall(call);
      this.getContracts();
    });
  }

  public getContracts(): void {
    this.endpoints.get('getContracts').then((contracts: Contract[]) => {
      this.contracts = contracts;
      const contractorItems = [];
      this.contracts.forEach(contract => {
        contractorItems.push({ name: contract.domain.domain, value: '' + contract.id, data: contract });

      });
      this.contractorItems = contractorItems;
    });
  }

  public onContractorChanged($event): void {

  }
 

  
}
