import { OnDestroy, OnInit, Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../../../model/page';
import { ActionTypeEnum, PageLayoutType } from '../../../model/intefaces';
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


    this.action.register(ActionTypeEnum.ASSIGN_GROUP, () => { return this.assignGroup(); });
    this.action.register(ActionTypeEnum.ASSIGN_PERSON, () => { return this.assignPerson(); });
    this.action.register(ActionTypeEnum.CALL_CREATE, () => { return this.callCreate(); });
    this.action.register(ActionTypeEnum.CALL_CLOSE, () => { return this.callClose(); });
    this.action.register(ActionTypeEnum.CALL_KILL, () => { return this.callKill(); });

    this.action.register(ActionTypeEnum.ORDER_CREATE, () => { return this.orderCreate(); });
    this.action.register(ActionTypeEnum.ORDER_ACCEPT, () => { return this.orderAccept(); });
    this.action.register(ActionTypeEnum.ORDER_REJECT, () => { return this.orderReject(); });
    this.action.register(ActionTypeEnum.ORDER_CANCEL, () => { return this.orderCancel(); });
    this.action.register(ActionTypeEnum.ORDER_CLOSE, () => { return this.orderClose(); });
    this.action.register(ActionTypeEnum.ORDER_DONE, () => { return this.orderDone(); });
    this.action.register(ActionTypeEnum.ORDER_DONE_REJECT, () => { return this.orderDoneReject(); });

    this.action.register(ActionTypeEnum.CANCEL, () => { return this.cancel(); });
    this.action.register(ActionTypeEnum.BACK, () => { return this.back(); });
    this.action.register(ActionTypeEnum.NEXT, () => { return this.next(); });
  }

  public ngOnDestroy(): void {
    this.transform.clearVariable();
  }

  public notImplemented(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.error('Not implemented');
      reject(false)
    });
  }

  /**
   * 
   */

  public cancel(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.storage.clearProcessData();
      this.navigationService.navigateHome();
      resolve(true);
    });
  }

  public back(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
    this.navigationService.back();
    resolve(true);
    });
  }

  public next(): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }

  public assignGroup(): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }

  public assignPerson(): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }

  public callCreate(): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }

  public callClose(): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }

  public callKill(): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }

  public orderCreate(): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }

  public orderAccept(): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }

  public orderReject(): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }

  public orderCancel(): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }

  public orderClose(): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }

  public orderDone(): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }

  public orderDoneReject(): Promise<boolean> {
    console.error('Not implemented');
    return this.notImplemented();
  }
}
