import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FieldAbstract } from '../field-abstract';
import { ValidationService } from '../../../services/validation/validation.service'

@Component({
  selector: 'lib-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent extends FieldAbstract implements OnInit, OnDestroy {
  @ViewChild('fieldRef') public fieldRef: ElementRef;
  @Input() icon = '';
  @Input() type: 'text' | 'number' | 'email' | 'time' | 'currency' = 'text';

  constructor(protected validation: ValidationService) {
    super(validation);
    this.value = '';
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public hasIcon(): boolean {
    return this.icon.length > 0;
  }

  public onChanged(event): void {
    if (this.type === 'currency') {
      const value = '' + parseFloat(event.target.value.replace(',', '.')).toFixed(2);
      if (isNaN(Number(value))) {
        this.value = event.target.value;
      } else {
        
        console.log('value', value);
        this.value = value.replace('.', ',');
        if (this.fieldRef) {
          this.fieldRef.nativeElement.value = this.value;
        }
        console.log('this.value', this.value);
      }
    } else {
      this.value = event.target.value;
    }
    
    if (this.data) {
      this.changed.emit({value: event.target.value, data: this.data});
    } else {
      this.changed.emit(event.target.value);
    }
  }

  public focus(): void {
    if (this.fieldRef) {
      this.fieldRef.nativeElement.focus();
    }
  }

  public validate(): boolean {
    if(!super.validate()) {
      return false;
    }

    const value = this.value ? this.value.toString() : '';
    if (value.length > 0) {
      if (this.type === 'number') {
        if (isNaN(Number(this.value))) {
          this.errors.push({message: `Alleen numerieke waardes toegestaan.`});
          return false;
        }
      } else if (this.type === 'email') {
        if (!RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(value)) {
          this.errors.push({message: `Ongeldig e-mailadres.`});
          return false;
        }
      } else if (this.type === 'time') {
        if (!RegExp(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/).test(value)) {
          this.errors.push({message: `Ongeldige tijd.`});
          return false;
        }
        
      } else if (this.type === 'currency') {
        if (!RegExp(/^(\d+(\,\d{0,2})?|\,?\d{1,2})$/).test(value)) {
          this.errors.push({message: `Ongeldig bedrag.`});
          return false;
        }
        
      }
    }
    
    return true;
  }
}
