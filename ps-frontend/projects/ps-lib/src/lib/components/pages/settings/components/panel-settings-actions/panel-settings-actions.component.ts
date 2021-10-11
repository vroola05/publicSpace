import { Component, OnInit } from '@angular/core';

import { AuthorisationService } from '../../../../../services/authorisation/authorisation.service';
import { TransformService } from '../../../../../services/transform/transform.service';
import { ListTemplateT } from '../../../../../../model/template';
import { Action } from '../../../../../../model/action';
import { EndpointService } from '../../../../../services/endpoint/endpoint.service';


@Component({
  selector: 'lib-panel-settings-actions',
  templateUrl: './panel-settings-actions.component.html',
  styleUrls: ['./panel-settings-actions.component.scss']
})
export class PanelSettingsActionsComponent implements OnInit {
  public actions: Action[];

  public data: any[] = [];
  public listTemplate: ListTemplateT;
  public open = false;

  public selectedAction: Action;

  constructor(
    private endpoints: EndpointService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) {

    this.listTemplate = {
      toggle: true,
      columns: [
        {
          name: 'id',
          title: 'Id',
          type: 'number',
          css: 'col-sm-12 col-md-1 col-lg-1 bold'
        },
        {
          name: 'action',
          title: 'Actie',
          type: 'string',
          css: 'col-sm-12 col-md-5 col-lg-5'
        },
        {
          name: 'status',
          title: 'Status',
          type: 'string',
          css: 'col-sm-12 col-md-6 col-lg-6'
        }
      ]
    };
  }

  public ngOnInit(): void {
    this.getActions();
  }

  public getActions(): void {
    this.endpoints.get('getActions').then((actions: Action[]) => {
      this.actions = actions;
      this.addListActions(actions);
    });
  }

  public addListActions(actions: Action[]) {
    let data = [];
    actions.forEach(action => {
      data.push({
        id: action.id,
        action: action.actionType.name,
        status: !action.status ? '' : action.status.name
      });
    });
    this.data = data;
  }

  public events($event): void {
    if ($event.action === 'toggle') {
      this.selectedAction = this.actions[$event.data.index];
      this.open = true;
    } else if ($event.action === 'save') {
      this.open = false;
      this.getActions();
    } else if ($event.action === 'cancel') {
      this.open = false;
    }
  }
}
