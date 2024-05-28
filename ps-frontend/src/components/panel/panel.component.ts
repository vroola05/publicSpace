import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PageLayoutType } from '../../model/intefaces';
import { ActionService } from '../../services/action/action.service';
import { NavigationService } from '../../services/navigation/navigation.service';
import { TransformService } from '../../services/transform/transform.service';
import { PageButton } from '../../model/page-button';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, OnDestroy {
  private subscribtions: Subscription[] = [];

  @Input() public pageLayoutType: PageLayoutType = 'page';
  private _buttonsLeft: PageButton[] = [];
  private _buttonsRight: PageButton[] = [];

  public buttonsLeftFiltered: PageButton[] = [];
  public buttonsRightFiltered: PageButton[] = [];

  @Input() public set buttonsLeft(buttonsLeft: PageButton[]) {
    this._buttonsLeft = buttonsLeft;
    this.buttonsLeftFiltered = this.filterRolesAndConditions(buttonsLeft);
  };

  @Input() public set buttonsRight(buttonsRight: PageButton[]) {
    this._buttonsRight = buttonsRight;
    this.buttonsRightFiltered = this.filterRolesAndConditions(buttonsRight);
  };

  @Input() public data: any;

  constructor(
    private action: ActionService,
    private navigationService: NavigationService,
    protected transform: TransformService
    ) { }

  public ngOnInit(): void {
    this.subscribtions.push(this.transform.getVariableChangedObservable().subscribe(
      (variableChanged) => {
        this.buttonsLeftFiltered = this.filterRolesAndConditions(this._buttonsLeft);
        this.buttonsRightFiltered = this.filterRolesAndConditions(this._buttonsRight);
      }
    ));
  }

  public ngOnDestroy(): void {
    this.subscribtions.forEach(subscribtion => subscribtion.unsubscribe());
  }
 
  public onClick(button: PageButton) {
    if (button.action) {
      this.action.call(button.action).then(value => {
        if (value && button.route) {
          this.navigate(this.transform.URL(button.route));
        }
      });
    } else if (button.route) {
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
