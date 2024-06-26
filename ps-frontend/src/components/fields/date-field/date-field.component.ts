import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FieldAbstract } from '../field-abstract';
import dayjs from 'dayjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ValidationService } from '../../../services/validation/validation.service';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss']
})
export class DateFieldComponent extends FieldAbstract implements OnInit, OnDestroy {
  @ViewChild('fieldRef') public fieldRef: ElementRef = {} as ElementRef;
  @Input() icon = '';
  
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

  public hasIcon(): boolean {
    return this.icon.length > 0;
  }

  public onDateChanged(value: MatDatepickerInputEvent<any>): void {
    this.value = value.value === null ? '' : dayjs(value.value).format('YYYY-MM-DD');
    if (this.data) {
      this.changed.emit({value: this.value, data: this.data});
    } else {
      this.changed.emit(this.value);
    }
  }

  public override focus(): void {
    if (this.fieldRef) {
      this.fieldRef.nativeElement.focus();
    }
  }
}
