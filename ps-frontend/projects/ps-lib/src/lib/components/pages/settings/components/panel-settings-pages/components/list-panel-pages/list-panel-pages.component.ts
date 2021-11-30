import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { AuthorisationService } from '../../../../../../../services/authorisation/authorisation.service';
import { TransformService } from '../../../../../../../services/transform/transform.service';
import { ValidationService } from '../../../../../../../services/validation/validation.service';
import { EndpointService } from '../../../../../../../services/endpoint/endpoint.service';

import { Page } from '../../../../../../../../model/page';
import { TextareaFieldComponent } from '../../../../../../fields/textarea-field/textarea-field.component';
import { DropdownFieldComponent } from '../../../../../../fields/dropdown-field/dropdown-field.component';
import { PageLayoutType } from 'projects/ps-lib/src/model/intefaces';


@Component({
  selector: 'lib-list-panel-pages',
  templateUrl: './list-panel-pages.component.html',
  styleUrls: ['./list-panel-pages.component.scss']
})
export class ListPanelPagesComponent implements OnInit {
  @ViewChild('pageNameComponent') pageNameComponent: TextareaFieldComponent;
  @ViewChild('layoutTypeComponent') layoutTypeComponent: DropdownFieldComponent;
  
  @Output() onEvent: EventEmitter<{ action: string, isNew: boolean, data: any }> = new EventEmitter();

  public layoutTypeItems: { name: string, value?: string, data?: any }[] = [
    { name: 'Standaard', value: PageLayoutType.page },
    { name: 'Sticky', value: PageLayoutType.pageStickyButtons },
    { name: 'Overzicht', value: PageLayoutType.overview }
  ];

  public _page: Page;
  @Input() set page(page: Page){
    this._page = new Page();
    if (page) {
      this._page.id = page.id;
      this._page.name = page.name;
      this._page.pageType = page.pageType;
      this._page.layoutType = page.layoutType;
      this._page.pageOverviewTemplate = page.pageOverviewTemplate;
      this._page.buttonsLeft = page.buttonsLeft;
      this._page.buttonsRight = page.buttonsRight;
      
      if(this.layoutTypeComponent) {
        this.layoutTypeComponent.select(this.layoutTypeItems.find(layoutType => layoutType.value === page.layoutType));
      }
    }
  }

  constructor(
    private endpoints: EndpointService,
    private validation: ValidationService,
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

  public onOverviewChanged($event) {
    
  }

  public onLayoutTypeChanged($event) {
    if (this.layoutTypeComponent.validate()) {
      this._page.layoutType = $event.value;
    }
  }

  public showPage(pageTypeName: string): boolean {
    if (this._page && this._page.pageType && this._page.pageType.name === pageTypeName) {
        return true;
    }
    return false;
  }

  public cancel(): void {
    this.onEvent.emit({
      action: 'cancel',
      isNew: false,
      data: null
    });
  }

  public onSave($event): void {
    if (this.validation.validate('pages')) {
      this.transform.setVariable('page', this._page);
      this.put(this._page);
    }
  }

  public put(page: Page): void {
    this.endpoints.put('putPage', page).then((p: Page) => {
      this.validation.errors = [];
      this.onEvent.emit({
        action: 'save',
        isNew: false,
        data: null
      });
    })
    .catch((response) => {
      this.setErrors(response);
    });
  }

  public setErrors(response: any): void {
    if(response && response.error && response.error.errors) {
      const errors = response.error.errors as {field: string, value: string}[];
      this.validation.errors = errors;
    }
  }
}
