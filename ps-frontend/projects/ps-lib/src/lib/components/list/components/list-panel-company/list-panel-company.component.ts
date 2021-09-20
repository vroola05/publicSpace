import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { ApiService } from '../../../../services/api/api.service';
import { AuthorisationService } from '../../../../services/authorisation/authorisation.service';
import { DomainService } from '../../../../services/domain/domain.service';
import { TransformService } from '../../../../services/transform/transform.service';

import { Company } from '../../../../../model/company';

import { TextareaFieldComponent } from '../../../fields/textarea-field/textarea-field.component';

@Component({
  selector: 'lib-list-panel-company',
  templateUrl: './list-panel-company.component.html',
  styleUrls: ['./list-panel-company.component.scss']
})
export class ListPanelCompanyComponent implements OnInit {
  @ViewChild('companyComponent') companyComponent: TextareaFieldComponent;
  
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
    }
  }
  
  constructor(
    private apiService: ApiService,
    private domainService: DomainService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) { }

  public ngOnInit(): void {
  }

  public onCompanyChanged($event) {
    if (this.companyComponent.validate()) {
      this._company.name = $event;
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
      if (this.isNew) {
        this.postCompany(this._company);
      } else {
        this.putCompany(this._company);
      }
    }
  }

  public postCompany(company: Company): void {
    const endpointT = this.domainService.getEndpoint('postCompany');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      let url = this.transform.URL(endpointT.endpoint);
      this.apiService.post(url, company).subscribe((d: Company) => {
        this.onEvent.emit({
          action: 'save',
          isNew: this.isNew,
          data: null
        });
      },
      (response) => {
        this.setErrors(response);
      });
    }
  }

  public putCompany(company: Company): void {
    const endpointT = this.domainService.getEndpoint('putCompany');
    if (this.authorisation.hasRoles(endpointT.roles)) {
      this.transform.setVariable('company', company);
      let url = this.transform.URL(endpointT.endpoint);
      this.transform.deleteVariable('company');
      this.apiService.put(url, company).subscribe((d: Company) => {
        this.onEvent.emit({
          action: 'save',
          isNew: this.isNew,
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
          case 'name':
            this.companyComponent.addError(error.value);
            break;
        }
      });
    }
  }
}
