import { Input, Output, EventEmitter, Directive } from '@angular/core';

@Directive()
export abstract class BtnAbstract {
  @Input() public text = '';
  @Input() public classes = '';

  @Output() clicked: EventEmitter<string> = new EventEmitter<string>();

  protected _disabled = false;

  constructor() { }

  public set disabled(disabled: boolean) {
    this._disabled = disabled;
  }

  public get disabled(): boolean {
    return this._disabled;
  }

  public _click() {
    if (this.clicked && !this._disabled) {
      this.clicked.emit(this.text);
    }
  }
}
