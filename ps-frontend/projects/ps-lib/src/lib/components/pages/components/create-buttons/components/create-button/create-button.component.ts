import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { TextareaFieldComponent } from '../../../../../fields/textarea-field/textarea-field.component';
import { DropdownFieldComponent } from '../../../../../fields/dropdown-field/dropdown-field.component';

import { PageButton } from '../../../../../../../model/page-button';
import { ActionType } from '../../../../../../../model/action-type';

@Component({
  selector: 'lib-create-button',
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.scss']
})
export class CreateButtonComponent implements OnInit {
  @ViewChild('buttonNameComponent') buttonNameComponent: TextareaFieldComponent;
  @ViewChild('buttonRouteComponent') buttonRouteComponent: TextareaFieldComponent;
  @ViewChild('buttonTypeComponent') buttonTypeComponent: DropdownFieldComponent;
  @ViewChild('actionComponent') actionComponent: DropdownFieldComponent;

  @Output() changed: EventEmitter<{ action: string, index: number, button: PageButton }> = new EventEmitter<{ action: string, index: number, button: PageButton }>();

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

  public _actionTypeItems: { name: string, value?: string, data?: any }[] = [];
  @Input() set actionTypeItems(actionTypeItems: { name: string, value?: string, data?: any }[]) {
    this._actionTypeItems = [];
    actionTypeItems.forEach(actionTypeItem => {
      this._actionTypeItems.push({ name: actionTypeItem.name, value: actionTypeItem.value, data: actionTypeItem.data });
    });
    this.selectActionType();
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

        const item = this._buttonTypeItems.find(type => !type.data || type.data === this._button.type);
        if (item) {
          this.buttonTypeComponent.select(item);
        }
      }
    });
  }

  public selectActionType() {
    setTimeout(() => {
      if (this.actionComponent) {
        if (!this._button || !this._button.action) {
          this.actionComponent.select(null);
          return;
        }

        const item = this._actionTypeItems.find(type => !type.data || type.data.id === this._button.action.id);
        if (item) {
          this.actionComponent.select(item);
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
    this.changed.emit({ action: 'changed', index: this.index, button: this._button });
  }

  public onButtonTypeChanged($event) {
    this._button.type = $event.data;
    this.changed.emit({ action: 'changed', index: this.index, button: this._button });
  }

  public onActionChanged($event) {
    this._button.action = $event.data;
    this.changed.emit({ action: 'changed', index: this.index, button: this._button });
  }

  public onButtonRouteChanged($event) {
    this._button.route = $event;
    this.changed.emit({ action: 'changed', index: this.index, button: this._button });
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
    this.changed.emit({ action: 'changed', index: this.index, button: this._button });
  }

  public onConditionsChanged($event): void {
    switch ($event.action) {
      case 'delete':
        this._button.conditions.splice($event.index, 1);
        break;
      case 'changed':
        this._button.conditions = $event.conditions;
        break;
    }

    this.changed.emit({ action: 'changed', index: this.index, button: this._button });
  }

  public hasRole(id: number): boolean {
    const item = this._button.roles.find(r => r.id === id);
    if (item) {
      return true;
    }
    return false;
  }

  public onDeleteClick(button): void {
    this.changed.emit({ action: 'delete', index: this.index, button: this._button });
  }

  public getTitle(): string {
    return !this._button.name ? 'Geen waarde' : this._button.name;
  }
}
