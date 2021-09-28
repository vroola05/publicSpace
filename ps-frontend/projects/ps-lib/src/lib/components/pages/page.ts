import { OnDestroy, OnInit, Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageLayoutType, StatusTypes } from '../../../model/intefaces';
import { ActionService } from '../../services/action/action.service';
import { AuthorisationService } from '../../services/authorisation/authorisation.service';
import { NavigationService } from '../../services/navigation/navigation.service';
import { StorageService } from '../../services/storage/storage.service';
import { TransformService } from '../../services/transform/transform.service';


@Directive()
export abstract class PageAbstract implements OnInit, OnDestroy {
  public pageLayoutType: PageLayoutType = PageLayoutType.page;

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

    this.action.clear();
    this.action.register('cancel', () => { this.cancel(); });
    this.action.register('back', () => { this.back(); });
    this.action.register('submit', () => { this.submit(); });
  }

  public ngOnDestroy(): void {
    this.transform.clearVariable();
  }

  public cancel(): void {
    this.storage.clearProcessData();
    this.navigationService.navigateHome();
  }

  public back(): void {
    this.navigationService.back();
  }

  public submit(): void {
    console.error('Not implemented');
  }
}
