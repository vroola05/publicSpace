import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ButtonT } from '../../../../../model/template';
import { Call } from '../../../../../model/call';
import { Note } from '../../../../../model/note';
import { Message } from '../../../../../model/message';
import { PopupETypes } from '../../../../../model/intefaces';

import { ActionService } from '../../../../services/action/action.service';
import { DomainService } from '../../../../services/domain/domain.service';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { ApiService } from '../../../../services/api/api.service';
import { Loader } from '../../../../services/loader/loader.service';
import { PageAbstract } from '../../page';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastService } from '../../../../services/toast/toast.service';
import { Popup } from '../../../../services/popup/popup.service';
import { PopupConfirmComponent } from '../../../popup/components/popup-confirm/popup-confirm.component';
import { PanelChangeConfirmationComponent } from '../../../panel/components/panel-change-confirmation/panel-change-confirmation.component';
import { TransformService } from '../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';



@Component({
  selector: 'lib-change-confirmation',
  templateUrl: './change-confirmation.component.html',
  styleUrls: ['./change-confirmation.component.scss']
})
export class ChangeConfirmationComponent extends PageAbstract implements OnInit, OnDestroy {
  @ViewChild('panelChangeConfirmationComponent') panelChangeConfirmationComponent: PanelChangeConfirmationComponent;
  private subscription: Subscription[] = [];
  private putChangeCallSubscription: Subscription;

  private loaderId: number;

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
    private domain: DomainService,
    private loader: Loader,
    private popup: Popup,
    private toast: ToastService
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation);
    this.call = new Call();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.buttonsLeft = this.domain.config.change.confirmation.buttonsLeft;
    this.buttonsRight = this.domain.config.change.confirmation.buttonsRight;
    if (this.domain.config.change.confirmation.pageType) {
      this.pageLayoutType = this.domain.config.change.confirmation.pageType;
    }

    this.getCall();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.putChangeCallSubscription) {
      this.putChangeCallSubscription.unsubscribe();
    }
  }

  public getCall(): void {
    this.subscription.push(this.apiService.get(this.transform.URL(this.domain.getEndpoint('getDetailCall').endpoint)).subscribe((call: Call) => {
      this.transform.setVariable('call', call);
      this.call = call;
    }));
  }

  public onChanged($event): void {
    switch ($event) {
      case 'change-information':
        this.navigationService.navigate([`change/${this.call.id}/information`], true);
        break;
      case 'change-location':
        this.navigationService.navigate([`change/${this.call.id}/location`], true);
        break;
    }
  }

  public save(text: string) {
    const call = new Call();
    call.notes = [];
    const note = new Note();
    note.description = text;
    call.notes.push(note);

    const c = this.storage.getSession('call');
    if (c) {
      const callChanged = JSON.parse(c) as Call;
      if (this.panelChangeConfirmationComponent.hasPriorityChanged()) {
        call.priority = callChanged.priority;
      }
      if (this.panelChangeConfirmationComponent.hasDescriptionChanged()) {
        call.description = callChanged.description;
      }
      if (this.panelChangeConfirmationComponent.hasCategoryChanged()) {
        call.mainCategory = callChanged.mainCategory;
      }
      if (this.panelChangeConfirmationComponent.hasLocationChanged()) {
        call.location = callChanged.location;
      }
      this.loaderId = this.loader.add('Bezig met opslaan!');
      const url = this.transform.URL(this.domain.getEndpoint('putCall').endpoint);
      this.putChangeCallSubscription = this.apiService.put(url, call)
        .subscribe((message: Message) => {
          this.storage.clearProcessData();
          this.navigationService.navigateHome();
          this.loader.remove(this.loaderId);
        });
    }
  }

  public submit(): void {
    if (this.panelChangeConfirmationComponent.hasinformationChanged()
      || this.panelChangeConfirmationComponent.hasPriorityChanged()
      || this.panelChangeConfirmationComponent.hasLocationChanged()) {
      this.popup.add('Toelichting wijziging', PopupConfirmComponent, {
      }, [{type: PopupETypes.ok, event: (text: string) => {
        if (text && text.length > 0) {
          this.save(text);
        } else {
          alert('Een toelichting is verplicht!');
        }
        }}]);
    } else {
      alert('Er is niks gewijzigd');
    }
  }
}
