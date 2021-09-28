import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';

import { TextFieldComponent } from '../../../fields/text-field/text-field.component';
import { Message } from '../../../../../model/message';
import { Login } from '../../../../../model/login';
import { ConfigService } from '../../../../services/domain/domain.service';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { ApiService } from '../../../../services/api/api.service';
import { TransformService } from '../../../../services/transform/transform.service';

@Component({
  selector: 'lib-reset-account',
  templateUrl: './reset-account.component.html',
  styleUrls: ['./reset-account.component.scss']
})
export class ResetAccountComponent implements OnInit, AfterViewInit {

  @ViewChild('usernameComponent') usernameComponent: TextFieldComponent;

  public username = '';
  public password = '';
  public rememberLogin = false;
  public send = false;
  public error: Message;

  constructor(
    private api: ApiService,
    private config: ConfigService,
    private transform: TransformService,
    private navigationService: NavigationService
  ) { }

  public ngOnInit(): void {
  }

  public ngAfterViewInit() {
    setTimeout(() => {
      this.usernameComponent.focus();
    });
  }

  public onUsernameChanged(value): void {
    this.username = value;
  }


  public onRememberLoginChanged(value: boolean): void {
    this.rememberLogin = value;
  }

  public onTyping(event): void {
    if (event.keyCode === 13) {
      this.submit();
    }
  }
  public getLogo(): string {
    return this.config.getLogo();
  }

  public backToLogin(): void {
    if (this.config.template.login.resetAccount.route) {
      this.navigationService.navigate([this.config.template.login.login.route]);
    }
  }

  public submit(): void {
    this.transform.setVariable('user', new Login(this.username, ''));

    if (this.usernameComponent.validate()) {
      this.api.get(this.transform.URL(this.config.getEndpoint('getLoginReset').endpoint)).pipe(first()).subscribe((message: Message) => {
        this.send = true;
        this.usernameComponent.value = '';
        this.username = '';
        this.error = null;
      },
        (body) => {
          this.error = body.error;
        });
    }
  }
}
