import { Component, Input } from '@angular/core';
import { Call } from '../../../../model/call';
import { Popup } from '../../../../services/popup/popup.service';
import { MapsComponent } from '../../../maps/maps.component';
import { ConfigService } from '../../../../services/config/config.service';
import { ListTemplateT } from '../../../../model/template';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { TransformService } from '../../../../services/transform/transform.service';
import { PageButton } from '../../../../model/page-button';
import { DynamicListPanel } from '../../../../model/intefaces';

@Component({
  selector: 'app-list-panel',
  templateUrl: './list-panel.component.html',
  styleUrls: ['./list-panel.component.scss']
})
export class ListPanelComponent implements DynamicListPanel {
  public getUrlImage = '';

  public buttonsLeft: PageButton[] = [];
  public buttonsRight: PageButton[] = [];

  @Input() template: ListTemplateT = {
    columns: []
  };

  public _call: Call = new Call();
  @Input() set call(call: Call) {
    this._call = call;
    // this.getUrlImage = this.transform.URL(this.domain.getEndpoint('getImage').endpoint);
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
