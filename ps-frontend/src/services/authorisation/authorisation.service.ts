import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api.service';
import { User } from '../../model/user';
import { Login } from '../../model/login';
import { StorageService } from '../storage/storage.service';
import { RoleT } from '../../model/template';
import { first } from 'rxjs/operators';
import { Message } from '../../model/message';
import { ToastService } from '../toast/toast.service';
import { DomainTypeEnum } from '../../model/intefaces';

@Injectable({
  providedIn: 'root'
})
export class AuthorisationService {
  private _user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private checkTokenUrl: string;
  
  constructor(
    private apiService: ApiService,
    private storage: StorageService,
    private toast: ToastService
  ) {
  }

  public readUser() {
    const user = JSON.parse(this.storage.getLocal('user')) as User;
    if (user) {
      this._user.next(user);
    }
  }

  public get userObservable(): Observable<User> {
    return this._user.asObservable();
  }

  public set user(user: User) {
    this._user.next(user);
    this.storage.setLocal('user', JSON.stringify(user));
  }

  public get user(): User {
    let user = this._user.getValue();
    if (user != null && user) {
      return user;
    } else {
      this.readUser();
      return this._user.getValue();
    }
  }

  public checkToken(): void {
    if (this.checkTokenUrl && this.user) {

      this.apiService.get(this.checkTokenUrl).pipe(first()).subscribe((message: Message) => {
        if (message.status === 403 ) {
          this.logout();
          this.toast.warning('De sessie is verlopen. Log opnieuw in!', 10);
        }
      }, (err) => {
        this.logout();
        this.toast.warning('De sessie is verlopen. Log opnieuw in!', 10);
      });
    }
  }

  public isAdmin(): boolean {
    return this.user && this.user.admin === true;
  }

  public isDomainType(domainTypeEnum: DomainTypeEnum): boolean {
    return this.user?.domain?.domainType && this.user.domain.domainType.id === domainTypeEnum;
  }

  public hasRole(role: string): boolean {
    if (this.isInUserRoles(role, this.user)) {
      return true;
    }
    return false;
  }

  public hasRoles(roles: string[]): boolean {
    if (roles.find(role => this.isInUserRoles(role, this.user))) {
      return true;
    }
    return false;
  }

  public validateRoles(roles: RoleT[]): boolean {
    if (!roles || roles.length === 0) {
      return true;
    }
    const user = this.user;
    if (roles.find(role => role.allow && this.isInUserRoles(role.role, user))) {
      return true;
    }
    return false;
  }

  private isInUserRoles(role: string, user: User): boolean {
    return user.roles.includes(role);
  }

  public login(endpoint: string, username: string, password: string, rememberMe: boolean): Observable<User> {
    const login = new Login(username, password, rememberMe);
    console.log(endpoint);
    return this.apiService.post(endpoint, login);
  }

  public logout(): void {
    this._user.next(null);
    this.storage.clear();
  }
}
