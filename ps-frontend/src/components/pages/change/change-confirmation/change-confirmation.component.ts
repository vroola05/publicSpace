import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Call } from '../../../../model/call';
import { Note } from '../../../../model/note';
import { Message } from '../../../../model/message';
import { ActionService } from '../../../../services/action/action.service';
import { ConfigService } from '../../../../services/config/config.service';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { Loader } from '../../../../services/loader/loader.service';
import { PageAbstract } from '../../page';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastService } from '../../../../services/toast/toast.service';
import { Popup } from '../../../../services/popup/popup.service';
import { PopupConfirmComponent } from '../../../popup/components/popup-confirm/popup-confirm.component';
import { PanelChangeConfirmationComponent } from '../../../panel/components/panel-change-confirmation/panel-change-confirmation.component';
import { TransformService } from '../../../../services/transform/transform.service';
import { EndpointService } from '../../../../services/endpoint/endpoint.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { PageButton } from '../../../../model/page-button';



@Component({
  selector: 'app-change-confirmation',
  templateUrl: './change-confirmation.component.html',
  styleUrls: ['./change-confirmation.component.scss']
})
export class ChangeConfirmationComponent extends PageAbstract implements OnInit, OnDestroy {
  @ViewChild('panelChangeConfirmationComponent') panelChangeConfirmationComponent: PanelChangeConfirmationComponent;
  private subscription: Subscription[] = [];
  private putChangeCallSubscription: Subscription;

  private loaderId: number;

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
    private endpoints: EndpointService,
    private loader: Loader,
    private popup: Popup,
    private toast: ToastService
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation, config);
    this.call = new Call();
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    // this.buttonsLeft = this.config.template.change.confirmation.buttonsLeft;
    // this.buttonsRight = this.config.template.change.confirmation.buttonsRight;
    // if (this.config.template.change.confirmation.pageType) {
    //   this.pageLayoutType = this.config.template.change.confirmation.pageType;
    // }

    this.getCall();
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.putChangeCallSubscription) {
      this.putChangeCallSubscription.unsubscribe();
    }
  }

  public getCall(): void {
    this.endpoints.get('getDetailCall').then((call: Call) => {
      this.transform.setVariable('call', call);
      this.call = call;
    });
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

  public save(content: string) {
    const call = new Call();
    call.notes = [];
    const note = new Note();
    note.content = content;
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
      this.endpoints.put('putCall', call).then((message: Message) => {
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
      }, [{type: 'ok', event: (text: string) => {
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
