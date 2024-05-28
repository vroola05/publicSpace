import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {
  private toastSubscription: Subscription;
  public toasts: {id: number, type: 'done' | 'error' | 'warning' | 'info', message: string, seconds: number}[];

  constructor(
    private toast: ToastService
  ) { }

  public ngOnInit(): void {
    this.toastSubscription = this.toast.toastsObservable.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  public ngOnDestroy(): void {
    if (this.toastSubscription) {
      this.toastSubscription.unsubscribe();
    }
  }

  public close(toast): void {
    this.toast.remove(toast.id);
  }
}
