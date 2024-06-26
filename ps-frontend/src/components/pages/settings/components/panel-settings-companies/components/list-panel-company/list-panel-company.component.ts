import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { AuthorisationService } from '../../../../../../../services/authorisation/authorisation.service';
import { TransformService } from '../../../../../../../services/transform/transform.service';
import { EndpointService } from '../../../../../../../services/endpoint/endpoint.service';

import { Company } from '../../../../../../../model/company';

import { TextareaFieldComponent } from '../../../../../../fields/textarea-field/textarea-field.component';



@Component({
  selector: 'app-list-panel-company',
  templateUrl: './list-panel-company.component.html',
  styleUrls: ['./list-panel-company.component.scss']
})
export class ListPanelCompanyComponent implements OnInit {
  @ViewChild('companyComponent') companyComponent: TextareaFieldComponent;
  @ViewChild('codeComponent') codeComponent: TextareaFieldComponent;
  
  @ViewChild('sridComponent') sridComponent: TextareaFieldComponent;
  @ViewChild('latitudeComponent') latitudeComponent: TextareaFieldComponent;
  @ViewChild('longitudeComponent') longitudeComponent: TextareaFieldComponent;
  
  @Output() onEvent: EventEmitter<{ action: string, isNew: boolean, data: any }> = new EventEmitter();

  @Input() isNew = true;

  public delete = false;

  public _company: Company;
  @Input() set company(company: Company){
    this.delete = false;
    this._company = new Company();
    if (company) {
      this._company.id = company.id;
      this._company.name = company.name;
      this._company.code = company.code;
      this._company.srid = company.srid;
      this._company.x = company.x;
      this._company.y = company.y;
    }
  }
  
  constructor(
    private endpoints: EndpointService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService,
  ) { }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.transform.deleteVariable('company');
  }

  public onCompanyChanged($event) {
    if (this.companyComponent.validate()) {
      this._company.name = $event;
    }
  }

  public onCodeChanged($event) {
    if (this.codeComponent.validate()) {
      this._company.code = $event;
    }
  }

  public onSridChanged($event) {
    if (this.sridComponent.validate()) {
      this._company.srid = $event;
    }
  }

  public onXChanged($event) {
    if (this.latitudeComponent.validate()) {
      this._company.x = $event;
    }
  }

  public onYChanged($event) {
    if (this.longitudeComponent.validate()) {
      this._company.y = $event;
    }
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
    const a = this.companyComponent.validate();
    if (a) {
      this.transform.setVariable('company', this._company);
      if (this.isNew) {
        this.postCompany(this._company);
      } else {
        this.putCompany(this._company);
      }
    }
  }

  public postCompany(company: Company): void {
    this.endpoints.post('postCompany', company).then((d: Company) => {
      this.onEvent.emit({
        action: 'save',
        isNew: this.isNew,
        data: null
      });
    })
    .catch((response) => {
      this.setErrors(response);
    });
  }

  public putCompany(company: Company): void {
    this.endpoints.put('putCompany', company).then((d: Company) => {
      this.onEvent.emit({
        action: 'save',
        isNew: this.isNew,
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
      errors.forEach(error => {
        switch(error.field) {
          case 'name':
            this.companyComponent.addError(error.value);
            break;
        }
      });
    }
  }
}
