import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { CallList } from '../../../../model/call-list';
import { HeaderMenuItemT, ListTemplateT } from '../../../../model/template';
import { PageLayoutType } from '../../../../model/intefaces';
import { Call } from '../../../../model/call';
import { PageOverviewTemplate } from '../../../../model/page-overview-template';

import { PageTypes } from '../../../../model/intefaces';
import { Page } from '../../../../model/page';
import { QueryParameters } from '../../../../model/query-parameters';
import { PageAbstract } from '../page';

import { ApiService } from '../../../services/api/api.service';
import { ConfigService } from '../../../services/config/config.service';
import { NavigationService } from '../../../services/navigation/navigation.service';
import { FilterService } from '../../../services/filter/filter.service';
import { StorageService } from '../../../services/storage/storage.service';
import { ActionService } from '../../../services/action/action.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { TransformService } from '../../../services/transform/transform.service';
import { AuthorisationService } from '../../../services/authorisation/authorisation.service';

@Component({
  selector: 'lib-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent extends PageAbstract implements OnInit, OnDestroy {
  @ViewChild('tableContainer') public tableContainer: ElementRef;
  @ViewChild('headerRef') public headerRef: ElementRef;
  public pageLayoutType: PageLayoutType = PageLayoutType.overview;
  public title = '';
  public page: Page;
  public pageTemplate: PageOverviewTemplate;
  private id: number;
  private subscriptions: Subscription[] = [];
  private subscriptionLoadList: Subscription;

  public callList: CallList[] = [];
  public call: Call;
  public endOfList = false;
  public listTemplate: ListTemplateT;

  public search = '';

  private pageChanged = false;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected navigationService: NavigationService,
    protected storage: StorageService,
    protected action: ActionService,
    protected transform: TransformService,
    protected authorisation: AuthorisationService,
    private config: ConfigService,
    private filterService: FilterService,
    private notification: NotificationService,
    private apiService: ApiService
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation);

    if (this.config.template.pages.has(PageTypes.overview)) {
      this.page = this.config.template.pages.get(PageTypes.overview)
    }

    this.search = this.filterService.getSearch();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.pageTemplate = this.page.pageOverviewTemplate.find(pageOverviewTemplate => pageOverviewTemplate.id === this.id);
    
    this.filterService.setListsize(this.pageTemplate.size ? this.pageTemplate.size : 50);

    this.listTemplate = {
      id: String(this.pageTemplate.id),
      toggle: this.pageTemplate.toggle,
      route: this.pageTemplate.route,
      buttonsLeft: this.pageTemplate.buttonsLeft,
      buttonsRight: this.pageTemplate.buttonsRight,
      priority: this.pageTemplate.priority,
      notification: '',
      columns: this.pageTemplate.columns
    }

    this.loadList(false);

    this.subscriptions.push(this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.pageChanged) {
          this.search = '';
          this.filterService.clear();
        } else {
          this.filterService.resetOffset();
        }
        this.pageChanged = true;

        this.transform.setVariable('path', this.activatedRoute.snapshot.paramMap);
        this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
        this.setPosition(0);
        this.loadList(false);
      }
    }));
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public loadList(append: boolean) {
    this.setMenu(append,this.config.headers.find(header => header.id === this.id));
    
  }

  public setMenu(append: boolean, headerMenuItem: HeaderMenuItemT): void {
    if (!headerMenuItem)
      return;

    this.navigationService.headerItem = headerMenuItem;
    this.navigationService.title = headerMenuItem.name;
    this.title = 'Zoek in (' + headerMenuItem.name + ')';

    const url = this.transform.URL(this.config.getEndpoint('getCallList').endpoint);
    this.getList(url,
      this.filterService.getQueryParameters()).pipe(first()).subscribe((callList) => {
        if (callList) {
          this.endOfList = callList.length < this.filterService.getListsize();
          if (append) {
            this.callList = this.callList.concat(callList);
          } else {
            this.callList = callList;
          }
        }
        this.pageChanged = true;
      });
  }

  public getList(url: string, queryParameters: QueryParameters): Observable<CallList[]> {
    return this.apiService.post(url, queryParameters).pipe(map((callList: CallList[]) => {
      return callList.map(this.addLocationInfo);
    }));
  }

  public filterChanged($event) {
    this.setPosition(0);
    this.loadList(false);
  }

  public loadMoreItems(): void {
    this.filterService.addOffset();
    this.loadList(true);
  }

  public clicked($event: any) {
    this.transform.setVariable('calllist', $event.data);
    this.call = null;
    if (this.listTemplate.toggle) {
      this.apiService.get(
        this.transform.URL(this.config.getEndpoint('getCallByCallListId').endpoint)).pipe(first()).subscribe((call: Call) => {
        this.transform.setVariable('call', call);
        this.call = call;
      });
    } else if (this.listTemplate.route) {
      this.navigationService.navigate([this.transform.URL(this.listTemplate.route)]);
    }
  }

  public getType(): string {
    return this.activatedRoute.snapshot.paramMap.get('type');
  }

  public onSearch(value): void {
    this.search = value.target.value;
    this.filterService.setSearch(value.target.value);
    this.loadList(false);
  }

  public setPosition($event) {
    if (this.tableContainer && this.tableContainer.nativeElement) {
      this.tableContainer.nativeElement.scrollTop = $event;
    }
  }

  private addLocationInfo(callList: CallList): CallList {
    if (!(callList)) {
      return callList;
    }

    if (!callList.street && !callList.number) {
      callList.location = '-';
      return callList;
    }

    if (!callList.postal) {
      callList.postal = '';
    }

    callList.location =
      `${callList.street} ${callList.number}, ${callList.postal} ${callList.city}`;
    return callList;
  }
}
