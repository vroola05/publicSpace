import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FieldAbstract } from '../field-abstract';
import { setupTestingRouter } from '@angular/router/testing';
import { ValidationService } from '../../../services/validation/validation.service';

@Component({
  selector: 'lib-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.scss']
})
export class CheckboxFieldComponent extends FieldAbstract implements OnInit, OnDestroy {
  @Input() type: 'checkbox' | 'radio' = 'checkbox';

  constructor(protected validation: ValidationService) {
    super(validation);
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public onChanged(event): void {
    this.value = event.target.checked;
    if (this.data) {
      this.changed.emit({checked: event.target.checked, data: this.data});
    } else {
      this.changed.emit(event.target.checked);
    }
  }
}
