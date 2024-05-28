import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Call } from '../../../../model/call';
import { ActionTypeEnum } from '../../../../model/intefaces';

import { ActionService } from '../../../../services/action/action.service';
import { ConfigService, PageTypes } from '../../../../services/config/config.service';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { ApiService } from '../../../../services/api/api.service';
import { Loader } from '../../../../services/loader/loader.service';


import { ToastService } from '../../../../services/toast/toast.service';
import { TransformService } from '../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { EndpointService } from '../../../../services/endpoint/endpoint.service';
import { ActionCallCreate } from '../page-call-create';
import { ValidationService } from '../../../../services/validation/validation.service';
import { PageButton } from '../../../../model/page-button';

@Component({
  selector: 'app-new-information',
  templateUrl: './new-information.component.html',
  styleUrls: ['./new-information.component.scss']
})
export class NewInformationComponent extends ActionCallCreate implements OnInit, OnDestroy {
  public buttonsLeft: PageButton[];
  public buttonsRight: PageButton[];

  constructor(
    protected override router: Router,
    protected override activatedRoute: ActivatedRoute,
    protected override navigationService: NavigationService,
    protected override storage: StorageService,
    protected override action: ActionService,
    protected override transform: TransformService,
    protected override authorisation: AuthorisationService,
    protected override apiService: ApiService,
    protected override endpoints: EndpointService,
    protected override config: ConfigService,
    protected override loader: Loader,
    protected override toast: ToastService,
    private validation: ValidationService
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation, apiService, endpoints, config, loader, toast);
    this.call = new Call();
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this.page = this.config.getPage(PageTypes.newInformation);
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();

    this.action.register(ActionTypeEnum.NEXT, () => { return super.next() });
  }

  public override next(): Promise<boolean> {
    return new Promise((resolve) => {
      this.validation.clear();
      resolve(this.validation.validate('new-call-information'));
    });
  }
}
