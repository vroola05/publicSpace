import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationService } from '../../../../services/navigation/navigation.service';

@Component({
  selector: 'app-panel-title',
  templateUrl: './panel-title.component.html',
  styleUrls: ['./panel-title.component.scss']
})
export class PanelTitleComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[] = [];

  @Input() title = '';
  constructor(
    private navigationService: NavigationService
  ) { }

  public ngOnInit(): void {
    if (!this.title || this.title === '') {
      this.subscriptions.push(this.navigationService.titleAsObservable().subscribe(title => {
        this.title = title;
      }));
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
