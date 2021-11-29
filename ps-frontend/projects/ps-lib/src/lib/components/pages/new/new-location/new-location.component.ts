import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PanelNewMapComponent } from '../../../panel/components/panel-new-map/panel-new-map.component';

import { ActivatedRoute, Router } from '@angular/router';

import { ButtonT } from '../../../../../model/template';
import { Call } from '../../../../../model/call';
import { ActionTypeEnum } from '../../../../../model/intefaces';

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

@Component({
  selector: 'lib-new-location',
  templateUrl: './new-location.component.html',
  styleUrls: ['./new-location.component.scss']
})
export class NewLocationComponent extends ActionCallCreate implements OnInit, OnDestroy {
  @ViewChild('panelNewMapComponent') panelNewMapComponent: PanelNewMapComponent;

  public call: Call;
  public buttonsLeft: ButtonT[];
  public buttonsRight: ButtonT[];

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
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation, apiService, endpoints, config, loader, toast);
    this.call = new Call();
  }

  public ngOnInit(): void {
    super.ngOnInit();

    this.page = this.config.getPage(PageTypes.newLocation);
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();

    this.action.register(ActionTypeEnum.NEXT, () => { return super.next() });
  }

  public next(): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(this.panelNewMapComponent.validate());
    });
  }
}
