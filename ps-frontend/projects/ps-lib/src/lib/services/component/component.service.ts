import { Injectable } from '@angular/core';
import { ComponentType } from '../../../model/component-type';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  private componentTypes: ComponentType = new ComponentType();
  constructor() { }

  public get(id: string): any {
    if(this.componentTypes[id]) {
        return this.componentTypes[id];
    }
    return undefined;
}
}
