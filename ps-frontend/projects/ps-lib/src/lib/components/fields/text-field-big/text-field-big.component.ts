import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { FieldAbstract } from '../field-abstract';

@Component({
  selector: 'lib-text-field-big',
  templateUrl: './text-field-big.component.html',
  styleUrls: ['./text-field-big.component.scss']
})
export class TextFieldBigComponent extends FieldAbstract implements OnInit, OnDestroy {
  @ViewChild('fieldRef') public fieldRef: ElementRef;
  @Input() icon = '';

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

  public hasIcon(): boolean {
    return this.icon.length > 0;
  }

  public focus(): void {
    if (this.fieldRef) {
      this.fieldRef.nativeElement.focus();
    }
  }
}
