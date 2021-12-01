import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import { EndpointService } from '../../../../../../../services/endpoint/endpoint.service';
import { AuthorisationService } from '../../../../../../../services/authorisation/authorisation.service';
import { TransformService } from '../../../../../../../services/transform/transform.service';

import { MainCategory } from '../../../../../../../../model/main-category';
import { Category } from '../../../../../../../../model/category';

import { TextFieldComponent } from '../../../../../../fields/text-field/text-field.component';
import { DateFieldComponent } from '../../../../../../fields/date-field/date-field.component';
import { DropdownFieldComponent } from '../../../../../../fields/dropdown-field/dropdown-field.component';
import { Group } from 'projects/ps-lib/src/model/group';

@Component({
  selector: 'lib-list-panel-category',
  templateUrl: './list-panel-category.component.html',
  styleUrls: ['./list-panel-category.component.scss']
})
export class ListPanelCategoryComponent implements OnInit, OnDestroy {
  @ViewChild('nameComponent') nameComponent: TextFieldComponent;
  @ViewChild('startDateComponent') startDateComponent: DateFieldComponent;
  @ViewChild('endDateComponent') endDateComponent: DateFieldComponent;
  @ViewChild('groupComponent') groupComponent: DropdownFieldComponent;

  @Output() onEvent: EventEmitter<{ action: string, isNew: boolean, data: any }> = new EventEmitter();

  @Input() isNew = true;

  public delete = false;

  public _mainCategory: MainCategory;
  @Input() set mainCategory(mainCategory: MainCategory) {
    this.transform.setVariable('mainCategory', mainCategory);
    this._mainCategory = mainCategory;
  }

  public _category: Category;
  @Input() set category(category: Category){
    this.delete = false;
    this._category = new Category();
    if (category) {
      this._category.id = category.id;
      this._category.name = category.name;
      this._category.startDate = category.startDate;
      this._category.endDate = category.endDate;
      this._category.active = category.active;
      this._category.group = category.group;
      this.selectGroup();
    }
  }
  
  public groupItems: { name: string, value?: string, data?: any }[] = [];

  constructor(
    private endpoints: EndpointService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) {
    this.getGroups();
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.transform.deleteVariable('mainCategory');
    this.transform.deleteVariable('category');
  }

  public onNameChanged($event) {
    if (this.nameComponent.validate()) {
      this._category.name = $event;
    }
  }

  public onStartDateChanged(value): void {
    if (this.startDateComponent.validate()) {
      this._category.startDate = new Date(value);
    }
  }

  public onEndDateChanged(value): void {
    if (this.endDateComponent.validate()) {
      this._category.endDate = new Date(value);
    }
  }

  public onActiveChanged($event): void {
    this._category.active = $event;
  }

  public onGroupChanged($event) {
    if (this.groupComponent.validate()) {
      this._category.group = $event.data;
    }
  }


  public selectGroup() {
    if ( this.groupComponent) {
      if (!this._category || !this._category.group) {
        this.groupComponent.select(null);
        return;
      }
      this.groupComponent.select(this.groupItems.find( type => !type.data || type.data.id === this._category.group.id));
    }
  }

  public getGroups(): void {
    this.endpoints.get('getGroups').then((groups: Group[]) => {
      groups.forEach(group => {
        this.groupItems.push({ name: group.name, value: String(group.id), data: group });
      });
      this.selectGroup();
    });
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
    const a = this.nameComponent.validate();
    const b = this.startDateComponent.validate();
    const c = this.endDateComponent.validate();
    const d = this.groupComponent.validate();

    if (a && b && c && d) {
      console.log('this._category', this._category)
      this.transform.setVariable('category', this._category);
      if (this.isNew) {
        this.post(this._category);
      } else {
        this.put(this._category);
      }
    }
  }

  public post(category: Category): void {
    this.endpoints.post('postCategory', category).then((d: Category) => {
      this.onEvent.emit({
        action: 'save',
        isNew: this.isNew,
        data: null
      });
    })
    .catch(response => {
      this.setErrors(response);
    });
  }

  public put(category: Category): void {
    this.endpoints.put('putCategory', category).then((d: Category) => {
      this.onEvent.emit({
        action: 'save',
        isNew: this.isNew,
        data: null
      });
    })
    .catch(response => {
      this.setErrors(response);
    });
  }

  public setErrors(response: any): void {
    if(response && response.error && response.error.errors) {
      const errors = response.error.errors as {field: string, value: string}[];
      errors.forEach(error => {
        switch(error.field) {
          case 'name':
            this.nameComponent.addError(error.value);
            break;
          case 'startDate':
            this.startDateComponent.addError(error.value);
            break;
          case 'endDate':
            this.endDateComponent.addError(error.value);
            break;
        }
      });
    }
  }
}
