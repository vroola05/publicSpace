import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PageButtonCondition } from '../../../../../../../../../model/page-button-condition';
import { DropdownFieldComponent } from '../../../../../../../../fields/dropdown-field/dropdown-field.component';
import { TextareaFieldComponent } from '../../../../../../../../fields/textarea-field/textarea-field.component';

@Component({
  selector: 'app-create-condition',
  templateUrl: './create-condition.component.html',
  styleUrls: ['./create-condition.component.scss']
})
export class CreateConditionComponent implements OnInit {
  @ViewChild('fieldComponent') fieldComponent: DropdownFieldComponent;
  @ViewChild('operatorComponent') operatorComponent: DropdownFieldComponent;
  @ViewChild('valueComponent') valueComponent: TextareaFieldComponent;
  
  @Output() changed: EventEmitter<{action: string, index: number, condition: PageButtonCondition}> = new EventEmitter<{action: string, index: number, condition: PageButtonCondition}>();
  
  @Input() public index: number;
  
  @Input() public prefix: string = '';

  public _condition: PageButtonCondition;
  @Input() set condition(condition: PageButtonCondition) {
    this._condition = condition;
    this.selectCondition();
    this.selectField();
  }

  public _fields: { name: string, value?: string, data?: any }[] = [
    { name: 'call.id', value: '', data: 'call.id' },
    { name: 'call.description', value: '', data: 'call.description' },
    { name: 'call.dateCreated', value: '', data: 'call.dateCreated' },
    { name: 'call.casenumber', value: '', data: 'call.casenumber' },
    { name: 'call.status.id', value: '', data: 'call.status.id' },
    { name: 'call.status.name', value: '', data: 'call.status.name' },
    { name: 'call.person.name', value: '', data: 'call.person.name' },
    { name: 'call.person.email', value: '', data: 'call.person.email' },
    { name: 'call.person.phone', value: '', data: 'call.person.phone' },
    { name: 'call.person.street', value: '', data: 'call.person.street' },
    { name: 'call.person.postal', value: '', data: 'call.person.postal' },
    { name: 'call.person.city', value: '', data: 'call.person.city' },
    { name: 'call.mainCategory.name', value: '', data: 'call.mainCategory.name' },
    { name: 'call.mainCategory.category.name', value: '', data: 'call.mainCategory.category.name' },
    { name: 'order.status.id', value: '', data: 'order.status.id' },
    { name: 'order.status.name', value: '', data: 'order.status.name' },
    { name: 'tab', value: '', data: 'tab' },
  ];

  public _operators: { name: string, value?: string, data?: any }[] = [
    { name: 'Gelijk', value: 'eq', data: 'eq' },
    { name: 'Niet gelijk', value: 'neq', data: 'neq' },
    { name: 'Kleiner', value: 'lt', data: 'lt' },
    { name: 'Kleiner of gelijk', value: 'le', data: 'le' },
    { name: 'Groter', value: 'gt', data: 'gt' },
    { name: 'Groter of gelijk', value: 'ge', data: 'ge' }
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

  public getId(id: string): string {
    return !id || !this.prefix ? id : this.prefix + (id.charAt(0) !== '[' ? '.'+ id : id);
  }

  public selectField() {
    setTimeout(() => {
      if (this.fieldComponent) {
        if (!this._condition) {
          this.fieldComponent.select(null);
          return;
        }
        this.fieldComponent.select(this._fields.find( type => !type.data || type.data === this._condition.field));
      }  
    });

  }

  public selectCondition() {
    setTimeout(() => {
      if (this.operatorComponent) {
        if (!this._condition) {
          this.operatorComponent.select(null);
          return;
        }
        this.operatorComponent.select(this._operators.find( type => !type.data || type.data === this._condition.operator));
      }  
    });
  }

  public onFieldChanged($event) {
    this._condition.field = $event.data;
    this.changed.emit({action: 'changed', index: this.index, condition: this._condition});
  }

  public onOperatorChanged($event) {
    this._condition.operator = $event.data;
    this.changed.emit({action: 'changed', index: this.index, condition: this._condition});
  }
  
  public onValueChanged($event) {
    this._condition.value = $event;
    this.changed.emit({action: 'changed', index: this.index, condition: this._condition});
  }

  public onDeleteClick($event): void {
    this.changed.emit({action: 'delete', index: this.index, condition: this._condition});
  }  
}
