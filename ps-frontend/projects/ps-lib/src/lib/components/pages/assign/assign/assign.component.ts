import { Component, OnInit, ViewChild } from '@angular/core';
import { PageAbstract } from '../../page';


import { ButtonT } from '../../../../../model/template';
import { Call } from '../../../../../model/call';
import { User } from '../../../../../model/user';
import { Image } from '../../../../../model/image';
import { Group } from '../../../../../model/group';
import { Message } from '../../../../../model/message';
import { Environment } from '../../../../../model/intefaces';

import { ToastService } from '../../../../services/toast/toast.service';
import { TransformService } from '../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { EndpointService } from '../../../../services/endpoint/endpoint.service';
import { ActionService } from '../../../../services/action/action.service';
import { EnvironmentService } from '../../../../services/environment/environment.service';

import { ConfigService, PageTypes } from '../../../../services/config/config.service';
import { Loader } from '../../../../services/loader/loader.service';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDirective } from '../../../../directives/dynamic.directive';

@Component({
  selector: 'lib-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss']
})
export class AssignComponent extends PageAbstract implements OnInit {
  @ViewChild(DynamicDirective, {static: false}) private dynamicHost!: DynamicDirective;
  public environment: Environment;

  protected lock = false;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected navigationService: NavigationService,
    protected storage: StorageService,
    protected action: ActionService,
    protected transform: TransformService,
    protected authorisation: AuthorisationService,
    private endpoints: EndpointService,
    protected config: ConfigService,
    private loader: Loader,
    private toast: ToastService,
    private environmentService: EnvironmentService
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation, config);
  }

  public ngOnInit(): void {
    super.ngOnInit();

    this.environment = this.environmentService.get();
    this.transform.setVariable('environment', this.environment);

    this.page = this.config.getPage(PageTypes.assign);
    this.pageConfig = this.page.pageConfig;

    this.getCall();
  }

  public getCall(): void {
    this.endpoints.get(this.pageConfig.getEndpoint('getCall')).then((call: Call) => {
      this.transform.setVariable('call', call);

      this.call = call;
      
      this.loadComponent(this.dynamicHost.viewContainerRef, this.pageConfig.getComponent('assign'));
    });
  }

  public changed($event: {action: string, data: any}): void {
    if ($event.action == 'user') {
      
    } else if ($event.action == 'group') {
      
    }
  }

  public assignGroup(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      console.log('assignGroup');
      if (!this.lock) {
        this.lock = true;
        const group = this.transform.getVariable('group') as Group;
        if (!group || !group.id) {
          this.toast.error('Er is geen groep geselecteerd.', 5, true);
          this.lock = false;
          resolve(false);
        }
        console.log('assignGroup 1');
        const loaderId = this.loader.add('Bezig met opslaan!');
        console.log('assignGroup', this.pageConfig.getEndpoint('putGroup'), group);
        this.endpoints.put(this.pageConfig.getEndpoint('putGroup'), group).then((message: Message) => {
          this.loader.remove(loaderId);
          this.lock = false;
          this.storage.clearProcessData();
          this.navigationService.navigateHome();
          resolve(true);
        })
        .catch(() => {
          this.loader.remove(loaderId);
          this.lock = false;
          reject(false);
        });
      }
    });
  }

  public assignUser(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      console.log('assignUser');
      if (!this.lock) {
        this.lock = true;
        const user = this.transform.getVariable('user') as User;
        if (!user || !user.id) {
          this.toast.error('Er is geen gebruiker geselecteerd.', 5, true);
          this.lock = false;
          resolve(false);
        }

        const loaderId = this.loader.add('Bezig met opslaan!');
        this.endpoints.put(this.pageConfig.getEndpoint('putUser'), user).then((message: Call) => {
          this.loader.remove(loaderId);
          this.lock = false;
          this.storage.clearProcessData();
          this.navigationService.navigateHome();
          resolve(true);
        })
        .catch(() => {
          this.loader.remove(loaderId);
          this.lock = false;
          reject(false);
        });
      }
    });
  }

  public assignUserAndGroup(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      console.log('assignUserAndGroup');
      if (!this.lock) {
        this.lock = true;
        const user = this.transform.getVariable('user') as User;
        if (!user || !user.id) {
          this.toast.error('Er is geen gebruiker geselecteerd.', 5, true);
          this.lock = false;
          resolve(false);
        }

        const group = this.transform.getVariable('group') as Group;
        if (!group || !group.id) {
          this.toast.error('Er is geen groep geselecteerd.', 5, true);
          this.lock = false;
          resolve(false);
        }
        console.log(user, group);
        const loaderId = this.loader.add('Bezig met opslaan!');
        this.endpoints.put(this.pageConfig.getEndpoint('putGroupAndUser'), user).then((message: Call) => {
          this.loader.remove(loaderId);
          this.lock = false;
          this.storage.clearProcessData();
          this.navigationService.navigateHome();
          resolve(true);
        })
        .catch(() => {
          this.loader.remove(loaderId);
          this.lock = false;
          reject(false);
        });
      }
    });
  }
}
