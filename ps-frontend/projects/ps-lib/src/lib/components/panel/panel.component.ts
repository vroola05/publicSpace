import { Component, Input, OnInit } from '@angular/core';
import { ButtonT } from '../../../model/template';
import { PageLayoutType } from '../../../model/intefaces';
import { ActionService } from '../../services/action/action.service';
import { NavigationService } from '../../services/navigation/navigation.service';
import { TransformService } from '../../services/transform/transform.service';
import { PageButton } from '../../../model/page-button';

@Component({
  selector: 'lib-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  public title = '';

  @Input() public pageLayoutType: PageLayoutType = PageLayoutType.page;
  @Input() public buttonsLeft: PageButton[] = [];
  @Input() public buttonsRight: PageButton[] = [];
  @Input() public data: any;

  constructor(
    private action: ActionService,
    private navigationService: NavigationService,
    protected transform: TransformService
    ) { }

  public ngOnInit(): void {
  }

  public onClick(button: PageButton) {
    if (button.action) {
      this.action.call(button.action);
    }
    if (button.route) {
      this.navigate(this.transform.URL(button.route));
    }
  }

  public filterRolesAndConditions(buttons: PageButton[]): PageButton[] {
    return this.transform.filterRolesAndConditions(buttons);
  }

  public navigate(path: string) {
    this.navigationService.navigate([path], true);
  }
}
