import { Component, Input } from '@angular/core';
import { Call } from '../../../../model/call';
import { Order } from '../../../../model/order';
import { Popup } from '../../../../services/popup/popup.service';
import { MapsComponent } from '../../../maps/maps.component';
import { ConfigService } from '../../../../services/config/config.service';
import { ListTemplateT } from '../../../../model/template';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { TransformService } from '../../../../services/transform/transform.service';
import { PageButton } from '../../../../model/page-button';
import { DynamicListPanel } from '../../../../model/intefaces';


@Component({
  selector: 'app-list-panel-order',
  templateUrl: './list-panel-order.component.html',
  styleUrls: ['./list-panel-order.component.scss']
})
export class ListPanelOrderComponent implements DynamicListPanel {
  public getUrlImage = '';

  public buttonsLeft: PageButton[] = [];
  public buttonsRight: PageButton[] = [];

  @Input() template: ListTemplateT = {
    columns: []
  };

  public _order: Order = new Order();

  public _call: Call = new Call();
  @Input() set call(call: Call) {
    this._call = call;
    this._order = call.orders[0];
    // this.getUrlImage = this.transform.URL(this.config.getEndpoint('getImage').endpoint);
    this.buttonsLeft = this.createButtons(this.template.buttonsLeft);
    this.buttonsRight = this.createButtons(this.template.buttonsRight);
  }

  constructor(
    private navigationService: NavigationService,
    private config: ConfigService,
    protected transform: TransformService,
    private popup: Popup
  ) { }

  public createButtons(input: PageButton[]): PageButton[] {
    input = this.transform.filterRolesAndConditions(input);
    const output = [];
    if (input) {
      for (const button of input) {
        const b = {...button};
        const route = this.transform.URL(b.route);
        b.route = route;
        output.push(b);
      }
    }

    return output;
  }

  public hasImages(): boolean {
    return this._call.documents && this._call.documents.length > 0;
  }

  public popupMap($event) {
    this.popup.add(this._call.location.street + ' ' + this._call.location.number, MapsComponent, {
      location: this._call.location,
      classes: 'big',
      controls: true
    });
  }

  public navigate(path: string) {
    this.navigationService.navigate([path], true);
  }
}
