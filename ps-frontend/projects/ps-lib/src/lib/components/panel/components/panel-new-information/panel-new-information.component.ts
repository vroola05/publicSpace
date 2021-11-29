import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DropdownFieldComponent } from '../../../fields/dropdown-field/dropdown-field.component';
import { TextareaFieldComponent } from '../../../fields/textarea-field/textarea-field.component';
import { StorageService } from '../../../../services/storage/storage.service';
import { Category } from '../../../../../model/category';
import { Call } from '../../../../../model/call';
import { MainCategory } from '../../../../../model/main-category';
import { TransformService } from '../../../../services/transform/transform.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { EndpointService } from '../../../../services/endpoint/endpoint.service';


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
  public initialCall: Call;
  private initMainCategory = false;
  private initCategory = false;

  constructor(
    private endpoints: EndpointService,
    protected transform: TransformService,
    protected authorisation: AuthorisationService,
    private storage: StorageService
  ) {
    this.initialCall = this.getCall();
    if (this.initialCall.mainCategory && this.initialCall.mainCategory.id) {
      this.initMainCategory = true;
      if (this.initialCall.mainCategory.category && this.initialCall.mainCategory.category.id) {
        this.initCategory = true;
      }
    }
  }

  public ngOnInit(): void {
    this.transform.setVariable('environment', { company: this.authorisation.user.company, domain: this.authorisation.user.domain });

    this.endpoints.get('getMainCategories').then((mainCategories: MainCategory[]) => {
      if (mainCategories && mainCategories.length > 0) {
        const items = [];
        mainCategories.forEach(category => {
          items.push({name: category.name, value: '' + category.id, data: category});
        });
        this.mainCategorieComponent.setItems(items);

        if (this.initMainCategory) {
          this.mainCategorieComponent.select(this.mainCategorieComponent.options.find(option => option.value === '' + this.initialCall.mainCategory.id));
          this.initMainCategory = false;
        }
      }
    });
  }

  public ngOnDestroy(): void {
  }

  public getCall(): Call {
    const call = this.storage.getSession('call');
    if (call) {
      this.call = JSON.parse(call) as Call;
    } else {
      this.call =  new Call();
    }
    return this.call;
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
    if (!this.initCategory) {
      this.storeCategory(null);
    }

    if ($event && $event.data) {
      this.storeMainCategory($event.data);
      this.mainCategorieComponent.validate();
      this.transform.setVariable('mainCategory', this.call.mainCategory);

      this.endpoints.get('getCategories').then((categories: Category[]) => {
        if (categories && categories.length > 0) {
          const items = [];
          categories.forEach(category => {
            items.push({name: category.name, value: '' + category.id, data: category});
          });
          this.categoryComponent.setItems(items);

          if (this.initCategory) {
            this.categoryComponent.select(this.categoryComponent.options.find(option => option.value === '' + this.initialCall.mainCategory.category.id));
            this.initCategory = false;
          }
          
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
