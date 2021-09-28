import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../../../services/api/api.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { ConfigService } from '../../../../services/config/config.service';
import { TransformService } from '../../../../services/transform/transform.service';
import { ListTemplateT } from '../../../../../model/template';
import { first } from 'rxjs/operators';

import { Status } from '../../../../../model/status';

@Component({
  selector: 'lib-panel-settings-status',
  templateUrl: './panel-settings-status.component.html',
  styleUrls: ['./panel-settings-status.component.scss']
})
export class PanelSettingsStatusComponent implements OnInit {
  public status: Status[];

  public data: any[] = [];
  public listTemplate: ListTemplateT;
  public isNew = false;
  public open = false;

  public selectedStatus: Status;

  constructor(
    private apiService: ApiService,
    private config: ConfigService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) {

    this.listTemplate = {
      toggle: true,
      columns: [
        {
          id: 'id',
          name: 'Id',
          type: 'number',
          css: 'col-sm-12 col-md-1 col-lg-1 bold'
        },
        {
          id: 'name',
          name: 'Naam',
          type: 'string',
          css: 'col-sm-12 col-md-11 col-lg-11'
        }
      ]
    };
  }

  public ngOnInit(): void {
    this.getStatus();
  }

  public getStatus(): void {
    const endpointT = this.config.getEndpoint('getStatus');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      this.apiService.get(this.transform.URL(endpointT.endpoint)).pipe(first()).subscribe((status: Status[]) => {
        this.status = status;
        this.addListStatus(status);
      });
    }
  }

  public addListStatus(status: Status[]) {
    let data = [];
    status.forEach(status => {
      data.push({
        id: status.id,
        name: status.name
      });
    });
    this.data = data;
  }

  public createNew(): void {
    this.selectedStatus = new Status();
    this.selectedStatus.name = '';
  }

  public events($event): void {
    if ($event.action === 'create') {
      this.createNew();
      this.isNew = true;
      this.open = true;
    } else if ($event.action === 'toggle') {
      this.selectedStatus = this.status[$event.data.index];
      this.isNew = false;
      this.open = true;
    } else if ($event.action === 'save') {
      this.open = false;
      this.getStatus();
    } else if ($event.action === 'cancel') {
      this.open = false;
    }
  }

}
