import { Injectable } from '@angular/core';

import { Action } from '../../../model/action';
import { ActionType } from '../../../model/action-type';
import { ActionTypes } from '../../../model/intefaces';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private actions: Map<number, {action: Action, func: any}> = new Map<number, {action: Action, func: any}>();

  constructor() {}

  public setActions(actions: Array<Action>) {
    actions.forEach(action => {
      this.actions.set(action.actionType.id, {
        action,
        func: undefined
      });
    });
  }

  public register(actionType: ActionTypes, func: any) {
    if (actionType && func && this.actions.has(actionType)) {
      this.actions.get(actionType).func = func;
    }
  }

  public call(actionType: ActionType) {
    console.log(actionType);
    if (actionType && this.actions.has(actionType.id)) {
      this.actions.get(actionType.id).func();
    } else {
      console.error('Action not found: ' + name);
    }
  }
}
