import { Component, OnInit, ViewChild } from '@angular/core';

import { ApiService } from '../../../../services/api/api.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { ConfigService } from '../../../../services/domain/domain.service';
import { TransformService } from '../../../../services/transform/transform.service';
import { ListTemplateT } from '../../../../../model/template';
import { first } from 'rxjs/operators';
import { MainCategory } from '../../../../../model/main-category';
import { DropdownFieldComponent } from '../../../fields/dropdown-field/dropdown-field.component';
import { Category } from '../../../../../model/category';

@Component({
  selector: 'lib-panel-settings-category',
  templateUrl: './panel-settings-category.component.html',
  styleUrls: ['./panel-settings-category.component.scss']
})
export class PanelSettingsCategoryComponent implements OnInit {
  @ViewChild('mainCategoryComponent') public mainCategoryComponent: DropdownFieldComponent;
  
  public mainCategoryItems: { name: string, value?: string, data?: any }[] = [];

  public categories: Category[];
  public selectedMainCategory: MainCategory;
  public selectedCategory: Category;

  public data: any[] = [];
  public listTemplate: ListTemplateT;
  public isNew = false;
  public open = false;

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
          css: 'col-sm-12 col-md-6 col-lg-6'
        },
        {
          id: 'startDate',
          name: 'Startdatum',
          type: 'date',
          css: 'col-sm-12 col-md-2 col-lg-2'
        },
        {
          id: 'endDate',
          name: 'Einddatum',
          type: 'date',
          css: 'col-sm-12 col-md-2 col-lg-2'
        },
        {
          id: 'active',
          name: 'Actief',
          type: 'boolean',
          css: 'col-sm-12 col-md-1 col-lg-1'
        }
      ]
    };
  }

  public ngOnInit(): void {
    this.getMainCategories();
  }

  public hasMainCategory(): boolean {
    return this.selectedMainCategory != null;
  }

  public getMainCategories(): void {
    const endpointT = this.config.getEndpoint('getMainCategories');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      this.apiService.get(this.transform.URL(endpointT.endpoint)).pipe(first()).subscribe((mainCategories: MainCategory[]) => {
        mainCategories.forEach(mainCategory => {
          this.mainCategoryItems.push({ name: mainCategory.name, value: String(mainCategory.id), data: mainCategory });
        });
      });
    }
  }

  public getCategories(): void {
    const endpointT = this.config.getEndpoint('getCategoriesFull');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      this.apiService.get(this.transform.URL(endpointT.endpoint)).pipe(first()).subscribe((categories: Category[]) => {
        this.categories = categories;

        let data = [];
        categories.forEach(category => {
          data.push({
            id: category.id,
            name: category.name,
            startDate: category.startDate,
            endDate: category.endDate,
            active: category.active
          });
        });
        this.data = data;
      });
    }
  }

  public onMainCategoryChanged($event): void {
    this.transform.setVariable('mainCategory', $event.data);
    this.selectedMainCategory = $event.data;

    this.selectedCategory = null;
    this.data = [];
    this.isNew = false;
    this.open = false;

    this.getCategories();
  }

  public createNew(): void {
    this.selectedCategory = new Category();
    this.selectedCategory.name = '';
    this.selectedCategory.active = false;
    this.selectedCategory.startDate = null;
    this.selectedCategory.endDate = null;
  }

  public events($event): void {
    if ($event.action === 'create') {
      this.createNew();
      this.isNew = true;
      this.open = true;
    } else if ($event.action === 'toggle') {
      this.selectedCategory = this.categories[$event.data.index];
      this.isNew = false;
      this.open = true;
    } else if ($event.action === 'save') {
      this.open = false;
      this.getCategories();
    } else if ($event.action === 'cancel') {
      this.open = false;
    }
  }
}
