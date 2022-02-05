import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[libDynamicLeft]'
})
export class DynamicLeftDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
