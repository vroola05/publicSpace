import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private actions = [];
  constructor() { }

  public clear() {
    this.actions = [];
  }
  public register(name: string, action: any) {
    if (name && name.length > 0 && action) {
      this.actions[name] = action;
    }
  }

  public call(name: string) {
    if (name && name.length && this.actions[name]) {
      this.actions[name]();
    } else {
      console.error('Action not found: ' + name);
    }
  }
}
