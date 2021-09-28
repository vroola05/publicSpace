import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ButtonT } from '../../../../../model/template';
import { Call } from '../../../../../model/call';

import { ActionService } from '../../../../services/action/action.service';
import { ConfigService } from '../../../../services/config/config.service';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { ApiService } from '../../../../services/api/api.service';
import { PanelNewConfirmationComponent } from '../../../panel/components/panel-new-confirmation/panel-new-confirmation.component';
import { Loader } from '../../../../services/loader/loader.service';

import { PageAbstract } from '../../page';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { ToastService } from '../../../../services/toast/toast.service';
import { TransformService } from '../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'lib-new-confirmation',
  templateUrl: './new-confirmation.component.html',
  styleUrls: ['./new-confirmation.component.scss']
})
export class NewConfirmationComponent extends PageAbstract implements OnInit, OnDestroy {
  @ViewChild('panelNewConfirmationComponent') panelNewConfirmationComponent: PanelNewConfirmationComponent;

  private postNewCallImagesSubscription: Subscription;
  private loaderId: number;
  private sending = false;

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
    private apiService: ApiService,
    private config: ConfigService,
    private loader: Loader,
    private toast: ToastService
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation);
    this.call = new Call();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.buttonsLeft = this.config.template.pagesOld.newConfirmation.buttonsLeft;
    this.buttonsRight = this.config.template.pagesOld.newConfirmation.buttonsRight;
    if (this.config.template.pagesOld.newConfirmation.pageType) {
      this.pageLayoutType = this.config.template.pagesOld.newConfirmation.pageType;
    }
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.postNewCallImagesSubscription) {
      this.postNewCallImagesSubscription.unsubscribe();
    }
  }

  public submit(): void {
    if (!this.sending) {
      this.sending = true;
      const callData = this.storage.getSession('call');
      if (callData) {
        this.loaderId = this.loader.add('Bezig met opslaan!');
        const call = JSON.parse(callData) as Call;
        this.apiService.post(this.config.getEndpoint('postCall').endpoint, call)
          .pipe(first()).subscribe((newCall: Call) => {

          this.call = newCall;
          const files = this.storage.getVariable('files') as File[];
          if (files && files.length > 0) {
            this.transform.setVariable('call', newCall);
            this.uploadImages(files);
          } else {
            this.submitted();
          }
        },
        () => {
          this.loader.remove(this.loaderId);
          this.sending = false;
          this.toast.error('Er is iets foutgegaan bij het opslaan van de melding!');
        });
      }
    }
  }

  public submitted(): void {
    this.storage.clearProcessData();
    this.navigationService.navigateHome();
    this.loader.remove(this.loaderId);
    this.toast.success('De melding is succesvol aangemaakt onder nummer ' + this.call.casenumber + '. '
    + 'Afhankelijk van de categorie is deze terug te vinden voor de toezichthouder in de lijst nieuwe meldingen.', 15);
  }

  public uploadImages(files: File[]) {
    const postUrlImage = this.transform.URL(this.config.getEndpoint('postImage').endpoint);

    const imageObservables: Observable<any>[] = [];
    for (const file of files) {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      imageObservables.push(this.apiService.post(postUrlImage, formData, {}, true));
    }
    this.postNewCallImagesSubscription = forkJoin(imageObservables).subscribe(finished => {
      this.submitted();
    },
    error => {
      this.storage.clearProcessData();
      this.navigationService.navigateHome();
      this.loader.remove(this.loaderId);
      this.sending = false;
    });
  }
}
