import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../../../services/api/api.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { ConfigService } from '../../../../services/config/config.service';
import { TransformService } from '../../../../services/transform/transform.service';
import { ListTemplateT } from '../../../../../model/template';
import { Group } from '../../../../../model/group';
import { first } from 'rxjs/operators';
import { Page } from '../../../../../model/page';
import { PageType } from '../../../../../model/page-type';

@Component({
  selector: 'lib-panel-settings-pages',
  templateUrl: './panel-settings-pages.component.html',
  styleUrls: ['./panel-settings-pages.component.scss']
})
export class PanelSettingsPagesComponent implements OnInit {
  public pages: Page[];

  public data: any[] = [];
  public listTemplate: ListTemplateT;
  public isNew = false;
  public open = false;

  public selectedPage: Page;

  constructor(
    private apiService: ApiService,
    private config: ConfigService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) {

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
          id: 'type',
          name: 'Type',
          type: 'string',
          css: 'col-sm-12 col-md-2 col-lg-2'
        },
        {
          id: 'name',
          name: 'Naam',
          type: 'string',
          css: 'col-sm-12 col-md-9 col-lg-9'
        }
      ]
    };
  }

  public ngOnInit(): void {
    this.getPages();
  }

  public getPages(): void {
    const endpointT = this.config.getEndpoint('getPages');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      this.apiService.get(this.transform.URL(endpointT.endpoint)).pipe(first()).subscribe((pages: Page[]) => {
        this.pages = pages;
        this.addListPages(pages);
      });
    }
  }

  public addListPages(pages: Page[]) {
    let data = [];
    pages.forEach(page => {
      data.push({
        id: page.id,
        type: page.pageType.name,
        name: page.name
      });
    });
    this.data = data;
  }

  public createNewGroup(): void {
    this.selectedPage = new Page();
    this.selectedPage.name = '';
  }

  public events($event): void {
    if ($event.action === 'create') {
      this.createNewGroup();
      this.isNew = true;
      this.open = true;
    } else if ($event.action === 'toggle') {
      this.selectedPage = this.pages[$event.data.index];
      this.isNew = false;
      this.open = true;
    } else if ($event.action === 'save') {
      this.open = false;
      this.getPages();
    } else if ($event.action === 'cancel') {
      this.open = false;
    }
  }
}
