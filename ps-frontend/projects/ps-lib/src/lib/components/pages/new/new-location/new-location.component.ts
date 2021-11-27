import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ButtonT } from '../../../../../model/template';
import { Call } from '../../../../../model/call';
import { ActionService } from '../../../../services/action/action.service';
import { ConfigService, PageTypes } from '../../../../services/config/config.service';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { PanelNewMapComponent } from '../../../panel/components/panel-new-map/panel-new-map.component';

import { PageAbstract } from '../../page';
import { ActivatedRoute, Router } from '@angular/router';
import { TransformService } from '../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { ActionTypes } from '../../../../../model/intefaces';

@Component({
  selector: 'lib-new-location',
  templateUrl: './new-location.component.html',
  styleUrls: ['./new-location.component.scss']
})
export class NewLocationComponent extends PageAbstract implements OnInit, OnDestroy {
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
    private config: ConfigService,
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation);
    this.call = new Call();
  }

  public ngOnInit(): void {
    super.ngOnInit();

    this.page = this.config.getPage(PageTypes.newLocation);

    if (this.config.template.pagesOld.newLocation.pageType) {
      this.pageLayoutType = this.config.template.pagesOld.newLocation.pageType;
    }
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();

    this.action.register(ActionTypes.CALL_CLOSE, () => { return super.callClose() });
  }

  public next(): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(this.panelNewMapComponent.validate());
    });
  }
}
