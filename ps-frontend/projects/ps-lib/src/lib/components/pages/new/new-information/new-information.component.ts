import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ButtonT } from '../../../../../model/template';
import { Call } from '../../../../../model/call';

import { ActionService } from '../../../../services/action/action.service';
import { DomainService } from '../../../../services/domain/domain.service';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { PanelNewInformationComponent } from '../../../panel/components/panel-new-information/panel-new-information.component';

import { PageAbstract } from '../../page';
import { ActivatedRoute, Router } from '@angular/router';
import { PanelNewContactComponent } from '../../../panel/components/panel-new-contact/panel-new-contact.component';
import { TransformService } from '../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';

@Component({
  selector: 'lib-new-information',
  templateUrl: './new-information.component.html',
  styleUrls: ['./new-information.component.scss']
})
export class NewInformationComponent extends PageAbstract implements OnInit, OnDestroy {
  @ViewChild('panelNewInformationComponent') panelNewInformationComponent: PanelNewInformationComponent;
  @ViewChild('panelNewContactComponent') panelNewContactComponent: PanelNewContactComponent;

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
    private domain: DomainService,
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation);
    this.call = new Call();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.buttonsLeft = this.domain.config.pagesOld.newInformation.buttonsLeft;
    this.buttonsRight = this.domain.config.pagesOld.newInformation.buttonsRight;
    if (this.domain.config.pagesOld.newInformation.pageType) {
      this.pageLayoutType = this.domain.config.pagesOld.newInformation.pageType;
    }

    this.action.register('next', () => { this.next(); });
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public next(): void {
    const a = this.panelNewInformationComponent.validate();
    const b = this.panelNewContactComponent.validate();
    if (a && b) {
      this.navigationService.navigate(['new/confirmation'], true);
    }
  }
}
