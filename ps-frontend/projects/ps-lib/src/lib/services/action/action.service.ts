import { Injectable } from '@angular/core';
import { ActionType } from '../../../model/action-type';

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

  public call(action: ActionType) {
    if (action && this.actions[action.id]) {
      this.actions[action.id]();
    } else {
      console.error('Action not found: ' + name);
    }
  }
}
