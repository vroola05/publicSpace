import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ButtonT } from '../../../../../model/template';
import { Call } from '../../../../../model/call';
import { ActionService } from '../../../../services/action/action.service';
import { ConfigService } from '../../../../services/config/config.service';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { PanelNewMapComponent } from '../../../panel/components/panel-new-map/panel-new-map.component';

import { PageAbstract } from '../../page';
import { ActivatedRoute, Router } from '@angular/router';
import { TransformService } from '../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';

@Component({
  selector: 'lib-change-location',
  templateUrl: './change-location.component.html',
  styleUrls: ['./change-location.component.scss']
})
export class ChangeLocationComponent extends PageAbstract implements OnInit, OnDestroy {
  @ViewChild('panelNewMapComponent') panelNewMapComponent: PanelNewMapComponent;

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
    protected config: ConfigService,
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation, config);
    this.call = new Call();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    // this.buttonsLeft = this.config.template.change.location.buttonsLeft;
    // this.buttonsRight = this.config.template.change.location.buttonsRight;

    // if (this.config.template.change.location.pageType) {
    //   this.pageLayoutType = this.config.template.change.location.pageType;
    // }

    //this.action.register('next', () => { this.next(); });
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public cancel(): Promise<boolean> {
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

  public next(): Promise<boolean> {
    return new Promise((resolve) => {
        //this.navigationService.back();
        resolve(this.panelNewMapComponent.validate());
    });
  }
}
