import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { NavigationRoute } from '../../../model/intefaces';
import { StorageService } from '../storage/storage.service';
import { HeaderMenuItemT } from '../../../model/template';
import { TransformService } from '../transform/transform.service';
import { Status } from '../../../model/status';


@Injectable({
  providedIn: 'platform'
})
export class NavigationService {
  private _title = new BehaviorSubject<string>('');
  private _selectedHeaderItem = new BehaviorSubject<HeaderMenuItemT>(null);
  private routes: NavigationRoute[] = [];

  private headerItems = new BehaviorSubject<Array<HeaderMenuItemT>>(new Array<HeaderMenuItemT>());

  set title(title: string) {
    document.title = title;
    this._title.next(title);
  }

  get title(): string {
    return this._title.getValue();
  }

  constructor(
    private location: Location,
    private router: Router,
    private storage: StorageService,
    private transform: TransformService
    ) {

    this.location.subscribe(redirect => {
      if (redirect.pop === true) {
        this.popRoute();
      }
    });
  }

  public titleAsObservable(): Observable<string> {
    return this._title.asObservable();
  }

  public readNavigation(): void {
    const routes = this.storage.getSession('routes');
    if (routes) {
      this.routes = JSON.parse(routes) as NavigationRoute[];
    }

    const selected = this.storage.getSession('headerItem');
    if (selected) {
      this._selectedHeaderItem.next(JSON.parse(selected) as HeaderMenuItemT);
    }
  }

  public set headerItem(headerItem: HeaderMenuItemT) {
    this._selectedHeaderItem.next(headerItem);
    this.storage.setSession('headerItem', JSON.stringify(headerItem));
  }

  public get headerItem(): HeaderMenuItemT {
    return this._selectedHeaderItem.getValue();
  }

  public getSelectedHeaderItem(): Observable<HeaderMenuItemT> {
    return this._selectedHeaderItem.asObservable();
  }

  public clearHeaderItems(): void {
    this.headerItems.next([]);
  }

  /*public addHeaderItems(headerItems: HeaderMenuItemT[]): void {
    const buttons = this.transform.filterRolesAndConditions(this.headerItems.getValue().concat(headerItems)) as HeaderMenuItemT[];
    this.headerItems.next(buttons);
  }*/

  public getHeaderItemsAsObservable(): Observable<HeaderMenuItemT[]> {
    return this.headerItems.asObservable();
  }

  public getHeaderItems(): HeaderMenuItemT[] {
    return this.headerItems.getValue();
  }

  public addRoute(route: string[]): void {
    this.routes.push({route});
    this.storage.setSession('routes', JSON.stringify(this.routes));
  }
  public clearRoutes(): void {
    this.routes = [];
    this.storage.setSession('routes', JSON.stringify(this.routes));
  }

  private popRoute(): void {
    if (this.routes.length > 0) {
      this.routes.pop();
      if (this.routes.length === 0) {
        this.storage.clearProcessData();
      }

      this.storage.setSession('routes', JSON.stringify(this.routes));
    }
  }

  public hasBack(): boolean {
    return this._selectedHeaderItem.getValue() !== null || this.routes.length > 0;
  }

  public back(): Promise<boolean> {
    this.popRoute();
    return this.router.navigate(this.getCurrentRoute());
  }

  public getCurrentRoute(): string[] {
    if (this.routes.length > 0) {
      return this.routes[this.routes.length - 1].route;
    }
    if (this._selectedHeaderItem.getValue() !== null) {
      return ['/overview/' + this._selectedHeaderItem.getValue().id];
    }
    return null;
  }

  public navigateHome(): Promise<boolean> {
    this.clearRoutes();
    return this.router.navigate(['/overview/' + this._selectedHeaderItem.getValue().id]);
  }

  public navigate(route: string[], store: boolean = false): Promise<boolean> {
    if (store) {
      this.addRoute(route);
    } else {
      this.clearRoutes();
    }
    return this.router.navigate(route);
  }

  public transformURL(url: string, obj: any): string {
    if (!url) {
      return url;
    }
    const reg = new RegExp(/\$\{[a-zA-Z\.]+}/, 'g');
    return url.replace(reg, (match, offset, contents) => {
      const property = match.slice(2, match.length - 1);
      if (obj && property in obj) {
        return this.transform.getValueFrom(property, obj);
      } else if (property.indexOf('.') >= 0) {
        const path = property.split('.');
        if (path.length > 0) {
          try {
            return this.transform.readValueFromPath(path, obj);
          } catch (e) {
            return match;
          }
        }
      }
      return match;
    });
  }

}
