import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PageButton } from '../../model/page-button';
import { ConditionT } from '../../model/template';
import { AuthorisationService } from '../authorisation/authorisation.service';

@Injectable({
  providedIn: 'root'
})
export class TransformService {
  private variables = new Map();
  private variableChanged: BehaviorSubject<{action: 'set' | 'delete' | 'clear', key: string, value: any}> = new BehaviorSubject<{action: 'set' | 'delete', key: string, value: any}>(null);

  constructor(
    private authorisation: AuthorisationService
  ) { }

  public getVariableChangedObservable(): Observable<{action: 'set' | 'delete' | 'clear', key: string, value: any}> {
    return this.variableChanged.asObservable()
  }

  public setVariable(key: string, value: any): void {
    this.variables.set(key, value);
    this.variableChanged.next({action: 'set', key, value});
  }

  public deleteVariable(key: string): void {
    this.variables.delete(key);
    this.variableChanged.next({action: 'delete', key, value: undefined});
  }

  public getVariable(key: string): any {
    return this.variables.get(key);
  }

  public clearVariable(): void {
    this.variables.clear();
    this.variableChanged.next({action: 'clear', key: undefined, value: undefined});
  }

  public filterRolesAndConditions(buttons: PageButton[]): PageButton[] {
    if (!buttons) {
      return buttons;
    } else {
      return buttons
        .filter(button => !button.roles || this.authorisation.validateRoles(button.roles))
        .filter(button => !button.conditions || this.checkConditions(button.conditions));
    }
  }

  private checkConditions(conditions: ConditionT[]): boolean {
    for (const condition of conditions) {
      if (!this.checkCondition(condition)) {
        return false;
      }
    }
    return true;
  }

  private checkCondition(condition: ConditionT): boolean {
    let field = this.tranformField(condition.field);
    field = !field ? '' : field;
    const value = (typeof field === 'number' ? +condition.value : condition.value);
    switch (condition.operator) {
      case 'eq':
        return field === value;
      case 'neq':
        return field !== value;
      case 'lt':
        return field < value;
      case 'le':
        return field <= value;
      case 'gt':
        return field > value;
      case 'ge':
        return field >= value;
    }
  }

  public URL(url: string) {
    const reg = new RegExp(/\$\{[a-zA-Z\.]+}/, 'g');
    return url.replace(reg, (match, offset, contents) => {
      const path = match.slice(2, match.length - 1);
      return this.tranformField(path);
    });
  }

  private tranformField(path: string): string {
    const vars = path.split('.');
    if (vars && vars.length > 1) {
      if (vars[0] === 'path') {
        const result = this.getVariable(vars[0]).get(vars[1]);
        if (result) {
          return result;
        }
        return path;
      } else {
        try {
          const data = this.getVariable(vars[0]);
          return this.readValueFromPath(vars.slice(1), data);
        } catch (e) {
          return path;
        }
      }
    } else if (vars && vars.length === 1) {
      const result = this.getVariable(vars[0]);
      if (result) {
        return result;
      }
      return path;
    }
    return '';
  }

  public readValueFromPath(path: string[], obj: any) : any {

    const length = path.length;
    if (length > 0) {
      const property = path.shift();
      if (length === 1) {
        return this.getValueFrom(property, obj);
      } else if (length > 1) {
        if (obj && property in obj && typeof obj[property] === 'object') {
          return this.readValueFromPath(path, obj[property]);
        }
      }
    }
    throw 'Something bad happened';
  }

  public getValueFrom(field: string, obj: any) {
    if (obj && field in obj) {
      switch (typeof obj[field]) {
        case 'string':
          return obj[field];
        case 'number':
          return obj[field];
        case 'boolean':
          return obj[field];
      }
    }
    return null;
  }
}
