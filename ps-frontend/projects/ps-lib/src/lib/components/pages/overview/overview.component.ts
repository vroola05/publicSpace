import { Component, ComponentFactoryResolver, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Call } from '../../../../model/call';
import { DomainType } from '../../../../model/domain-type';
import { PageConfig } from '../../../../model/domain-type-config';
import { DynamicListPanel, PageLayoutType } from '../../../../model/intefaces';
import { Page } from '../../../../model/page';
import { PageOverviewTemplate } from '../../../../model/page-overview-template';
import { QueryParameters } from '../../../../model/query-parameters';
import { HeaderMenuItemT, ListTemplateT } from '../../../../model/template';
import { DynamicDirective } from '../../../directives/dynamic.directive';
import { ActionService } from '../../../services/action/action.service';
import { AuthorisationService } from '../../../services/authorisation/authorisation.service';
import { ConfigService, PageTypes } from '../../../services/config/config.service';
import { EndpointService } from '../../../services/endpoint/endpoint.service';
import { FilterService } from '../../../services/filter/filter.service';
import { NavigationService } from '../../../services/navigation/navigation.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { StorageService } from '../../../services/storage/storage.service';
import { TransformService } from '../../../services/transform/transform.service';
import { PageAbstract } from '../page';

@Component({
  selector: 'lib-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent extends PageAbstract implements OnInit, OnDestroy {
  @ViewChild(DynamicDirective, {static: true}) private dynamicHost!: DynamicDirective;
  
  @ViewChild('tableContainer') public tableContainer: ElementRef;
  @ViewChild('headerRef') public headerRef: ElementRef;
  
  public pageLayoutType: PageLayoutType = PageLayoutType.overview;
  public title = '';
  public page: Page;
  public pageOverviewTemplate: PageOverviewTemplate;
  private id: number;
  private subscriptions: Subscription[] = [];

  public list = [];
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
    protected config: ConfigService,
    private filterService: FilterService,
    private notification: NotificationService,
    private endpoints: EndpointService
  ) {
    super(router, activatedRoute, navigationService, storage, action, transform, authorisation, config);

    this.page = this.config.getPage(PageTypes.overview);
    this.pageConfig = this.page.pageConfig;

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

  public clearComponent() {
    this.dynamicHost.viewContainerRef.clear();
  }

  private loadComponent(viewContainerRef: ViewContainerRef, dynamicPanel: any) {
    if (!viewContainerRef || !dynamicPanel) {
      return;
    }
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<DynamicListPanel>(dynamicPanel);
    componentRef.instance.template = this.listTemplate;
    componentRef.instance.call = this.call;
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
    
    this.endpoints.post(this.pageConfig.getEndpoint('list'), queryParameters).then((list) => {
      if (list) {
        this.endOfList = list.length < this.filterService.getListsize();
        if (append) {
          this.list = this.list.concat(list);
        } else {
          this.list = list;
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
    this.transform.setVariable('list', $event.data);
    this.call = null;
    if (this.listTemplate.toggle) {
      if ($event.opened) {
        this.endpoints.get(this.pageConfig.getEndpoint('toggle')).then((call: Call) => {
          this.transform.setVariable('call', call);
          this.call = call;
          this.loadComponent(this.dynamicHost.viewContainerRef, this.pageConfig.getComponent('listPanel'));
        });
      } else {
        this.clearComponent();
      }
    } else if (this.listTemplate.route) {
      this.clearComponent();

      this.navigationService.navigate([this.transform.URL(this.listTemplate.route)]);
    } else {
      this.clearComponent();
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
