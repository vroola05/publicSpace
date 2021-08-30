import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FieldAbstract } from '../field-abstract';

@Component({
  selector: 'lib-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss']
})
export class PasswordFieldComponent extends FieldAbstract implements OnInit, OnDestroy {
  @ViewChild('fieldRef') public fieldRef: ElementRef;

  @Input() icon = '';

  public showText = false;

  constructor() {
    super();
    this.value = '';
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public ngOnDestroy(): void {
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

  public focus(): void {
    if (this.fieldRef) {
      this.fieldRef.nativeElement.focus();
    }
  }
}
