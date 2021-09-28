import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../../../services/api/api.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { ConfigService } from '../../../../services/config/config.service';
import { TransformService } from '../../../../services/transform/transform.service';
import { ListTemplateT } from '../../../../../model/template';
import { first } from 'rxjs/operators';
import { MainCategory } from '../../../../../model/main-category';

@Component({
  selector: 'lib-panel-settings-main-category',
  templateUrl: './panel-settings-main-category.component.html',
  styleUrls: ['./panel-settings-main-category.component.scss']
})
export class PanelSettingsMainCategoryComponent implements OnInit {
  public mainCategories: MainCategory[];

  public data: any[] = [];
  public listTemplate: ListTemplateT;
  public isNew = false;
  public open = false;

  public selectedMainCategory: MainCategory;

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
          id: 'name',
          name: 'Naam',
          type: 'string',
          css: 'col-sm-12 col-md-11 col-lg-11'
        }
      ]
    };
  }

  public ngOnInit(): void {
    this.getMainCategories();
  }

  public getMainCategories(): void {
    const endpointT = this.config.getEndpoint('getMainCategories');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      this.apiService.get(this.transform.URL(endpointT.endpoint)).pipe(first()).subscribe((mainCategories: MainCategory[]) => {
        this.mainCategories = mainCategories;
        this.addListMainCategories(mainCategories);
      });
    }
  }

  public addListMainCategories(mainCategories: MainCategory[]) {
    let data = [];
    mainCategories.forEach(mainCategory => {
      data.push({
        id: mainCategory.id,
        name: mainCategory.name
      });
    });
    this.data = data;
  }

  public createNew(): void {
    this.selectedMainCategory = new MainCategory();
    this.selectedMainCategory.name = '';
  }

  public events($event): void {
    if ($event.action === 'create') {
      this.createNew();
      this.isNew = true;
      this.open = true;
    } else if ($event.action === 'toggle') {
      this.selectedMainCategory = this.mainCategories[$event.data.index]
      this.isNew = false;
      this.open = true;
    } else if ($event.action === 'save') {
      this.open = false;
      this.getMainCategories();
    } else if ($event.action === 'cancel') {
      this.open = false;
    }
  }
}
