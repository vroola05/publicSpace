import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { TextareaFieldComponent } from '../../../../../fields/textarea-field/textarea-field.component';
import { DropdownFieldComponent } from '../../../../../fields/dropdown-field/dropdown-field.component';

import { PageButton } from '../../../../../../../model/page-button';

@Component({
  selector: 'lib-create-button',
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.scss']
})
export class CreateButtonComponent implements OnInit {
  @ViewChild('buttonNameComponent') buttonNameComponent: TextareaFieldComponent;
  @ViewChild('buttonRouteComponent') buttonRouteComponent: TextareaFieldComponent;
  @ViewChild('buttonTypeComponent') buttonTypeComponent: DropdownFieldComponent;

  @Output() changed: EventEmitter<{action: string, index: number, button: PageButton}> = new EventEmitter<{action: string, index: number, button: PageButton}>();
  
  @Input() public index: number;

  public _button: PageButton;
  @Input() set button(button: PageButton) {
    this._button = button;
    this.selectButtonType();
    this.selectRoles();
  }

  public _buttonTypeItems: { name: string, value?: string, data?: any }[] = [];
  @Input() set buttonTypeItems(buttonTypeItems: { name: string, value?: string, data?: any }[]) {
    this._buttonTypeItems = [];
    buttonTypeItems.forEach(buttonTypeItem => {
    this._buttonTypeItems.push({ name: buttonTypeItem.name, value: buttonTypeItem.value, data: buttonTypeItem.data });
    });
    this.selectButtonType();
  }

  public _roleItems: { name: string, value?: string, selected?: boolean, data?: any }[] = [];
  @Input() set roleItems(roleItems: { name: string, value?: string, selected?: boolean, data?: any }[]) {
    this._roleItems = [];
    roleItems.forEach(roleItem => {
      this._roleItems.push({ name: roleItem.name, value: roleItem.value, selected: roleItem.selected, data: roleItem.data });
    });
    this.selectRoles();
  }
  

  constructor() { }

  ngOnInit(): void {
  }

  public selectButtonType() {
    setTimeout(() => {
      if (this.buttonTypeComponent) {
        if (!this._button) {
          this.buttonTypeComponent.select(null);
          return;
        }
      
        const item = this._buttonTypeItems.find( type => !type.data || type.data === this._button.type);
        if (item) {
          this.buttonTypeComponent.select(item);
        }
      }  
    });

  }

  public selectRoles() {
    setTimeout(() => {
    if (this._button.roles) {
      this._roleItems.forEach(roleItem => {
        roleItem.selected = this.hasRole(roleItem.data.id);
      });
    }
  });
  }

  public onButtonNameChanged($event) {
    this._button.name = $event;
    this.changed.emit({action: 'changed', index: this.index, button: this._button});
  }

  public onButtonTypeChanged($event) {
    this._button.type = $event.data;
    this.changed.emit({action: 'changed', index: this.index, button: this._button});
  }
  
  public onButtonRouteChanged($event) {
    this._button.route = $event;
    this.changed.emit({action: 'changed', index: this.index, button: this._button});
  }

  public onRolesChanged($event): void {
    if ($event.checked) {
      if (!this.hasRole($event.data.data.id)) {
        this._button.roles.push($event.data.data);
      }
    } else {
      const role = this._button.roles.find(r => r.id === $event.data.data.id);
      const index = this._button.roles.indexOf(role);
      if (index >= 0) {
        this._button.roles.splice(index, 1);
      }
    }
    this.changed.emit({action: 'changed', index: this.index, button: this._button});
  }
  public onConditionsChanged($event): void {
    if ($event.action === 'changed') {
      this._button.conditions = $event.conditions;
    }
    this.changed.emit({action: 'changed', index: this.index, button: this._button});
  }
  
  public hasRole(id: number): boolean {
    const item = this._button.roles.find(r => r.id === id);
    if (item) {
      return true;
    }
    return false;
  }

  public onDeleteClick(button): void {
    this.changed.emit({action: 'delete', index: this.index, button: this._button});
  }

  public getTitle(): string {
    return !this._button.name ? 'Geen waarde' : this._button.name;
  }
}
