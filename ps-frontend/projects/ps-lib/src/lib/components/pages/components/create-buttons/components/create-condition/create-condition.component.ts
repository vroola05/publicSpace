import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PageButtonCondition } from '../../../../../../../model/page-button-condition';
import { DropdownFieldComponent } from '../../../../../fields/dropdown-field/dropdown-field.component';
import { TextareaFieldComponent } from '../../../../../fields/textarea-field/textarea-field.component';

@Component({
  selector: 'lib-create-condition',
  templateUrl: './create-condition.component.html',
  styleUrls: ['./create-condition.component.scss']
})
export class CreateConditionComponent implements OnInit {
  @ViewChild('fieldComponent') fieldComponent: TextareaFieldComponent;
  @ViewChild('operatorComponent') operatorComponent: DropdownFieldComponent;
  @ViewChild('valueComponent') valueComponent: TextareaFieldComponent;
  
  @Output() changed: EventEmitter<{action: string, index: number, condition: PageButtonCondition}> = new EventEmitter<{action: string, index: number, condition: PageButtonCondition}>();
  
  @Input() public index: number;

  public _condition: PageButtonCondition;
  @Input() set condition(condition: PageButtonCondition) {
    this._condition = condition;
  }

  public _operators: { name: string, value?: string, data?: any }[] = [
    { name: 'Gelijk', value: 'eq', data: 'eq' },
    { name: 'Niet gelijk', value: 'neq', data: 'neq' },
    { name: 'Kleiner', value: 'lt', data: 'lt' },
    { name: 'Kleiner of gelijk', value: 'le', data: 'le' },
    { name: 'Groter', value: 'gt', data: 'gt' },
    { name: 'Groter of gelijk', value: 'ge', data: 'ge' },
  ];
  //'eq' | 'neq' | 'lt' | 'le' | 'gt' | 'ge'
  constructor() { }

  ngOnInit(): void {
  }

  public onFieldChanged($event) {
    this._condition.field = $event;
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

  public onDeleteClick(button): void {
    this.changed.emit({action: 'delete', index: this.index, condition: this._condition});
  }  
}
