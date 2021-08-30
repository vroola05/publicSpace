import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ButtonT } from '../../../../../model/template';
import { Call } from '../../../../../model/call';
import { ActionService } from '../../../../services/action/action.service';
import { DomainService } from '../../../../services/domain/domain.service';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { PanelNewMapComponent } from '../../../panel/components/panel-new-map/panel-new-map.component';

import { Page } from '../../page';
import { ActivatedRoute, Router } from '@angular/router';
import { TransformService } from '../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';

@Component({
  selector: 'lib-new-location',
  templateUrl: './new-location.component.html',
  styleUrls: ['./new-location.component.scss']
})
export class NewLocationComponent extends Page implements OnInit, OnDestroy {
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
    private domain: DomainService,
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation);
    this.call = new Call();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.buttonsLeft = this.domain.config.pages.newLocation.buttonsLeft;
    this.buttonsRight = this.domain.config.pages.newLocation.buttonsRight;

    if (this.domain.config.pages.newLocation.pageType) {
      this.pageType = this.domain.config.pages.newLocation.pageType;
    }

    this.action.register('next', () => { this.next(); });
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public next(): void {
    if (this.panelNewMapComponent.validate()) {
      this.navigationService.navigate(['new/information'], true);
    }
  }
}
