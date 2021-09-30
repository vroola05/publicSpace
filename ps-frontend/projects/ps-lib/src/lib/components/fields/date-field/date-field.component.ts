import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FieldAbstract } from '../field-abstract';
import moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ValidationService } from '../../../services/validation/validation.service';

@Component({
  selector: 'lib-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss']
})
export class DateFieldComponent extends FieldAbstract implements OnInit, OnDestroy {
  @ViewChild('fieldRef') public fieldRef: ElementRef;
  @Input() icon = '';
  
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

  public onDateChanged(value: MatDatepickerInputEvent<any>): void {
    this.value = value.value === null ? '' : moment(value.value).format('YYYY-MM-DD');
    if (this.data) {
      this.changed.emit({value: this.value, data: this.data});
    } else {
      this.changed.emit(this.value);
    }
  }

  public focus(): void {
    if (this.fieldRef) {
      this.fieldRef.nativeElement.focus();
    }
  }
}
