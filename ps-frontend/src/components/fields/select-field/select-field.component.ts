import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ValidationService } from '../../../services/validation/validation.service';
import { FieldAbstract } from '../field-abstract';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent extends FieldAbstract implements OnInit, OnDestroy {
  @Output() changedOptions: EventEmitter<any> = new EventEmitter<any>();

  @Input() search = false;
  public searchtext = '';

  private _options: {name: string, value?: string, selected?: boolean, data?: any}[] = [];
  @Input() set options( options: {name: string, value?: string, selected?: boolean, data?: any}[]) {
    if (options) {
      this._options = options;
    } else {
      this._options = [];
    }

    this.changedOptions.emit(this._options);
  }

  get options() {
    return this.searchtext === '' ? this._options : this._options.filter(option => option.name.toLowerCase().includes(this.searchtext.toLowerCase()));
  }

  get selected() {
    return this._options.filter(option => option.selected);
  }

  constructor(protected override validation: ValidationService) {
    super(validation);
  }

  public override ngOnInit(): void {
    super.ngOnInit();
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public hasItems(): boolean {
    return this._options && this._options.length > 0;
  }

  public clear(): void {
    this.options = [];
  }

  public onChecked($event): void {
    if ($event.data) {
      const option = this.options.find(item => item.name === $event.data.name && item.value === $event.data.value);
      if (option) {
        option.selected = $event.checked;
      }
    }
    this.changed.emit($event);
  }

  public setItems(items: {name: string, value?: string, selected?: boolean, data?: any}[]): void {
    this.options = items;
    this.changedOptions.emit(this._options);
  }

  public onTyping($event): void {
    this.searchtext = $event.target.value;
  }

  public addItem(item: {name: string, value?: string, selected?: boolean, data?: any}): void {
    this.options.push(item);
    this.changedOptions.emit(this._options);
  }

  public isSelected(item: {name: string, value?: string, selected?: boolean, data?: any}): boolean {
    return item.selected;
  }
}
