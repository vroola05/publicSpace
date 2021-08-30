import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private prefix = '';

  private live = new Map();

  constructor() { }

  public setPrefix(prefix: string) {
    this.prefix = prefix + (prefix !== '' ? '_' : '');
  }

  public setLocal(key: string, value: string, isProcessVariable: boolean = false) {
    localStorage.setItem(this.prefix + key, value);
    this.setProcessVariable(isProcessVariable, key, 'local');
  }

  public getLocal(key: string): string {
    return localStorage.getItem(this.prefix + key);
  }

  public setSession(key: string, value: string, isProcessVariable: boolean = false) {
    sessionStorage.setItem(this.prefix + key, value);
    this.setProcessVariable(isProcessVariable, key, 'session');
  }

  public removeSession(key: string) {
    sessionStorage.removeItem(this.prefix + key);
  }

  public getSession(key: string): string {
    return sessionStorage.getItem(this.prefix + key);
  }

  public setVariable(key: string, value: any, isProcessVariable: boolean = false) {
    this.live.set(this.prefix + key, value);
    this.setProcessVariable(isProcessVariable, key, 'live');
  }

  public removeVariable(key: string) {
    this.live.delete(this.prefix + key);
  }

  public getVariable(key: string): any {
    return this.live.get(this.prefix + key);
  }

  public clear() {
    localStorage.clear();
    sessionStorage.clear();
    this.live.clear();
  }

  private getProcessVariables(): {key: string, type: string}[] {
    const proccessItemsStore = sessionStorage.getItem(this.prefix + 'processVariables');
    if (proccessItemsStore) {
      return JSON.parse(proccessItemsStore) as {key: string, type: string}[];
    }
    const proccessItems: {key: string, type: string}[] = [];
    return proccessItems;
  }

  private setProcessVariable(isProcessVariable: boolean, key: string, type: string) {
    if (isProcessVariable) {
      const proccessItems = this.getProcessVariables();
      if (!proccessItems.find(item => item.key === key && item.type === type)) {
        proccessItems.push({key, type});
        sessionStorage.setItem(this.prefix + 'processVariables', JSON.stringify(proccessItems));
      }
    }
  }

  public removeProcessDataItem(key: string, type: string) {
    const proccessItems = this.getProcessVariables();
    const proccessItem = proccessItems.find(item => item.key === key && item.type === type)
    if (proccessItem) {
      proccessItems.slice(proccessItems.indexOf(proccessItem), 1);
      sessionStorage.setItem(this.prefix + 'processVariables', JSON.stringify(proccessItems));
    }
  }

  public clearProcessData() {
    const proccessItems = this.getProcessVariables();
    proccessItems.forEach(item => {
      if (item.type === 'local') {
        localStorage.removeItem(this.prefix + item.key);
      } else if (item.type === 'live') {
        this.live.delete(this.prefix + item.key);
      } else {
        sessionStorage.removeItem(this.prefix + item.key);
      }
    });
    sessionStorage.removeItem(this.prefix + 'processVariables');
  }
}
