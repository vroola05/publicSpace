import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ValidationService } from '../../../services/validation/validation.service';
import { FieldAbstract } from '../field-abstract';

@Component({
  selector: 'app-textarea-field',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.scss']
})
export class TextareaFieldComponent extends FieldAbstract implements OnInit, OnDestroy {
  @ViewChild('fieldRef') public fieldRef: ElementRef;

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

  public override focus(): void {
    if (this.fieldRef) {
      this.fieldRef.nativeElement.focus();
    }
  }
}
