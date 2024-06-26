import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActionType } from '../../../../../../../model/action-type';
import { Role } from '../../../../../../../model/role';
import { PageButton } from '../../../../../../../model/page-button';

import { AuthorisationService } from '../../../../../../../services/authorisation/authorisation.service';
import { TransformService } from '../../../../../../../services/transform/transform.service';
import { EndpointService } from '../../../../../../../services/endpoint/endpoint.service';

@Component({
  selector: 'app-create-buttons',
  templateUrl: './create-buttons.component.html',
  styleUrls: ['./create-buttons.component.scss']
})
export class CreateButtonsComponent implements OnInit {
  
  @Input() public prefix: string = '';
  @Input() public buttons: PageButton[] = [];

  @Output() changed: EventEmitter<PageButton[]> = new EventEmitter<PageButton[]>();
  

  public buttonTypeItems: { name: string, value?: string, data?: any }[] = [];
  public actionTypeItems: { name: string, value?: string, data?: any }[] = [];
  public roleItems: { name: string, value?: string, selected?: boolean, data?: any }[] = [];

  constructor(
    private endpoints: EndpointService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) { }

  public ngOnInit(): void {

    this.getButtonTypes();
    this.getActionTypes();
    this.getRoles();
  }

  public getId(id: string): string {
    return !id || !this.prefix ? id : this.prefix + (id.charAt(0) !== '[' ? '.'+ id : id);
  }

  public getButtonTypes(): void {
    this.endpoints.get('getButtonTypes').then((pageButtonTypes: string[]) => {
      const buttonTypeItems: { name: string, value?: string, data?: any }[] = [];
      pageButtonTypes.forEach(pageButtonType => {
        buttonTypeItems.push({ name: pageButtonType, value: null, data: pageButtonType });
      });
      this.buttonTypeItems = buttonTypeItems;
    });
  }

  public getActionTypes(): void {
    this.endpoints.get('getActionTypes').then((actionTypes: ActionType[]) => {
      const actionTypeItems: { name: string, value?: string, data?: any }[] = [];
        actionTypes.forEach(actionType => {
          actionTypeItems.push({ name: actionType.name, value: null, data: actionType });
        });
        this.actionTypeItems = actionTypeItems;
    });
  }

  public getRoles(): void {
    this.endpoints.get('getRoles').then((roles: Role[]) => {
      const roleItems: { name: string, value?: string, selected?: boolean, data?: any }[] = [];
        roles.forEach(role => {
          roleItems.push({ name: role.role, value: String(role.id), data: role });
        });
        this.roleItems = roleItems;
    });
  }

  public onButtonChanged($event: {action: string, index: number, button: PageButton}): void {
    switch($event.action) {
      case 'delete':
        this.buttons.splice($event.index, 1);
        break;
      case 'changed':
        this.buttons[$event.index] = $event.button;
        break;
    }
    this.changed.emit(this.buttons);
  }
  
  public onAddClick($event): void {
    if (!this.buttons) {
      this.buttons = [];
    }
    const button = new PageButton();
    button.name = '';
    button.route = '';
    button.roles = [];
    button.conditions = [];
    this.buttons.push(button);
    this.changed.emit(this.buttons);
  }

  public isFirstButton(i: number) : boolean {
    return i <= 0;
  }

  public isLastButton(i: number) : boolean {
    return i >= this.buttons.length - 1;
  }

  public moveUp(i: number): void {
    if (this.isFirstButton(i)) {
      return;
    }

    this.moveButton(i, i-1);
  }

  public moveDown(i: number): void {
    if (this.isLastButton(i)) {
      return;
    }

    this.moveButton(i, i+1);
  }

  private moveButton(oldIndex, newIndex) {
    this.buttons.splice(newIndex, 0, this.buttons.splice(oldIndex, 1)[0]);
  }
}
