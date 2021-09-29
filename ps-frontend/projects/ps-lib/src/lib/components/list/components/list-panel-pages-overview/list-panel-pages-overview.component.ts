import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { ApiService } from '../../../../services/api/api.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { ConfigService } from '../../../../services/config/config.service';
import { TransformService } from '../../../../services/transform/transform.service';

import { PageOverviewTemplate } from '../../../../../model/page-overview-template';
import { TextareaFieldComponent } from '../../../fields/textarea-field/textarea-field.component';
import { Status } from 'projects/ps-lib/src/model/status';

@Component({
  selector: 'lib-list-panel-pages-overview',
  templateUrl: './list-panel-pages-overview.component.html',
  styleUrls: ['./list-panel-pages-overview.component.scss']
})
export class ListPanelPagesOverviewComponent implements OnInit {
  @ViewChild('nameComponent') nameComponent: TextareaFieldComponent;
  @ViewChild('routeComponent') routeComponent: TextareaFieldComponent;
  
  @Output() changed: EventEmitter<{action: string, index: number, pageOverviewTemplate: PageOverviewTemplate}> = new EventEmitter<{action: string, index: number, pageOverviewTemplate: PageOverviewTemplate}>();

  public _pageOverviewTemplate: PageOverviewTemplate;
  @Input() set pageOverviewTemplate(pageOverviewTemplate: any) {
    this._pageOverviewTemplate = pageOverviewTemplate;
  }
  @Input() public index: number;

  public _statusItems: { name: string, value?: string, selected?: boolean, data?: any }[] = [];
  @Input() set statusItems(statusItems: { name: string, value?: string, selected?: boolean, data?: any }[]) {
    this._statusItems = [];
    statusItems.forEach(roleItem => {
      this._statusItems.push({ name: roleItem.name, value: roleItem.value, selected: roleItem.selected, data: roleItem.data });
    });
    this.selectStatusses();
  }

  constructor(
    private apiService: ApiService,
    private config: ConfigService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) {
    this.getStatus();
  }

  ngOnInit(): void {
  }


  public getStatus(): void {
    const endpointT = this.config.getEndpoint('getStatus');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      let url = this.transform.URL(endpointT.endpoint);

      this.apiService.get(url).subscribe((statusses: Status[]) => {
        const roleItems: { name: string, value?: string, selected?: boolean, data?: any }[] = [];
        statusses.forEach(status => {
          roleItems.push({ name: status.title, value: String(status.id), data: status });
        });
        this.statusItems = roleItems;
      });
    }
  }

  public selectStatusses() {
    setTimeout(() => {
    if (this._pageOverviewTemplate.statusses) {
      this._statusItems.forEach(statusItem => {
        statusItem.selected = this.hasStatus(statusItem.data.id);
      });
    }
  });
  }

  public onNameChanged($event): void {
    this._pageOverviewTemplate.name = $event;
    this.changed.emit({ action: 'changed', index: this.index, pageOverviewTemplate: this._pageOverviewTemplate });
  }

  public onIconChanged($event): void {
    this._pageOverviewTemplate.icon = $event;
    this.changed.emit({ action: 'changed', index: this.index, pageOverviewTemplate: this._pageOverviewTemplate });
  }

  public onRouteChanged($event): void {
    this._pageOverviewTemplate.route = $event;
    this.changed.emit({ action: 'changed', index: this.index, pageOverviewTemplate: this._pageOverviewTemplate });
  }

  public onStatussesChanged($event): void {
    if ($event.checked) {
      if (!this.hasStatus($event.data.data.id)) {
        this._pageOverviewTemplate.statusses.push($event.data.data);
      }
    } else {
      const status = this._pageOverviewTemplate.statusses.find(s => s.id === $event.data.data.id);
      const index = this._pageOverviewTemplate.statusses.indexOf(status);
      if (index >= 0) {
        this._pageOverviewTemplate.statusses.splice(index, 1);
      }
    }
    this.changed.emit({ action: 'changed', index: this.index, pageOverviewTemplate: this._pageOverviewTemplate });
  }

  public hasStatus(id: number): boolean {
    const item = this._pageOverviewTemplate.statusses.find(s => s.id === id);
    if (item) {
      return true;
    }
    return false;
  }

  public onToggleChanged($event): void {
    this._pageOverviewTemplate.toggle = $event;
    this.changed.emit({ action: 'changed', index: this.index, pageOverviewTemplate: this._pageOverviewTemplate });
  }

  public onPriorityChanged($event): void {
    this._pageOverviewTemplate.priority = $event;
    this.changed.emit({ action: 'changed', index: this.index, pageOverviewTemplate: this._pageOverviewTemplate });
  }

  public onIsPersonalChanged($event): void {
    this._pageOverviewTemplate.personal = $event;
    this.changed.emit({ action: 'changed', index: this.index, pageOverviewTemplate: this._pageOverviewTemplate });
  }

  public onColumnsChanged($event): void {
    switch ($event.action) {
      case 'changed': 
        this._pageOverviewTemplate.columns = $event.columns;
        this.changed.emit({ action: 'changed', index: this.index, pageOverviewTemplate: this._pageOverviewTemplate });
        break;
    }
  }

  public onDeleteClick($event): void {
    this.changed.emit({ action: 'delete', index: this.index, pageOverviewTemplate: this._pageOverviewTemplate });
  }
}
