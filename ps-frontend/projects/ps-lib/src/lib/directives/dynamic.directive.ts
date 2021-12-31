import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[libDynamic]'
})
export class DynamicDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
