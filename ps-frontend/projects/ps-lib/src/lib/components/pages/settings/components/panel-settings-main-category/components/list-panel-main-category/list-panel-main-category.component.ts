import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { ApiService } from '../../../../../../../services/api/api.service';
import { AuthorisationService } from '../../../../../../../services/authorisation/authorisation.service';
import { ConfigService } from '../../../../../../../services/config/config.service';
import { TransformService } from '../../../../../../../services/transform/transform.service';

import { MainCategory } from '../../../../../../../../model/main-category';

import { TextareaFieldComponent } from '../../../../../../fields/textarea-field/textarea-field.component';

@Component({
  selector: 'lib-list-panel-main-category',
  templateUrl: './list-panel-main-category.component.html',
  styleUrls: ['./list-panel-main-category.component.scss']
})
export class ListPanelMainCategoryComponent implements OnInit {
  @ViewChild('mainCategoryComponent') mainCategoryComponent: TextareaFieldComponent;
  
  @Output() onEvent: EventEmitter<{ action: string, isNew: boolean, data: any }> = new EventEmitter();

  @Input() isNew = true;

  public delete = false;

  public _mainCategory: MainCategory;
  @Input() set mainCategory(mainCategory: MainCategory){
    this.delete = false;
    this._mainCategory = new MainCategory();
    if (mainCategory) {
      this._mainCategory.id = mainCategory.id;
      this._mainCategory.name = mainCategory.name;
    }
  }
  
  constructor(
    private apiService: ApiService,
    private config: ConfigService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) { }

  public ngOnInit(): void {
  }

  public onMainCategoryChanged($event) {
    if (this.mainCategoryComponent.validate()) {
      this._mainCategory.name = $event;
    }
  }

  public cancel(): void {
    this.onEvent.emit({
      action: 'cancel',
      isNew: this.isNew,
      data: null
    });
  }

  public onDeleteChanged($event): void {
    this.delete = $event;
  }

  public onSave($event): void {
    const a = this.mainCategoryComponent.validate();
    if (a) {
      if (this.isNew) {
        this.postGroup(this._mainCategory);
      } else {
        this.putGroup(this._mainCategory);
      }
    }
  }

  public postGroup(mainCategory: MainCategory): void {
    const endpointT = this.config.getEndpoint('postMainCategory');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      let url = this.transform.URL(endpointT.endpoint);
      this.apiService.post(url, mainCategory).subscribe((d: MainCategory) => {
        this.onEvent.emit({
          action: 'save',
          isNew: this.isNew,
          data: null
        });
      },
      (response) => {
        this.setErrors(response);
      });
    }
  }

  public putGroup(mainCategory: MainCategory): void {
    const endpointT = this.config.getEndpoint('putMainCategory');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      this.transform.setVariable('mainCategory', mainCategory);
      let url = this.transform.URL(endpointT.endpoint);
      this.transform.deleteVariable('mainCategory');
      this.apiService.put(url, mainCategory).subscribe((d: MainCategory) => {
        this.onEvent.emit({
          action: 'save',
          isNew: this.isNew,
          data: null
        });
      },
      (response) => {
        this.setErrors(response);
      });
    }
  }

  public setErrors(response: any): void {
    if(response && response.error && response.error.errors) {
      const errors = response.error.errors as {field: string, value: string}[];
      errors.forEach(error => {
        switch(error.field) {
          case 'name':
            this.mainCategoryComponent.addError(error.value);
            break;
        }
      });
    }
  }
}
