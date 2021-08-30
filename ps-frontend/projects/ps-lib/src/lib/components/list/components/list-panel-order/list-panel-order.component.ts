import { Component, Input } from '@angular/core';
import { Call } from '../../../../../model/call';
import { Popup } from '../../../../services/popup/popup.service';
import { MapsComponent } from '../../../maps/maps.component';
import { DomainService } from '../../../../services/domain/domain.service';
import { ButtonT, ListTemplateT } from '../../../../../model/template';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { TransformService } from '../../../../services/transform/transform.service';


@Component({
  selector: 'lib-list-panel-order',
  templateUrl: './list-panel-order.component.html',
  styleUrls: ['./list-panel-order.component.scss']
})
export class ListPanelOrderComponent {
  public getUrlImage = '';

  public buttonsLeft: ButtonT[] = [];
  public buttonsRight: ButtonT[] = [];

  @Input() template: ListTemplateT;

  public _call: Call;
  @Input() set call(call: Call) {
    this._call = call;
    this.getUrlImage = this.transform.URL(this.domain.getEndpoint('getImage').endpoint);
    this.buttonsLeft = this.createButtons(this.template.buttonsLeft);
    this.buttonsRight = this.createButtons(this.template.buttonsRight);
  }

  constructor(
    private navigationService: NavigationService,
    private domain: DomainService,
    protected transform: TransformService,
    private popup: Popup
  ) { }

  public createButtons(input: ButtonT[]): ButtonT[] {
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
      zoom: true,
      pan: true,
      zoomControl: true
    });
  }

  public navigate(path: string) {
    this.navigationService.navigate([path], true);
  }
}
