import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Amount } from '../../model/amount';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: BehaviorSubject<Amount> = new BehaviorSubject<Amount>(null);

  constructor() { }


  public getNotification(name: string): number {
    const notifications = this.notifications.getValue();
    if (notifications && notifications.hasOwnProperty(name)) {
      return notifications[name];
    }
    return 0;
  }

  public setNotifications(notifications: Amount) {
    this.notifications.next(notifications);
  }
}
