import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ApiService } from '../../../../services/api/api.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { ConfigService } from '../../../../services/domain/domain.service';
import { TransformService } from '../../../../services/transform/transform.service';
import { User, UserExtended } from '../../../../../model/user';
import { PasswordFieldComponent } from '../../../fields/password-field/password-field.component';
import { SelectFieldComponent } from '../../../fields/select-field/select-field.component';
import { TextareaFieldComponent } from '../../../fields/textarea-field/textarea-field.component';
import { Group } from '../../../../../model/group';

@Component({
  selector: 'lib-list-panel-user',
  templateUrl: './list-panel-user.component.html',
  styleUrls: ['./list-panel-user.component.scss']
})
export class ListPanelUserComponent implements OnInit {
  @ViewChild('nameComponent') nameComponent: TextareaFieldComponent;
  @ViewChild('usernameComponent') usernameComponent: TextareaFieldComponent;
  @ViewChild('emailComponent') emailComponent: TextareaFieldComponent;
  @ViewChild('rolesField') public rolesField: SelectFieldComponent;
  @ViewChild('passwordComponent') passwordComponent: PasswordFieldComponent;
  @ViewChild('rePasswordComponent') rePasswordComponent: PasswordFieldComponent;

  @Output() onEvent: EventEmitter<{ action: string, isNew: boolean, data: any }> = new EventEmitter();

  @Input() isNew = true;

  public delete = false;

  public _user: UserExtended;
  @Input() set user(user: User){
    this.delete = false;
    this._user = new UserExtended();
    if (user) {
      this._user.id = user.id;
      this._user.name = user.name;
      this._user.username = user.username;
      this._user.email = user.email;
      this._user.roles = user.roles;
      this._user.admin = user.admin;
    }
  }
  @Input() roles: {name: string, value?: string, selected?: boolean, data?: any}[] = [];
  @Input() groups: {name: string, value?: string, selected?: boolean, data?: any}[] = [];
  
  constructor(
    private apiService: ApiService,
    private config: ConfigService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) { }

  public ngOnInit(): void {
  }

  public onDeleteChanged($event): void {
    this.delete = $event;
  }

  public onSave($event): void {
    const a = this.nameComponent.validate();
    const b = this.usernameComponent.validate();
    const c = this.emailComponent.validate();
    if (this.isNew) {
      const d = this.passwordComponent.validate();
      const e = this.rePasswordComponent.validate();
      
      if (a && b && c && d && e) {
        this.postUser(this._user);
      }
    } else {
      if (a && b && c) {
        this.putUser(this._user);
      }
    }
  }

  public onNameChanged($event) {
    if (this.nameComponent.validate()) {
      this._user.name = $event;
    }
  }

  public onUsernameChanged($event) {
    if (this.usernameComponent.validate()) {
      this._user.username = $event;
    }
  }

  public onEmailChanged($event) {
    if (this.emailComponent.validate()) {
      this._user.email = $event;
    }
  }

  public onPasswordChanged($event) {
    if (this.passwordComponent.validate()) {
      this._user.password = $event;
    }
  }

  public onRePasswordChanged($event) {
    if (this.rePasswordComponent.validate()) {
      this._user.rePassword = $event;
    }
  }

  public onAdminChanged($event) {
    this._user.admin = $event;
  }

  public onRolesChanged($event) {
    const roles: string[] = [];
    this.roles.forEach(role => {
      if (role.selected) {
        roles.push(role.value);
      }
    });
    this._user.roles = roles;
  }

  public onGroupsChanged($event) {
    const groups: Group[] = [];
    this.groups.forEach(group => {
      if (group.selected) {
        groups.push(group.data as Group);
      }
    });
    this._user.groups = groups;
  }

  public cancel(): void {
    this.onEvent.emit({
      action: 'cancel',
      isNew: this.isNew,
      data: null
    });
  }

  public postUser(userExtended: UserExtended): void {
    const endpointT = this.config.getEndpoint('postUser');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      let url = this.transform.URL(endpointT.endpoint);
      this.apiService.post(url, userExtended).subscribe((u: User) => {
        this.onEvent.emit({
          action: 'save',
          isNew: this.isNew,
          data: null
        });
      },
      (response) => {
        this.setErrors(response);
      });
    }
  }

  public putUser(user: User): void {
    const endpointT = this.config.getEndpoint('putUser');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      this.transform.setVariable('user', user);
      let url = this.transform.URL(endpointT.endpoint);
      this.transform.deleteVariable('user');
      this.apiService.put(url, user).subscribe((u: User) => {
        this.onEvent.emit({
          action: 'save',
          isNew: this.isNew,
          data: null
        });
      },
      (response) => {
        this.setErrors(response);
      });
    }
  }

  public setErrors(response: any): void {
    if(response && response.error && response.error.errors) {
      const errors = response.error.errors as {field: string, value: string}[];
      errors.forEach(error => {
        switch(error.field) {
          case 'name':
            this.nameComponent.addError(error.value);
            break;
          case 'username':
            this.usernameComponent.addError(error.value);
            break;
          case 'email':
            this.emailComponent.addError(error.value);
            break;
          case 'password':
            this.passwordComponent.addError(error.value);
            break;
        }
      });
    }
  }
}
