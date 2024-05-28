import { Injectable } from '@angular/core';

import { Action } from '../../model/action';
import { ActionType } from '../../model/action-type';
import { ActionTypeEnum } from '../../model/intefaces';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private actions: Map<number, {action: Action, func: () => Promise<boolean>}> = new Map<number, {action: Action, func: () => Promise<boolean>}>();

  constructor() {

  }

  public setActions(actions: Array<Action>) {
    actions.forEach(action => {
      this.actions.set(action.actionType.id, {
        action,
        func: undefined
      });
    });
  }

  public register(actionType: ActionTypeEnum, func: () => Promise<boolean>) {
    if (this.actions !== undefined && !isNaN(Number(actionType)) && func && this.actions.has(actionType)) {
      this.actions.get(actionType).func = func;
    }
  }

  public call(actionType: ActionType): Promise<boolean> {
    if (actionType && this.actions.has(actionType.id)) {
      return this.actions.get(actionType.id).func();
    } else {
      return new Promise((resolve, reject) => {
        console.error('Action not found: ' + actionType.name);
        reject(false)
      });
    }
  }
}
