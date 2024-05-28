import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[libDynamicRight]'
})
export class DynamicRightDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
