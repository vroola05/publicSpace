import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Call } from '../../../../model/call';

import { ActionService } from '../../../../services/action/action.service';
import { ConfigService } from '../../../../services/config/config.service';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../services/storage/storage.service';

import { PageAbstract } from '../../page';
import { ActivatedRoute, Router } from '@angular/router';
import { PanelNewInformationComponent } from '../../../panel/components/panel-new-information/panel-new-information.component';
import { TransformService } from '../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { PageButton } from '../../../../model/page-button';

@Component({
  selector: 'app-change-information',
  templateUrl: './change-information.component.html',
  styleUrls: ['./change-information.component.scss']
})
export class ChangeInformationComponent extends PageAbstract implements OnInit, OnDestroy {
  @ViewChild('panelNewInformationComponent') panelNewInformationComponent: PanelNewInformationComponent;

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
    protected override config: ConfigService,
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation, config);
    this.call = new Call();
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    // this.buttonsLeft = this.config.template.change.information.buttonsLeft;
    // this.buttonsRight = this.config.template.change.information.buttonsRight;
    // if (this.config.template.change.information.pageType) {
    //   this.pageLayoutType = this.config.template.change.information.pageType;
    // }

    //this.action.register('next', () => { this.next(); });
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public override next(): Promise<boolean> {
    return new Promise((resolve) => {
        //this.navigationService.back();
        resolve(this.panelNewInformationComponent.validate());
    });
  }
}
