import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { CallList } from '../../../../model/call-list';
import { HeaderMenuItemT, ListTemplateT } from '../../../../model/template';
import { PageLayoutType } from '../../../../model/intefaces';
import { Call } from '../../../../model/call';
import { PageOverviewTemplate } from '../../../../model/page-overview-template';

import { Page } from '../../../../model/page';
import { QueryParameters } from '../../../../model/query-parameters';
import { PageAbstract } from '../page';

import { ConfigService, PageTypes } from '../../../services/config/config.service';
import { NavigationService } from '../../../services/navigation/navigation.service';
import { FilterService } from '../../../services/filter/filter.service';
import { StorageService } from '../../../services/storage/storage.service';
import { ActionService } from '../../../services/action/action.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { TransformService } from '../../../services/transform/transform.service';
import { AuthorisationService } from '../../../services/authorisation/authorisation.service';
import { EndpointService } from '../../../services/endpoint/endpoint.service';

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
  public pageOverviewTemplate: PageOverviewTemplate;
  private id: number;
  private subscriptions: Subscription[] = [];

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
    private endpoints: EndpointService
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation);

    this.page = this.config.getPage(PageTypes.overview);
    
    this.search = this.filterService.getSearch();
  }

  public ngOnInit(): void {
    super.ngOnInit();

    this.setListTemplate(Number(this.activatedRoute.snapshot.paramMap.get('id')));

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

        this.setListTemplate(Number(this.activatedRoute.snapshot.paramMap.get('id')));

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

  public setListTemplate(id: number): void {
    this.id = id;
    this.pageOverviewTemplate = this.page.pageOverviewTemplate.find(pageOverviewTemplate => pageOverviewTemplate.id === this.id);

    this.filterService.setListsize(this.pageOverviewTemplate.size ? this.pageOverviewTemplate.size : 50);

    this.listTemplate = {
      id: String(this.pageOverviewTemplate.id),
      toggle: this.pageOverviewTemplate.toggle,
      route: this.pageOverviewTemplate.route,
      buttonsLeft: this.pageOverviewTemplate.buttonsLeft,
      buttonsRight: this.pageOverviewTemplate.buttonsRight,
      priority: this.pageOverviewTemplate.priority,
      notification: '',
      columns: this.pageOverviewTemplate.columns
    }
  }

  public setMenu(append: boolean, headerMenuItem: HeaderMenuItemT): void {
    if (!headerMenuItem)
      return;

    this.navigationService.headerItem = headerMenuItem;
    this.navigationService.title = headerMenuItem.name;
    this.title = 'Zoek in (' + headerMenuItem.name + ')';
    this.getList(append, this.filterService.getQueryParameters());
  }

  public getList(append: boolean, queryParameters: QueryParameters): void {
    this.endpoints.post('getCallList', queryParameters).then((callList: CallList[]) => {
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
      this.endpoints.get('getCallByCallListId').then((call: Call) => {
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
}
