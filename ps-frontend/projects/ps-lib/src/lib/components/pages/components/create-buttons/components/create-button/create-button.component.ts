import { Component, Input, OnInit, ViewChild } from '@angular/core';

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

  public _button: PageButton;
  @Input() set button(button: PageButton) {
    this._button = button;
    this.selectButtonType();
  }

  public _buttonTypeItems: { name: string, value?: string, data?: any }[] = [];
  @Input() set buttonTypeItems(buttonTypeItems: { name: string, value?: string, data?: any }[]) {
    this._buttonTypeItems = buttonTypeItems;
    this.selectButtonType();
  }

  public _roleItems: { name: string, value?: string, selected?: boolean, data?: any }[] = [];
  @Input() set roleItems(roleItems: { name: string, value?: string, selected?: boolean, data?: any }[]) {
    this._roleItems = roleItems;
    //this.selectButtonType();
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

  public onButtonNameChanged($event) {
  }

  public onButtonTypeChanged($event) {
  }
  
  public onButtonRouteChanged($event) {
  }

  public onRolesChanged($event): void {
    console.log($event);
  }
}
