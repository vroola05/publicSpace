import { Input, OnInit, OnDestroy, Output, EventEmitter, Directive } from '@angular/core';
import { Subscription } from 'rxjs';
import { FieldError } from '../../../model/field-error';
import { ValidationService } from '../../services/validation/validation.service';


@Directive()
export abstract class FieldAbstract implements OnInit, OnDestroy {
  private timeoutId;
  protected subscriptions: Subscription[] = [];

  public errors: FieldError[] = [];
  @Input() form = 'default';
  @Input() style: 'default' | 'large' | 'filled' = 'default';
  @Input() id = '';
  @Input() name = '';
  @Input() classes = '';
  @Input() required = false;
  @Input() maxLength: number;
  @Input() readonly = false;
  @Input() disabled = false;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() validator: {pattern: RegExp, text: string}[] = [];
  @Input() value: any;
  @Input() data: any;
  @Output() changed: EventEmitter<any> = new EventEmitter<any>();
  @Output() typing: EventEmitter<any> = new EventEmitter<any>();

  constructor(protected validation: ValidationService) { }

  public ngOnInit(): void {
    this.validation.register(this.form, this);
    if (this.id && this.id.length > 0) {
      this.subscriptions.push(this.validation.errorsAsObservable().subscribe(errors => {
        this.errors = [];
        errors.forEach(err => {
          if (err.field === this.id) {
            this.addError(err.value);
          }
        });
      }));
    }
  }

  public ngOnDestroy(): void {
    this.validation.unregister(this.form,this);
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public onKeydown(event): void {
    if (event.keyCode === 9) {
      return;
    }
    if (this.typing) {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.typing.emit(event);
      }, 500);
    }
  }

  public onChanged(event): void {
    this.value = event.target.value;
    if (this.data) {
      this.changed.emit({value: event.target.value, data: this.data});
    } else {
      this.changed.emit(event.target.value);
    }
  }

  public focus($event): void {
    console.error('Not yet implemented', $event);
  }
  
  public addValidator(pattern: string, text: string) {
    this.validator.push({pattern: new RegExp(pattern), text});
  }
  public clearValidators(): void {
    this.errors = [];
  }

  public addError(message: string) {
    this.errors.push({message});
  }

  public validate(): boolean {
    this.errors = [];
    const value = this.value ? this.value.toString() : '';

    if (this.required && (!value || value.length === 0)) {
      this.errors.push({message: 'Dit is een verplicht veld!'});
      return false;
    }
    if (this.maxLength && value && value.length > this.maxLength ) {
      this.errors.push({message: `Het maximaal aantal tekens is ${this.maxLength}. Het huidig aantal tekens is ${value.length}`});
      return false;
    }

    for (const validator of this.validator) {
      if (!validator.pattern.test(value)) {
        this.errors.push({message: validator.text});
        return false;
      }
    }
    return true;
  }

  public getPlaceholder(): string {
    return this.placeholder !== '' ? this.placeholder : this.label !== '' ? this.label : '';
  }
}
