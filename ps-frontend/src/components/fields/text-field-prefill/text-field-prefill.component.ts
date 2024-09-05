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
  private index = 0;

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

  public override clear(): void {
    this.options = [];
    this.select();

    this.closeList();
  }

  public override onKeydown(event): void {
    if (event.keyCode === 9) {
      return;
    }

    if (this.hasItems() && this.opened) {
      if (event.keyCode === 13) {
        this.select(this.options[this.index]);
  
        return;
      } else if (event.keyCode === 38) {
        if (this.index > 0 )
          this.index--;
        else
          this.index = this.options.length ==  0 ? 0 :  this.options.length - 1;
        return;
      } else if (event.keyCode === 40) {
        if (this.index < this.options.length - 1)
          this.index++;
        else 
          this.index = 0;
        return;
      }

    }

    if (this.typing) {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.typing.emit(event);
      }, 500);
    }
  }


  public setItems(items: {name: string, value?: string, data?: any}[]): void {
    this.options = items;
    this.opened = true;
  }

  public addItem(item: {name: string, value?: string, data?: any}): void {
    this.options.push(item);
    this.opened = true;
  }

  public isSelected(index: number): boolean {
    return this.index == index;
  }

  public select(option?: {name: string, value?: string, data?: any}): void {
    if (option) {
      console.log(option);
      const index =  this.options.indexOf(option);
      this.index = index < 0 ? 0 : index;
      this.value = option.name;
      this.changed.emit(this.options[this.index]);
    } else {
      this.value = '';
    }
    
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
            this.select(this.options[this.index]);
          }
        }
      }
      this.hasClicked = false;
    }, 200);
  }

  public override focus(): void {
    if (this.hasItems()) {
      this.openList();
    }
  }
}
