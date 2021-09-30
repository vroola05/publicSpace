import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageButtonCondition } from '../../../../../../../../../../model/page-button-condition';

@Component({
  selector: 'lib-create-conditions',
  templateUrl: './create-conditions.component.html',
  styleUrls: ['./create-conditions.component.scss']
})
export class CreateConditionsComponent implements OnInit {
  @Input() public conditions: PageButtonCondition[] = [];
  @Input() public prefix: string = '';

  @Output() changed: EventEmitter<{action: string, conditions: PageButtonCondition[]}> = new EventEmitter<{action: string, conditions: PageButtonCondition[]}>();
  
  constructor() { }

  ngOnInit(): void {
  }

  public getId(id: string): string {
    return !id || !this.prefix ? id : this.prefix + (id.charAt(0) !== '[' ? '.'+ id : id);
  }
  
  public onConditionChanged($event: {action: string, index: number, condition: PageButtonCondition}): void {
    switch($event.action) {
      case 'delete':
        this.conditions.splice($event.index, 1);
        break;
    }

    this.changed.emit({action: 'changed', conditions: this.conditions});
  }

  public onAddClick($event): void {
    if (!this.conditions) {
      this.conditions = [];
    }
    const condition = new PageButtonCondition();
    condition.field = '';
    condition.operator = 'eq';
    condition.value = '';
    this.conditions.push(condition);

    this.changed.emit({action: 'changed', conditions: this.conditions});
  }
}
