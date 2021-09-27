import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { ApiService } from '../../../../services/api/api.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { DomainService } from '../../../../services/domain/domain.service';
import { TransformService } from '../../../../services/transform/transform.service';

import { PageOverviewTemplate } from '../../../../../model/page-overview-template';
import { TextareaFieldComponent } from '../../../fields/textarea-field/textarea-field.component';

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

  constructor(
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) { }

  ngOnInit(): void {
  }

  public onNameChanged($event): void {
    this._pageOverviewTemplate.name = $event;
    this.changed.emit({ action: 'changed', index: this.index, pageOverviewTemplate: this._pageOverviewTemplate });
  }

  public onRouteChanged($event): void {
    this._pageOverviewTemplate.route = $event;
    this.changed.emit({ action: 'changed', index: this.index, pageOverviewTemplate: this._pageOverviewTemplate });
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
