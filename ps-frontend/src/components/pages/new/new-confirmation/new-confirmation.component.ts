import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Call } from '../../../../model/call';

import { ActionService } from '../../../../services/action/action.service';
import { ConfigService, PageTypes } from '../../../../services/config/config.service';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { ApiService } from '../../../../services/api/api.service';
import { PanelNewConfirmationComponent } from '../../../panel/components/panel-new-confirmation/panel-new-confirmation.component';
import { Loader } from '../../../../services/loader/loader.service';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../services/toast/toast.service';
import { TransformService } from '../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { EndpointService } from '../../../../services/endpoint/endpoint.service';
import { ActionCallCreate } from '../page-call-create';

@Component({
  selector: 'app-new-confirmation',
  templateUrl: './new-confirmation.component.html',
  styleUrls: ['./new-confirmation.component.scss']
})
export class NewConfirmationComponent extends ActionCallCreate implements OnInit, OnDestroy {
  @ViewChild('panelNewConfirmationComponent') panelNewConfirmationComponent: PanelNewConfirmationComponent;

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
    protected override toast: ToastService
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation, apiService, endpoints, config, loader, toast);
    this.call = new Call();
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this.page = this.config.getPage(PageTypes.newConfirm);
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
    
  }
}
