import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthorisationService } from '../../services/authorisation/authorisation.service';
import { NavigationService } from '../../services/navigation/navigation.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../model/user';
import { ApiService } from '../../services/api/api.service';
import { ConfigService } from '../../services/config/config.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PageLayoutType } from '../../../model/intefaces';
import { HeaderMenuItemT } from '../../../model/template';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() public pageLayoutType: PageLayoutType = PageLayoutType.overview;
  public plt = PageLayoutType;

  public headerItems: Array<HeaderMenuItemT>;
  public opened = false;
  public collapsed = true;
  public collapsedgroups = true;

  public user: User;
  public profileImage: string;
  public title = '';
  private subscriptions: Subscription[] = [];

  constructor(
    public sanitizer: DomSanitizer,
    private navigationService: NavigationService,
    private authorisation: AuthorisationService,
    private apiService: ApiService,
    private config: ConfigService
  ) {

  }

  private setSelected(headerItem: HeaderMenuItemT) {
    if (this.headerItems && headerItem) {
      this.headerItems.forEach(item => {
          if (item.id === headerItem.id) {
            item.selected = true;
          } else {
            item.selected = false;
          }
      });
    }
  }

  public ngOnInit(): void {
    this.headerItems = this.config.headers;
  
    this.subscriptions.push(this.navigationService.getSelectedHeaderItem().subscribe((selected: HeaderMenuItemT) => {
      this.setSelected(selected);
    }));

/*
    this.subscriptions.push(this.navigationService.getHeaderItemsAsObservable().subscribe((headerItems: Array<HeaderMenuItemT>) => {
      this.headerItems = headerItems.filter(headerItem => headerItem.menuType === 'main');
      this.setSelected(this.navigationService.headerItem);
    }));*/

    this.user = this.authorisation.user;
    if (this.user && this.user.profilePhoto) {
      this.getImage(
        this.config.getEndpoint('getProfileImage').endpoint + this.user.profilePhoto).subscribe((blob) => {
        this.blobToImage(blob);
      });
    }

    this.subscriptions.push(this.navigationService.titleAsObservable().subscribe(title => {
      this.title = title;
    }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public show(pageTypes: PageLayoutType[]): boolean {
    for (const pageType of pageTypes) {
      if (pageType === this.pageLayoutType) {
        return true;
      }
    }
    return false;
  }

  public hasBack(): boolean {
    return this.navigationService.hasBack();
  }

  public getImage(url: string): Observable<any> {
    return this.apiService.get(url, { responseType: 'blob' });
  }

  public changed($event) {
    if ($event === 'open') {
      this.open($event);
    } else if ($event === 'new') {
      this.new($event);
    } else if ($event === 'back') {
     this.back($event);
    }
  }

  public back($event) {
    this.navigationService.back();
  }

  public open($event?) {
    this.opened = true;
  }

  public close($event?) {
    this.opened = false;
  }

  public new($event) {
    this.navigationService.navigate(['new/location'], true);
  }

  public settings($event) {
    this.navigationService.navigate(['settings'], true);
  }

  public logout($event) {
    this.authorisation.logout();
    this.navigationService.navigate(['login']);
  }

  public toggleProfile($event?) {
    this.collapsed = !this.collapsed;
  }

  public toggleGroups() {
    this.collapsedgroups = !this.collapsedgroups;
  }

  public hasImage(): boolean {
    return this.profileImage && this.profileImage.length > 0;
  }

  public blobToImage(blob: Blob): void {
    if (blob && blob instanceof Blob) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.profileImage = reader.result as string;
      }, false);
      reader.readAsDataURL(blob);
    }
  }

  public getNameAsAvatar(name: string): string {
    if (!name) {
      return '';
    }
    const letters = name.split(' ').map((n) => {
      return n[0];
    });
    return letters.join('');
  }
}
