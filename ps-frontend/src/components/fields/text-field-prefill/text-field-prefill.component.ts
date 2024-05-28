import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ValidationService } from '../../../services/validation/validation.service';
import { FieldAbstract } from '../field-abstract';

@Component({
  selector: 'app-text-field-prefill',
  templateUrl: './text-field-prefill.component.html',
  styleUrls: ['./text-field-prefill.component.scss']
})
export class TextFieldPrefillComponent extends FieldAbstract implements OnInit, OnDestroy {
  @ViewChild('fieldRef') public fieldRef: ElementRef = {} as ElementRef;
  @Input() options: {name: string, value?: string, data?: any}[] = [];
  
  public opened = false;
  private hasClicked = false;
  private _selected: {name: string, value?: string, data?: any} = null;

  get selected() {
    return this._selected;
  }

  constructor(protected override validation: ValidationService) {
    super(validation);
    this.value = '';
  }

  public override ngOnInit(): void {
    super.ngOnInit();
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
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
    this.opened = true;
  }

  public addItem(item: {name: string, value?: string, data?: any}): void {
    this.options.push(item);
    this.opened = true;
  }

  public isSelected(item: any): boolean {
    return this._selected && this._selected === item;
  }

  public select(option): void {
    this._selected = option;
    if (option !== null) {
      this.value = option.name;
    } else {
      this.value = '';
    }
    this.changed.emit(this._selected);
    this.closeList();
  }

  public openList() {
    this.opened = true;
  }

  public closeList() {
    this.opened = false;
  }

  public onClick($event) {
    this.hasClicked = true;
    this.select($event);
  }

  public onBlur($event) {
    setTimeout(() => {
      if (!this.hasClicked) {
        if ($event.target.value === '') {
          this.clear();
        } else {
          if (this.options.length > 0) {
            this.select(this.options[0]);
          }
        }
      }
      this.hasClicked = false;
    }, 200);
  }

  public override focus(): void {
    if (this.fieldRef) {
      this.fieldRef.nativeElement.focus();
    }
  }
}
