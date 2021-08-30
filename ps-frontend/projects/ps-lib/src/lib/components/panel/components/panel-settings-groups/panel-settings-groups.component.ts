import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../../../services/api/api.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { DomainService } from '../../../../services/domain/domain.service';
import { TransformService } from '../../../../services/transform/transform.service';
import { ListTemplateT } from '../../../../../model/template';
import { Group } from '../../../../../model/group';
import { first } from 'rxjs/operators';

@Component({
  selector: 'lib-panel-settings-groups',
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
    private apiService: ApiService,
    private domain: DomainService,
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
    this.getGroups();
  }

  public getGroups(): void {
    const endpointT = this.domain.getEndpoint('getGroups');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      this.apiService.get(this.transform.URL(endpointT.endpoint)).pipe(first()).subscribe((groups: Group[]) => {
        this.groups = groups;
        this.addListGroups(groups);
      });
    }
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
      const d = this.groups.find(group => { return group.id === $event.data.id});
      this.selectedGroup = d;
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
