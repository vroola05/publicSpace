import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FieldAbstract } from '../../components/fields/field-abstract';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  
  private _register: Map<string, FieldAbstract[]> = new Map<string, FieldAbstract[]>();

  public register(form: string, field: FieldAbstract) {
    if (!this._register.has(form)) {
      this._register.set(form, []);
    }

    if (!this._register.get(form).includes(field)) {
      this._register.get(form).push(field);
    }
  }

  public unregister(form: string, field: FieldAbstract) {
    if (this._register.has(form)) {
      if (this._register.get(form).includes(field)) {
        this._register.get(form).splice(this._register.get(form).indexOf(field));
      }
      if (this._register.get(form).length <= 0) {
        this._register.delete(form)
      }
    }
  }

  private _errors: BehaviorSubject<{field: string, value: string}[]> = new BehaviorSubject<{field: string, value: string}[]>([]);

  public get errors(): {field: string, value: string}[] {
    return this._errors.getValue();
  }

  public set errors(errors: {field: string, value: string}[])  {
    this._errors.next(errors);
  }

  public clear() {
    this._errors.next([]);
  }

  public errorsAsObservable(): Observable<{field: string, value: string}[]> {
    return this._errors.asObservable();
  }

  public validateField(form: string, field: string): boolean {
    if (this._register.has(form)) {
      const f = this._register.get(form).find(f => f.name === field);
      return f && f.validate();
    }
    return false;
  }

  public validate(form: string): boolean {
    if (this._register.has(form)) {
      let valid = true;
      this._register.get(form).forEach(field => {
        if(!field.validate()) {
          valid = false;
        }
      })
      return valid;
    }
    return false;
    
  }

  constructor() { }
}
