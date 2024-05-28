import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Call } from '../../../../model/call';
import { ActionService } from '../../../../services/action/action.service';
import { ConfigService } from '../../../../services/config/config.service';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { PanelNewMapComponent } from '../../../panel/components/panel-new-map/panel-new-map.component';

import { PageAbstract } from '../../page';
import { ActivatedRoute, Router } from '@angular/router';
import { TransformService } from '../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { PageButton } from '../../../../model/page-button';

@Component({
  selector: 'app-change-location',
  templateUrl: './change-location.component.html',
  styleUrls: ['./change-location.component.scss']
})
export class ChangeLocationComponent extends PageAbstract implements OnInit, OnDestroy {
  @ViewChild('panelNewMapComponent') panelNewMapComponent: PanelNewMapComponent;

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
    // this.buttonsLeft = this.config.template.change.location.buttonsLeft;
    // this.buttonsRight = this.config.template.change.location.buttonsRight;

    // if (this.config.template.change.location.pageType) {
    //   this.pageLayoutType = this.config.template.change.location.pageType;
    // }

    //this.action.register('next', () => { this.next(); });
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public override cancel(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const call = this.storage.getSession('call');
      if (call) {
        const callChanged = JSON.parse(call) as Call;
        if (callChanged.location) {
          delete callChanged.location;
          this.storage.setSession('call', JSON.stringify(callChanged), true);
          
        }
      }
      resolve(true);
    });
  }

  public override next(): Promise<boolean> {
    return new Promise((resolve) => {
        //this.navigationService.back();
        resolve(this.panelNewMapComponent.validate());
    });
  }
}
