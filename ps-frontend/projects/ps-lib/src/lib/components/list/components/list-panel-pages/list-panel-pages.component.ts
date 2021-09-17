import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import { ApiService } from '../../../../services/api/api.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { DomainService } from '../../../../services/domain/domain.service';
import { TransformService } from '../../../../services/transform/transform.service';

import { first } from 'rxjs/operators';
import { Page } from '../../../../../model/page';
import { TextareaFieldComponent } from '../../../fields/textarea-field/textarea-field.component';

@Component({
  selector: 'lib-list-panel-pages',
  templateUrl: './list-panel-pages.component.html',
  styleUrls: ['./list-panel-pages.component.scss']
})
export class ListPanelPagesComponent implements OnInit {
  @ViewChild('pageNameComponent') pageNameComponent: TextareaFieldComponent;

  @Output() onEvent: EventEmitter<{ action: string, isNew: boolean, data: any }> = new EventEmitter();

  public _page: Page;
  @Input() set page(page: Page){
    this._page = new Page();
    if (page) {
      this._page.id = page.id;
      this._page.name = page.name;
      this._page.pageType = page.pageType;
      this._page.buttonsLeft = page.buttonsLeft;
      this._page.buttonsRight = page.buttonsRight;
    }
  }

  constructor(
    private apiService: ApiService,
    private domainService: DomainService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) {
  }

  public ngOnInit(): void {
    
  }

  public ngOnDestroy(): void {
    this.transform.deleteVariable('page');
  }

  
  public onPageNameChanged($event) {
    if (this.pageNameComponent.validate()) {
      this._page.name = $event;
    }
  }

  public onButtonsLeftChanged($event) {
    this._page.buttonsLeft = $event;
  }
  
  public onButtonsRightChanged($event) {
    this._page.buttonsRight = $event;
  }

  public cancel(): void {
    this.onEvent.emit({
      action: 'cancel',
      isNew: false,
      data: null
    });
  }

  public onSave($event): void {
    const a = this.pageNameComponent.validate();
    if (a) {
      this.transform.setVariable('page', this._page);
      this.put(this._page);
    }
  }

  public put(page: Page): void {
    const endpointT = this.domainService.getEndpoint('putPage');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      let url = this.transform.URL(endpointT.endpoint);
      console.log('page', page);
      this.apiService.put(url, page).subscribe((p: Page) => {
        this.onEvent.emit({
          action: 'save',
          isNew: false,
          data: null
        });
      },
      (response) => {
        this.setErrors(response);
      });
    }
  }

  public setErrors(response: any): void {
    if(response && response.error && response.error.errors) {
      const errors = response.error.errors as {field: string, value: string}[];
      errors.forEach(error => {
        switch(error.field) {
          case 'status':
            
            break;
        }
      });
    }
  }
}
