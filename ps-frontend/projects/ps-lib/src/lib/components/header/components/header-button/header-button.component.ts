import { Component, OnInit, Input } from '@angular/core';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { StorageService } from '../../../../services/storage/storage.service';

@Component({
  selector: 'lib-header-button',
  templateUrl: './header-button.component.html',
  styleUrls: ['./header-button.component.scss']
})
export class HeaderButtonComponent implements OnInit {
  @Input() id: string;
  @Input() icon: string;
  @Input() name: string;
  @Input() route: string;
  @Input() store = false;
  @Input() iconSrc: string;
  @Input() selected = false;
  @Input() classes = '';
  @Input() notification: string;

  constructor(
    private navigationService: NavigationService,
    protected storageService: StorageService,
    protected notificationService: NotificationService,
    ) {
    }

  public ngOnInit(): void {
  }

  public getNotification(): number {
    return this.notificationService.getNotification(this.notification);
  }
  public hasNotification(): boolean {
    return this.notification && this.notificationService.getNotification(this.notification) > 0;
  }

  public click(): void {
    this.storageService.clearProcessData();
    this.navigationService.clearRoutes();
    if (this.id) {
      setTimeout(() => {
        this.navigationService.navigate(['/overview/' + this.id], this.store);
      });
    } else if (this.route) {
      setTimeout(() => {
        this.navigationService.navigate([this.route], this.store);
      });
    }
  }

  public getNameAsAvatar(name: string): string {
    if (!name || !name) {
      return '';
    }
    return name.split(' ').map((n) => {
      return n[0];
    }).join('');
  }
}
