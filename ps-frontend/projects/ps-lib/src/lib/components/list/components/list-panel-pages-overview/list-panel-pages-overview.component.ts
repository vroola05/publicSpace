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
  
  @Output() onEvent: EventEmitter<{ action: string, isNew: boolean, data: any }> = new EventEmitter();

  @Input() isNew = true;
  public delete = false;

  public _pageOverviewTemplate: PageOverviewTemplate;
  @Input() pageOverviewTemplate(pageOverviewTemplate: any) {
    console.log('pageOverviewTemplate',pageOverviewTemplate);
    //this._pageOverviewTemplate = pageOverviewTemplate;
  }

  constructor(
    private apiService: ApiService,
    private domainService: DomainService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) { }

  ngOnInit(): void {
  }

  public onNameChanged($event): void {
    console.log(this._pageOverviewTemplate, $event);
    this._pageOverviewTemplate.name = $event;
    this.onEvent.emit({ action: 'changed', isNew: this.isNew, data: this._pageOverviewTemplate });
  }

  public onRouteChanged($event): void {
    this._pageOverviewTemplate.route = $event;
    this.onEvent.emit({ action: 'changed', isNew: this.isNew, data: this._pageOverviewTemplate });
  }

  public onToggleChanged($event): void {
    this._pageOverviewTemplate.toggle = $event;
    this.onEvent.emit({ action: 'changed', isNew: this.isNew, data: this._pageOverviewTemplate });
  }

  public onPriorityChanged($event): void {
    this._pageOverviewTemplate.priority = $event;
    this.onEvent.emit({ action: 'changed', isNew: this.isNew, data: this._pageOverviewTemplate });
  }

  public cancel(): void {
    this.onEvent.emit({
      action: 'cancel',
      isNew: this.isNew,
      data: null
    });
  }

  public onDeleteChanged($event): void {
    this.delete = $event;
  }

  public onSave($event): void {
    const a = this.nameComponent.validate();
    const b = this.routeComponent.validate();
    if (a && b) {
        
    }
  }

}
