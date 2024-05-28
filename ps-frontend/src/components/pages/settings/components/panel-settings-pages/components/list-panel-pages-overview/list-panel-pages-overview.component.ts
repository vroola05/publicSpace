import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { AuthorisationService } from '../../../../../../../services/authorisation/authorisation.service';
import { EndpointService } from '../../../../../../../services/endpoint/endpoint.service';
import { TransformService } from '../../../../../../../services/transform/transform.service';

import { PageOverviewTemplate } from '../../../../../../../model/page-overview-template';
import { TextareaFieldComponent } from '../../../../../../fields/textarea-field/textarea-field.component';
import { DropdownFieldComponent } from '../../../../../../fields/dropdown-field/dropdown-field.component';
import { Status } from '../../../../../../../model/status';


@Component({
  selector: 'app-list-panel-pages-overview',
  templateUrl: './list-panel-pages-overview.component.html',
  styleUrls: ['./list-panel-pages-overview.component.scss']
})
export class ListPanelPagesOverviewComponent implements OnInit {
  @ViewChild('nameComponent') nameComponent: TextareaFieldComponent;
  @ViewChild('routeComponent') routeComponent: TextareaFieldComponent;
  @ViewChild('sizeComponent') sizeComponent: DropdownFieldComponent;

  @Output() changed: EventEmitter<{ action: string, index: number, pageOverviewTemplate: PageOverviewTemplate }> = new EventEmitter<{ action: string, index: number, pageOverviewTemplate: PageOverviewTemplate }>();

  public _pageOverviewTemplate: PageOverviewTemplate;
  @Input() set pageOverviewTemplate(pageOverviewTemplate: any) {
    this._pageOverviewTemplate = pageOverviewTemplate;
  }

  @Input() public index: number;
  @Input() public prefix: string = '';

  public _statusItems: { name: string, value?: string, selected?: boolean, data?: any }[] = [];
  @Input() set statusItems(statusItems: { name: string, value?: string, selected?: boolean, data?: any }[]) {
    this._statusItems = [];
    statusItems.forEach(roleItem => {
      this._statusItems.push({ name: roleItem.name, value: roleItem.value, selected: roleItem.selected, data: roleItem.data });
    });
    this.selectStatusses();
    this.selectSize();
  }

  public _sizes: { name: string, value?: string, data?: any }[] = [
    { name: '25', value: '', data: 25 },
    { name: '50', value: '', data: 50 },
    { name: '75', value: '', data: 75 },
    { name: '100', value: '', data: 100 }
  ];

  constructor(
    private endpoints: EndpointService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) {
    this.getStatus();
  }

  ngOnInit(): void {
  }

  public getId(id: string): string {
    return !id || !this.prefix ? id : this.prefix + (id.charAt(0) !== '[' ? '.'+ id : id);
  }

  public getStatus(): void {
    this.endpoints.get('getStatus').then((statusses: Status[]) => {
      const roleItems: { name: string, value?: string, selected?: boolean, data?: any }[] = [];
      statusses.forEach(status => {
        roleItems.push({ name: status.name, value: String(status.id), data: status });
      });
      this.statusItems = roleItems;
    });
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

  public selectSize() {
    setTimeout(() => {
      if (this.sizeComponent) {
        if (!this._pageOverviewTemplate) {
          this.sizeComponent.select(null);
          return;
        }
        this.sizeComponent.select(this._sizes.find( type => !type.data || type.data === this._pageOverviewTemplate.size));
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

  public onSizeChanged($event) {
    this._pageOverviewTemplate.size = $event.data;
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

  public onButtonsLeftChanged($event) {
    this._pageOverviewTemplate.buttonsLeft = $event;
  }
  
  public onButtonsRightChanged($event) {
    this._pageOverviewTemplate.buttonsRight = $event;
  }

  public onDeleteClick($event): void {
    this.changed.emit({ action: 'delete', index: this.index, pageOverviewTemplate: this._pageOverviewTemplate });
  }
}
