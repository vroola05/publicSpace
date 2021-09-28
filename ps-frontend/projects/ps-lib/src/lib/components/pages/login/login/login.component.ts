import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { TextFieldComponent } from '../../../fields/text-field/text-field.component';
import { PasswordFieldComponent } from '../../../fields/password-field/password-field.component';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { User } from '../../../../../model/user';
import { Message } from '../../../../../model/message';

import { ConfigService } from '../../../../services/domain/domain.service';

import { first } from 'rxjs/operators';
import { StorageService } from '../../../../services/storage/storage.service';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { TransformService } from '../../../../services/transform/transform.service';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('usernameComponent') usernameComponent: TextFieldComponent;
  @ViewChild('passwordComponent') passwordComponent: PasswordFieldComponent;

  public username = '';
  public password = '';
  public rememberLogin = false;

  public error: Message;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authorisation: AuthorisationService,
    private config: ConfigService,
    private navigationService: NavigationService,
    private storage: StorageService,
    private transform: TransformService
  ) { }

  public ngOnInit(): void {
    this.transform.clearVariable();

    this.navigationService.title = (this.activatedRoute.snapshot.data && this.activatedRoute.snapshot.data.title)
      ? this.activatedRoute.snapshot.data.title : 'Inloggen';
  }

  public ngOnDestroy(): void {
    this.transform.clearVariable();
  }

  public ngAfterViewInit() {
    setTimeout(() => {
      this.usernameComponent.focus();
    });
  }

  public onUsernameChanged(value): void {
    this.username = value;
  }

  public onPasswordChanged(value): void {
    this.password = value;
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

  public hasReset(): boolean {
    return true; //this.domain.config.login.idp && this.domain.config.login.idp === 1;
  }

  public resetAccount(): void {
    if (this.config.template.login.resetAccount.route) {
      this.navigationService.navigate([this.config.template.login.resetAccount.route]);
    }
  }

  public submit(): void {
    if (this.usernameComponent.validate() && this.passwordComponent.validate()) {
      this.authorisation.login(
        this.config.getEndpoint('postLogin').endpoint, this.username, this.password, this.rememberLogin)
        .pipe(first()).subscribe((user: User) => {
        this.error = null;
        this.storage.removeSession('haslogin');
        this.authorisation.user = user;
      },
      (body) => {
        this.error = body.error;
      });
    }
  }
}
