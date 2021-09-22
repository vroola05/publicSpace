import { Component, Input, OnInit } from '@angular/core';
import { Page } from '../../../../../model/page';
import { PageOverviewTemplate } from '../../../../../model/page-overview-template';
import { ListTemplateT } from '../../../../../model/template';

@Component({
  selector: 'lib-panel-page-overview',
  templateUrl: './panel-page-overview.component.html',
  styleUrls: ['./panel-page-overview.component.scss']
})
export class PanelPageOverviewComponent implements OnInit {

  public _page: Page;
  @Input() set page( page: Page) {
    this._page = page;
    this.addListPageOverviewTemplate(this._page.pageOverviewTemplate);
  }

  public data: any[] = [];
  public listTemplate: ListTemplateT;
  public isNew = false;
  public open = false;
  public selectedPageOverviewTemplate: PageOverviewTemplate;
  

  constructor() {
    this.listTemplate = {
      toggle: true,
      columns: [
        {
          id: 'id',
          name: 'Id',
          type: 'number',
          css: 'col-sm-12 col-md-1 col-lg-1 bold'
        },
        {
          id: 'name',
          name: 'Naam',
          type: 'string',
          css: 'col-sm-12 col-md-4 col-lg-4'
        },
        {
          id: 'route',
          name: 'Route',
          type: 'string',
          css: 'col-sm-12 col-md-7 col-lg-7'
        }
      ]
    };
  }

  ngOnInit(): void {
  }

  public addListPageOverviewTemplate(pageOverviewTemplates: PageOverviewTemplate[]) {
    let data = [];
    if (pageOverviewTemplates) {
      pageOverviewTemplates.forEach(pageOverviewTemplate => {
        data.push({
          id: pageOverviewTemplate.id,
          name: pageOverviewTemplate.name,
          route: pageOverviewTemplate.route
        });
      });
    }
    this.data = data;
  }

  public createNewPageOverviewTemplate(): void {
    this.selectedPageOverviewTemplate = new PageOverviewTemplate();
    this.selectedPageOverviewTemplate.name = 'lala';
    this.selectedPageOverviewTemplate.route = '';
    this.selectedPageOverviewTemplate.toggle = false;
    this.selectedPageOverviewTemplate.priority = true;
    console.log('b', this.selectedPageOverviewTemplate);
  }

  public events($event): void {
    
    if ($event.action === 'create') {
      
      this.createNewPageOverviewTemplate();
      this.isNew = true;
      this.open = true;
      
    } else if ($event.action === 'changed') {
      console.log(this.selectedPageOverviewTemplate);
      console.log($event.data);
    } else if ($event.action === 'toggle') {
      const d = this._page.pageOverviewTemplate.find(pageOverviewTemplate => { return pageOverviewTemplate.id === $event.data.id});
      this.selectedPageOverviewTemplate = d;
      this.isNew = false;
      this.open = true;
    } else if ($event.action === 'save') {
      this.open = false;
    } else if ($event.action === 'cancel') {
      this.open = false;
    }
  }
}
