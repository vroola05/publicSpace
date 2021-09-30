import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FieldAbstract } from '../field-abstract';

@Component({
  selector: 'lib-dropdown-field',
  templateUrl: './dropdown-field.component.html',
  styleUrls: ['./dropdown-field.component.scss']
})
export class DropdownFieldComponent extends FieldAbstract implements OnInit, OnDestroy {
  @Output() changedOptions: EventEmitter<any> = new EventEmitter<any>();

  private _options: {name: string, value?: string, data?: any}[] = [];
  @Input() set options( options: {name: string, value?: string, data?: any}[]) {
    if (options) {
      this._options = options;
    } else {
      this._options = [];
    }

    this.changedOptions.emit(this._options);
  }
  get options() {
    return this._options;
  }

  public opened = false;

  private _selected: {name: string, value?: string, data?: any} = null;
  get selected() {
    return this._selected;
  }

  constructor() {
    super();
    this.value = '';
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  private closeListener = (event) => {
    this.closeList();
  }

  private keyListener = (event) => {
    if (event.keyCode === 13) {
      this.closeList();
    }
    if (event.keyCode === 9) {
      this.closeList();
    }

    let index = 0;
    if (this._selected !== null) {
      index = this._options.indexOf(this._selected);
      if (index < 0) {
        index = 0;
      }
    }
    if (event.keyCode === 38) {
      if (index === 0) {
        index = this._options.length - 1;
      } else {
        index--;
      }
    }
    if (event.keyCode === 40) {
      if (index === this._options.length - 1) {
        index = 0;
      } else {
        index++;
      }
    }
    this._selected = this._options[index];
    this.value = this._options[index].name;
    this.changed.emit(this._selected);
  }

  public hasItems(): boolean {
    return this.options && this.options.length > 0;
  }

  public clear(): void {
    this.options = [];
    this.select(null);
    this.closeList();
  }

  public setItems(items: {name: string, value?: string, data?: any}[]): void {
    this.options = items;
    this.changedOptions.emit(this._options);
  }

  public addItem(item: {name: string, value?: string, data?: any}): void {
    this.options.push(item);
    this.changedOptions.emit(this._options);
  }

  public isSelected(item: any): boolean {
    return this._selected && this._selected === item;
  }

  public select(option: {name: string, value?: string, data?: any}): void {
    if (option && this._options.length > 0 && this._options.indexOf(option) >= 0) {
      this._selected = option;
      this.value = option.name;
      this.changed.emit(this._selected);
      this.closeList();
    } else {
      this._selected = null;
      this.value = '';
    }
  }

  public focus($event): void {
    this.openList();
  }

  public openList() {
    if (!this.opened && this.hasItems()) {
      this.opened = true;
      setTimeout(() => {
        document.addEventListener('click', this.closeListener);
        document.addEventListener('keydown', this.keyListener);
      });
    } else {
      this.closeList();
    }
  }

  public closeList() {
    this.opened = false;
    setTimeout(() => {
      document.removeEventListener('click', this.closeListener);
      document.removeEventListener('keydown', this.keyListener);
    });
  }

  public onClick($event) {
    this.select($event);
  }
}
