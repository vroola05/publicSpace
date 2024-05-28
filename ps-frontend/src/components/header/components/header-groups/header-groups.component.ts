import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import HeaderMenuItemT from '../../../../model/template';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-groups',
  templateUrl: './header-groups.component.html',
  styleUrls: ['./header-groups.component.scss']
})
export class HeaderGroupsComponent implements OnInit, OnDestroy {
  public headerItems: Array<HeaderMenuItemT> = [];
  private subscribtions: Subscription[] = [];

  constructor(
    private navigationService: NavigationService,
  ) { }

  public ngOnInit(): void {
    this.subscribtions.push(this.navigationService.getHeaderItemsAsObservable().subscribe((headerItems: Array<HeaderMenuItemT>) => {
      this.headerItems = headerItems.filter(headerItem => headerItem.menuType === 'group');
    }));

    this.subscribtions.push(this.navigationService.getSelectedHeaderItem().subscribe((selected: HeaderMenuItemT) => {
      this.setSelected(selected);
    }));
  }

  public ngOnDestroy(): void {
    this.subscribtions.forEach(subscription => subscription.unsubscribe());
  }

  private setSelected(headerItem: HeaderMenuItemT) {
    if (this.headerItems) {
      this.headerItems.forEach(item => {
          if (item.route === headerItem.route) {
            item.selected = true;
          } else {
            item.selected = false;
          }
      });
    }
  }
}
