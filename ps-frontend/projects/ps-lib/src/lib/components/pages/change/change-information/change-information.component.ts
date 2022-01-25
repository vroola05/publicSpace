import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ButtonT } from '../../../../../model/template';
import { Call } from '../../../../../model/call';

import { ActionService } from '../../../../services/action/action.service';
import { ConfigService } from '../../../../services/config/config.service';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../services/storage/storage.service';

import { PageAbstract } from '../../page';
import { ActivatedRoute, Router } from '@angular/router';
import { PanelNewInformationComponent } from '../../../panel/components/panel-new-information/panel-new-information.component';
import { TransformService } from '../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';

@Component({
  selector: 'lib-change-information',
  templateUrl: './change-information.component.html',
  styleUrls: ['./change-information.component.scss']
})
export class ChangeInformationComponent extends PageAbstract implements OnInit, OnDestroy {
  @ViewChild('panelNewInformationComponent') panelNewInformationComponent: PanelNewInformationComponent;

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
    // this.buttonsLeft = this.config.template.change.information.buttonsLeft;
    // this.buttonsRight = this.config.template.change.information.buttonsRight;
    // if (this.config.template.change.information.pageType) {
    //   this.pageLayoutType = this.config.template.change.information.pageType;
    // }

    //this.action.register('next', () => { this.next(); });
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public next(): Promise<boolean> {
    return new Promise((resolve) => {
        //this.navigationService.back();
        resolve(this.panelNewInformationComponent.validate());
    });
  }
}
