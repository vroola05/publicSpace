import { Component, Input, OnInit } from '@angular/core';
import { ButtonT } from '../../../model/template';
import { PageType } from '../../../model/intefaces';
import { ActionService } from '../../services/action/action.service';
import { NavigationService } from '../../services/navigation/navigation.service';
import { TransformService } from '../../services/transform/transform.service';

@Component({
  selector: 'lib-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  public title = '';

  @Input() public pageType: PageType = PageType.page;
  @Input() public buttonsLeft: ButtonT[] = [];
  @Input() public buttonsRight: ButtonT[] = [];
  @Input() public data: any;

  constructor(
    private action: ActionService,
    private navigationService: NavigationService,
    protected transform: TransformService
    ) { }

  public ngOnInit(): void {
  }

  public onClick(button: ButtonT) {
    if (button.action) {
      this.action.call(button.action);
    }
    if (button.route) {
      this.navigate(this.transform.URL(button.route));
    }
  }

  public filterRolesAndConditions(buttons: ButtonT[]): ButtonT[] {
    return this.transform.filterRolesAndConditions(buttons);
  }

  public navigate(path: string) {
    this.navigationService.navigate([path], true);
  }
}
