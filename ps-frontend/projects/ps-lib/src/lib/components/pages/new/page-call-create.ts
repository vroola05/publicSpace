import { Directive, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Status } from "../../../../model/status";
import { forkJoin, Observable } from "rxjs";
import { first } from "rxjs/operators";
import { Call } from "../../../../model/call";
import { ActionTypeEnum } from "../../../../model/intefaces";
import { ActionService } from "../../../services/action/action.service";
import { ApiService } from "../../../services/api/api.service";
import { AuthorisationService } from "../../../services/authorisation/authorisation.service";
import { ConfigService } from "../../../services/config/config.service";
import { EndpointService } from "../../../services/endpoint/endpoint.service";
import { Loader } from "../../../services/loader/loader.service";
import { NavigationService } from "../../../services/navigation/navigation.service";
import { StorageService } from "../../../services/storage/storage.service";
import { ToastService } from "../../../services/toast/toast.service";
import { TransformService } from "../../../services/transform/transform.service";
import { PageAbstract } from "../page";

@Directive()
export abstract class ActionCallCreate extends PageAbstract implements OnInit, OnDestroy {
  protected lock = false;
  protected loaderId: number;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected navigationService: NavigationService,
    protected storage: StorageService,
    protected action: ActionService,
    protected transform: TransformService,
    protected authorisation: AuthorisationService,
    protected apiService: ApiService,
    protected endpoints: EndpointService,
    protected config: ConfigService,
    protected loader: Loader,
    protected toast: ToastService
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation, config);
  }


  public ngOnInit(): void {
    super.ngOnInit();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();

    this.action.register(ActionTypeEnum.CALL_CREATE, () => { return super.callCreate() });
  }

  public callCreate(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const action = this.config.getAction(ActionTypeEnum.CALL_CREATE);
      if (!this.lock) {
        this.lock = true;
        const callData = this.storage.getSession('call');
        if (callData) {
          this.loaderId = this.loader.add('Bezig met opslaan!');
          const call = JSON.parse(callData) as Call;
          call.status = action.status;

          this.endpoints.post('postCall', call).then((newCall: Call) => {
            const files = this.storage.getVariable('files') as File[];
            if (files && files.length > 0) {
              this.transform.setVariable('call', newCall);
              this.uploadImages(call, resolve, reject, files);
            } else {
              this.onCallCreated(newCall, resolve, reject);
            }
          })
            .catch(() => {
              this.loader.remove(this.loaderId);
              this.lock = false;
              this.toast.error('Er is iets foutgegaan bij het opslaan van de melding!');
              reject(false);
            });
        }
      }
    });
  }

  public onCallCreated(call: Call, resolve: (value: boolean) => void, reject: (reason: boolean) => void): void {
    this.storage.clearProcessData();
    this.navigationService.navigateHome();
    this.loader.remove(this.loaderId);
    this.toast.success('De melding is succesvol aangemaakt onder nummer ' + call.casenumber + '. '
      + 'Afhankelijk van de categorie is deze terug te vinden voor de toezichthouder in de lijst nieuwe meldingen.', 15);
    resolve(true);
  }

  public uploadImages(call: Call, resolve: (value: boolean) => void, reject: (reason: boolean) => void, files: File[]) {
    const postUrlImage = this.transform.URL(this.config.getEndpoint('postImage').endpoint);

    const imageObservables: Observable<any>[] = [];
    for (const file of files) {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      imageObservables.push(this.apiService.post(postUrlImage, formData, {}, true));
    }
    forkJoin(imageObservables).pipe(first()).subscribe(finished => {
      this.onCallCreated(call, resolve, reject);
    },
      error => {
        this.storage.clearProcessData();
        this.navigationService.navigateHome();
        this.loader.remove(this.loaderId);
        this.lock = false;
        reject(false);
      });
  }
}