import { Component, OnInit } from '@angular/core';

import { AuthorisationService } from '../../../../../services/authorisation/authorisation.service';
import { EndpointService } from '../../../../../services/endpoint/endpoint.service';
import { TransformService } from '../../../../../services/transform/transform.service';
import { ListTemplateT } from '../../../../../model/template';
import { Group } from '../../../../../model/group';


@Component({
  selector: 'app-panel-settings-groups',
  templateUrl: './panel-settings-groups.component.html',
  styleUrls: ['./panel-settings-groups.component.scss']
})
export class PanelSettingsGroupsComponent implements OnInit {
  public groups: Group[];

  public data: any[] = [];
  public listTemplate: ListTemplateT;
  public isNew = false;
  public open = false;

  public selectedGroup: Group;

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
          name: 'name',
          title: 'Naam',
          type: 'string',
          css: 'col-sm-12 col-md-11 col-lg-11 one'
        }
      ]
    };
  }

  public ngOnInit(): void {
    this.getGroups();
  }

  public getGroups(): void {
    this.endpoints.get('getGroups').then((groups: Group[]) => {
      this.groups = groups;
        this.addListGroups(groups);
    });
  }

  public addListGroups(groups: Group[]) {
    let data = [];
    groups.forEach(domain => {
      data.push({
        id: domain.id,
        name: domain.name
      });
    });
    this.data = data;
  }

  public createNewGroup(): void {
    this.selectedGroup = new Group();
    this.selectedGroup.name = '';
  }

  public events($event): void {
    if ($event.action === 'create') {
      this.createNewGroup();
      this.isNew = true;
      this.open = true;
    } else if ($event.action === 'toggle') {
      this.selectedGroup = this.groups[$event.data.index];
      this.isNew = false;
      this.open = true;
    } else if ($event.action === 'save') {
      this.open = false;
      this.getGroups();
    } else if ($event.action === 'cancel') {
      this.open = false;
    }
  }
}
