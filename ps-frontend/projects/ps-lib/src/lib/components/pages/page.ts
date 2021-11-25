import { OnDestroy, OnInit, Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../../../model/page';
import { ActionTypes, PageLayoutType } from '../../../model/intefaces';
import { ActionService } from '../../services/action/action.service';
import { AuthorisationService } from '../../services/authorisation/authorisation.service';
import { NavigationService } from '../../services/navigation/navigation.service';
import { StorageService } from '../../services/storage/storage.service';
import { TransformService } from '../../services/transform/transform.service';


@Directive()
export abstract class PageAbstract implements OnInit, OnDestroy {
  public pageLayoutType: PageLayoutType = PageLayoutType.page;

  public page: Page;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected navigationService: NavigationService,
    protected storage: StorageService,
    protected action: ActionService,
    protected transform: TransformService,
    protected authorisation: AuthorisationService
  ) {
  }

  public ngOnInit(): void {
    this.transform.clearVariable();
    this.transform.setVariable('user', this.authorisation.user);
    this.transform.setVariable('path', this.activatedRoute.snapshot.paramMap);
    this.navigationService.title = (this.activatedRoute.snapshot.data && this.activatedRoute.snapshot.data.title)
      ? this.activatedRoute.snapshot.data.title
      : (this.navigationService.headerItem && this.navigationService.headerItem.name
        ? this.navigationService.headerItem.name
        : '');

    
    this.action.register(ActionTypes.ASSIGN_GROUP, () => { this.assignGroup(); });
    this.action.register(ActionTypes.ASSIGN_PERSON, () => { this.assignPerson(); });
    this.action.register(ActionTypes.CALL_CREATE, () => { this.callCreate(); });
    this.action.register(ActionTypes.CALL_CLOSE, () => { this.callClose(); });
    this.action.register(ActionTypes.CALL_KILL, () => { this.callKill(); });

    this.action.register(ActionTypes.ORDER_CREATE, () => { this.orderCreate(); });
    this.action.register(ActionTypes.ORDER_ACCEPT, () => { this.orderAccept(); });
    this.action.register(ActionTypes.ORDER_REJECT, () => { this.orderReject(); });
    this.action.register(ActionTypes.ORDER_CANCEL, () => { this.orderCancel(); });
    this.action.register(ActionTypes.ORDER_CLOSE, () => { this.orderClose(); });
    this.action.register(ActionTypes.ORDER_DONE, () => { this.orderDone(); });
    this.action.register(ActionTypes.ORDER_DONE_REJECT, () => { this.orderDoneReject(); });

    this.action.register(ActionTypes.CANCEL, () => { this.cancel(); });
    this.action.register(ActionTypes.BACK, () => { this.back(); });
    this.action.register(ActionTypes.NEXT, () => { this.next(); });
  }

  public ngOnDestroy(): void {
    this.transform.clearVariable();
  }

  /**
   * 
   */

   public cancel(): void {
    this.storage.clearProcessData();
    this.navigationService.navigateHome();
  }

  public back(): void {
    this.navigationService.back();
  }

  public next(): void {
    console.error('Not implemented');
  }

  public assignGroup(): void {
    console.error('Not implemented');
  }

  public assignPerson(): void {
    console.error('Not implemented');
  }

  public callCreate(): void {
    console.error('Not implemented');
  }

  public callClose(): void {
    console.error('Not implemented');
  }

  public callKill(): void {
    console.error('Not implemented');
  }

  public orderCreate(): void {
    console.error('Not implemented');
  }

  public orderAccept(): void {
    console.error('Not implemented');
  }

  public orderReject(): void {
    console.error('Not implemented');
  }

  public orderCancel(): void {
    console.error('Not implemented');
  }

  public orderClose(): void {
    console.error('Not implemented');
  }

  public orderDone(): void {
    console.error('Not implemented');
  }

  public orderDoneReject(): void {
    console.error('Not implemented');
  }
}
