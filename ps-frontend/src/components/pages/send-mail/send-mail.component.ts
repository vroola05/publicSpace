import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Call } from '../../../model/call';
import { MailT } from '../../../model/template';
import { MailInfo } from '../../../model/mailInfo';
import { Message } from '../../../model/message';
import { PageAbstract } from '../page';

import { NavigationService } from '../../../services/navigation/navigation.service';
import { ConfigService } from '../../../services/config/config.service';
import { ActionService } from '../../../services/action/action.service';
import { MailService } from '../../../services/mail/mail.service';
import { Loader } from '../../../services/loader/loader.service';
import { TextareaFieldComponent } from '../../fields/textarea-field/textarea-field.component';
import { StorageService } from '../../../services/storage/storage.service';
import { TransformService } from '../../../services/transform/transform.service';
import { AuthorisationService } from '../../../services/authorisation/authorisation.service';
import { EndpointService } from '../../../services/endpoint/endpoint.service';
import { PageButton } from '../../../model/page-button';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.scss']
})
export class SendMailComponent extends PageAbstract implements OnInit, OnDestroy {
  @ViewChild('descriptionField') public descriptionField: TextareaFieldComponent;

  public getUrlImage: string;
  public buttonsLeft: PageButton[];
  public buttonsRight: PageButton[];

  public descrption = '';
  public label = 'Inhoud email';
  public mailConfig: MailT;
  private sending = false;

  constructor(
    protected override router: Router,
    protected override activatedRoute: ActivatedRoute,
    private endpoints: EndpointService,
    protected override navigationService: NavigationService,
    protected override storage: StorageService,
    protected override action: ActionService,
    protected override transform: TransformService,
    protected override authorisation: AuthorisationService,
    protected override config: ConfigService,
    private mailService: MailService,
    private loader: Loader,
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation, config);
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    const identifier = this.activatedRoute.snapshot.paramMap.get('mailId');

    // const mailConfigs = this.config.template.mail;

    // this.mailConfig = mailConfigs.find(conf => conf.id === identifier);
    if (this.mailConfig && this.mailConfig.endpoint) {
      this.getCall();

      if (this.mailConfig.title) {
        this.navigationService.title = this.mailConfig.title;
      }

      if (this.mailConfig.label) {
        this.label = this.mailConfig.label;
      }

      this.buttonsLeft = this.mailConfig.buttonsLeft;
      this.buttonsRight = this.mailConfig.buttonsRight;
    } else {
      this.navigationService.back();
    }
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.mailService.clear();
  }

  public getCall(): void {
    this.endpoints.get('getDetailCall').then((call: Call) => {
      this.transform.setVariable('call', call);
      this.call = call;
      this.getUrlImage = this.transform.URL(this.config.getEndpoint('getImage').endpoint);

      this.getMailTemplate(this.mailConfig.template);
    });
  }

  public getMailTemplate(endpoint: string) {
    this.mailService.setDescriptor('({DESCRIPTION})');
    this.mailService.setText(this.descrption);
    const mailInfo = new MailInfo();
    mailInfo.description = '({DESCRIPTION})';
    this.mailService.reveiveMailTemplate(this.transform.URL(endpoint), mailInfo, 'post');
  }

  public onTyping($event): void {
    if ($event.target) {
      this.mailService.setText($event.target.value);
    }
  }

  public onContentChanged($event): void {
    this.descrption = $event;
  }

  public override back(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.navigationService.back();
      resolve(true);
    });
  }

  public submit(): void {
    if (!this.sending && this.descriptionField.validate()) {
      this.sending = true;
      const loaderId = this.loader.add('Bezig met opslaan!');
      const endpoint = this.transform.URL(this.mailConfig.endpoint);
      const mailInfo = new MailInfo();
      mailInfo.description = this.descrption;
      this.endpoints.post(endpoint, mailInfo).then((message: Message) => {
        this.navigationService.navigateHome();
        this.loader.remove(loaderId);
      })
      .catch(() => {
        this.loader.remove(loaderId);
        this.sending = false;
      });
    }
  }
}
