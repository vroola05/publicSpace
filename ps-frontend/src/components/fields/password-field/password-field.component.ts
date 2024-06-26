import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ValidationService } from '../../../services/validation/validation.service';
import { FieldAbstract } from '../field-abstract';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss']
})
export class PasswordFieldComponent extends FieldAbstract implements OnInit, OnDestroy {
  @ViewChild('fieldRef') public fieldRef: ElementRef = {} as ElementRef;

  @Input() icon = '';

  public showText = false;

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

  public getType(): string {
    return this.showText ? 'text' : 'password';
  }

  public hasIcon(): boolean {
    return this.icon.length > 0;
  }

  public toggle(): void {
    this.showText = !this.showText;
  }

  public override focus(): void {
    if (this.fieldRef) {
      this.fieldRef.nativeElement.focus();
    }
  }
}
