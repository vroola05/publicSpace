import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationService } from '../../../../../services/navigation/navigation.service';
import { StorageService } from '../../../../../services/storage/storage.service';

@Component({
  selector: 'app-settings-button',
  templateUrl: './settings-button.component.html',
  styleUrls: ['./settings-button.component.scss']
})
export class SettingsButtonComponent implements OnInit {
  @Input() icon: string;
  @Input() name: string;
  @Input() route: string;
  @Input() selected = false;
  @Output() clicked: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private navigationService: NavigationService,
    protected storageService: StorageService
  ) { }

  public ngOnInit(): void {
  }

  public click(): void {
    setTimeout(() => {
      this.clicked.emit(this.route);
      this.navigationService.navigate([this.route]);

    });
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
