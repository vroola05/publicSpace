import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DropdownFieldComponent } from '../../../fields/dropdown-field/dropdown-field.component';
import { TextareaFieldComponent } from '../../../fields/textarea-field/textarea-field.component';
import { ConfigService } from '../../../../services/config/config.service';
import { ApiService } from '../../../../services/api/api.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { Category } from '../../../../../model/category';
import { Call } from '../../../../../model/call';
import { MainCategory } from '../../../../../model/main-category';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { first } from 'rxjs/operators';
import { TransformService } from '../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { Environment } from '../../../../../model/intefaces';


@Component({
  selector: 'lib-panel-new-information',
  templateUrl: './panel-new-information.component.html',
  styleUrls: ['./panel-new-information.component.scss']
})
export class PanelNewInformationComponent implements OnInit, OnDestroy {
  @ViewChild('mainCategorieComponent') mainCategorieComponent: DropdownFieldComponent;
  @ViewChild('categoryComponent') categoryComponent: DropdownFieldComponent;
  @ViewChild('descriptionComponent') descriptionComponent: TextareaFieldComponent;

  public call: Call;
  private categorySet = false;

  constructor(
    private apiService: ApiService,
    private config: ConfigService,
    protected transform: TransformService,
    protected authorisation: AuthorisationService,
    private navigationService: NavigationService,
    private storage: StorageService
  ) {
    this.getCall();
  }

  public ngOnInit(): void {
    this.transform.setVariable('environment', { company: this.authorisation.user.company, domain: this.authorisation.user.domain });
    this.apiService.get(this.transform.URL(this.config.getEndpoint('getMainCategories').endpoint))
      .pipe(first()).subscribe((mainCategories: MainCategory[]) => {
        if (mainCategories && mainCategories.length > 0) {
          const items = [];
          mainCategories.forEach(category => {
            items.push({name: category.name, value: '' + category.id, data: category});
          });
          this.mainCategorieComponent.setItems(items);
          
          if (this.call.mainCategory) {
            this.mainCategorieComponent.select(this.mainCategorieComponent.options.find(option => option.value === '' + this.call.mainCategory.id));
          } else {
            this.categorySet = true;
          }
        }
      });
  }

  public ngOnDestroy(): void {
  }

  public getCall(): void {
    const call = this.storage.getSession('call');
    if (call) {
      this.call = JSON.parse(call) as Call;
    } else {
      this.call =  new Call();
    }
  }

  public storeMainCategory(mainCategory: MainCategory) {
    this.getCall();
    this.call.mainCategory = mainCategory;
    this.storage.setSession('call', JSON.stringify(this.call), true);
  }

  public storeCategory(category: Category) {
    this.getCall();
    if (this.call.mainCategory) {
      this.call.mainCategory.category = category;
      this.storage.setSession('call', JSON.stringify(this.call), true);
    }
  }

  public storeDescription(description: string) {
    this.getCall();
    this.call.description = description;
    this.storage.setSession('call', JSON.stringify(this.call), true);
  }

  public onMainCategoryChanged($event) {
    this.categoryComponent.clear();
    if (this.categorySet) {
      this.storeCategory(null);
    }

    if ($event && $event.data) {
      this.storeMainCategory($event.data);
      this.mainCategorieComponent.validate();
      this.transform.setVariable('mainCategory', this.call.mainCategory);


      this.apiService.get(
        this.transform.URL(this.config.getEndpoint('getCategories').endpoint))
        .pipe(first()).subscribe((categories: Category[]) => {
          if (categories && categories.length > 0) {
            const items = [];
            categories.forEach(category => {
              items.push({name: category.name, value: '' + category.id, data: category});
            });
            this.categoryComponent.setItems(items);

            if (!this.categorySet) {
                if (this.call.mainCategory && this.call.mainCategory.category) {
                  this.categoryComponent.select(this.categoryComponent.options.find(option => option.value === '' + this.call.mainCategory.category.id));
                }
            }
            this.categorySet = true;
          }
        });
    }
  }

  public onCategoryChanged($event) {
    if (this.categoryComponent.validate()) {
      if ($event && $event.data) {
        this.storeCategory($event.data);
      }
    }
  }

  public onDescriptionChanged($event) {
    if (this.descriptionComponent.validate()) {
      this.storeDescription($event);
    }
  }

  public validate(): boolean {
    const a = this.mainCategorieComponent.validate();
    const b = this.categoryComponent.validate();
    const c = this.descriptionComponent.validate();
    return a && b && c;
  }
}
