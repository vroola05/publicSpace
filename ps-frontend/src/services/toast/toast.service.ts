import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: BehaviorSubject<{id: number, type: 'done' | 'error' | 'warning' | 'info', message: string, seconds: number}[]>
    = new BehaviorSubject([]);
  private id = 0;

  public get toastsObservable() {
    return this.toasts.asObservable();
  }

  constructor() { }

  public success(message: string, seconds: number = -1, clear: boolean = false) {
    this.setToast('done', message, seconds, clear);
  }

  public info(message: string, seconds: number = -1, clear: boolean = false) {
    this.setToast('info', message, seconds, clear);
  }

  public warning(message: string, seconds: number = -1, clear: boolean = false) {
    this.setToast('warning', message, seconds, clear);
  }

  public error(message: string, seconds: number = -1, clear: boolean = false) {
    this.setToast('error', message, seconds, clear);
  }

  private setToast(type: 'done' | 'error' | 'warning' | 'info', message: string, seconds: number, clear: boolean): void {
    const toast = {id: ++this.id, type, message, seconds};
    const toasts = clear ? [] : this.toasts.getValue();
    toasts.push(toast);
    this.toasts.next(toasts);

    this.setTimer(toast);
  }
  private setTimer(toast: any) {
    if (toast.seconds > 0) {
      setTimeout(() => {
        this.remove(toast.id);
      }, toast.seconds * 1000);
    }
  }

  public remove(id: number) {
    const toasts = this.toasts.getValue();
    const item = toasts.find(toast => toast.id === id);
    if (item) {
      toasts.splice(toasts.indexOf(item), 1);
      this.toasts.next(toasts);
    }
  }
}
