import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AuthorisationService } from '../../../../../services/authorisation/authorisation.service';
import { EnvironmentService } from '../../../../../services/environment/environment.service';
import { TransformService } from '../../../../../services/transform/transform.service';
import { ListTemplateT } from '../../../../../../model/template';
import { ListComponent } from '../../../../list/list.component';
import { Environment } from '../../../../../../model/intefaces';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'lib-panel-settings',
  templateUrl: './panel-settings.component.html',
  styleUrls: ['./panel-settings.component.scss']
})
export class PanelSettingsComponent implements OnInit {
  @ViewChild('listComponent') listComponent: ListComponent;

  @Output() onEvent: EventEmitter<{ action: string, isNew: boolean, data: any }> = new EventEmitter();

  @Input() titleNew = 'Nieuw';
  @Input() data: any[] = [];

  @Input() listTemplate: ListTemplateT;

  public _isNew = false;
  @Input() set isNew(isNew: boolean) {
    this._isNew = isNew;
  }

  public _open = false;
  @Input() set open(open: boolean) {

    this._open = open;
    if (!open) {
      this.close();
    }
  }

  constructor(
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) { }

  public ngOnInit(): void {
  }

  public clicked(data: any) {
    this.onEvent.emit({
      action: 'toggle',
      isNew: false,
      data
    });
  }

  public close() {
    if (this.listComponent) {
      this.listComponent.closeToggle();
    }
  }

  public createNew(): void {
    this.close();

    this.onEvent.emit({
      action: 'create',
      isNew: true,
      data: null
    });
  }
}
