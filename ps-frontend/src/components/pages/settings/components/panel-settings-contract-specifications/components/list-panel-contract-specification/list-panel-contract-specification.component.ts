import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DateFieldComponent } from '../../../../../../fields/date-field/date-field.component';
import { DropdownFieldComponent } from '../../../../../../fields/dropdown-field/dropdown-field.component';
import { TextFieldComponent } from '../../../../../../fields/text-field/text-field.component';
import { AuthorisationService } from '../../../../../../../services/authorisation/authorisation.service';
import { EndpointService } from '../../../../../../../services/endpoint/endpoint.service';
import { TransformService } from '../../../../../../../services/transform/transform.service';
import { Contract } from '../../../../../../../model/contract';
import { ContractSpecification } from '../../../../../../../model/contract-specification';
import { ValidationService } from '../../../../../../../services/validation/validation.service';
import { ContractSpecificationItem } from '../../../../../../../model/contract-specification-item';

@Component({
  selector: 'app-list-panel-contract-specification',
  templateUrl: './list-panel-contract-specification.component.html',
  styleUrls: ['./list-panel-contract-specification.component.scss']
})
export class ListPanelContractSpecificationComponent implements OnInit {
  @ViewChild('descriptionComponent') descriptionComponent: TextFieldComponent;
  @ViewChild('startDateComponent') startDateComponent: DateFieldComponent;
  @ViewChild('endDateComponent') endDateComponent: DateFieldComponent;

  @Output() onEvent: EventEmitter<{ action: string, isNew: boolean, data: any }> = new EventEmitter();

  @Input() isNew = true;

  public delete = false;

  public _contract: Contract;
  @Input() set contract(contract: Contract){
    this.transform.setVariable('contract', contract);
    this._contract = contract;
  }
  
  public _contractSpecification: ContractSpecification;
  @Input() set contractSpecification(contractSpecification: ContractSpecification){
    this.delete = false;
    this._contractSpecification = new ContractSpecification();
    if (contractSpecification) {
      this._contractSpecification.id = contractSpecification.id;
      this._contractSpecification.description = contractSpecification.description;
      this._contractSpecification.dateCreated = contractSpecification.dateCreated;
      this._contractSpecification.dateStart = contractSpecification.dateStart;
      this._contractSpecification.dateEnd = contractSpecification.dateEnd;
      this._contractSpecification.active = contractSpecification.active;
      this._contractSpecification.contractSpecificationItems = contractSpecification.contractSpecificationItems;
    }
  }

  public groupItems: { name: string, value?: string, data?: any }[] = [];

  constructor(
    private validation: ValidationService,
    private endpoints: EndpointService,
    protected authorisation: AuthorisationService,
    protected transform: TransformService
  ) {
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.transform.deleteVariable('mainCategory');
    this.transform.deleteVariable('category');
  }

  public onDescriptionChanged($event): void {
    if (this.descriptionComponent.validate()) {
      this._contractSpecification.description = $event;
    }
  }
  
  public onActiveChanged($event): void {
    this._contractSpecification.active = $event;
  }

  public onStartDateChanged($event): void {
    if (this.startDateComponent.validate()) {
      this._contractSpecification.dateStart = new Date($event);
    }
  }

  public onEndDateChanged($event): void {
    if (this.endDateComponent.validate()) {
      this._contractSpecification.dateEnd = new Date($event);
    }
  }
  
  public onContractSpecificationItemAddClick($event) {
    if (!this._contractSpecification.contractSpecificationItems) {
      this._contractSpecification.contractSpecificationItems = [];
    }
    const contractSpecificationItem = new ContractSpecificationItem();
    contractSpecificationItem.name = '';
    contractSpecificationItem.specificationNumber = '';
    contractSpecificationItem.price = '';
    contractSpecificationItem.unit = '';
    contractSpecificationItem.active = true;
    this._contractSpecification.contractSpecificationItems.push(contractSpecificationItem);
  }

  public onContractSpecificationItemChanged($event: {action: string, index: number, contractSpecificationItem: ContractSpecificationItem}): void {
    switch($event.action) {
      case 'delete':
        this._contractSpecification.contractSpecificationItems.splice($event.index, 1);
        break;
      case 'changed':
        //this._contractSpecification.contractSpecificationItems[$event.index] = $event.contractSpecificationItem;
        break;
    }
  }


  public onDeleteChanged($event): void {
  }



  public cancel(): void {
    this.onEvent.emit({
      action: 'cancel',
      isNew: this.isNew,
      data: null
    });
  }

  public postContractSpecification(contractSpecification: ContractSpecification): void {
    this.endpoints.post('postContractSpecification', contractSpecification).then((c: ContractSpecification) => {
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

  public putContractSpecification(contractSpecification: ContractSpecification): void {
    this.endpoints.post('putContractSpecification', contractSpecification).then((c: ContractSpecification) => {
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
  

  public onSave($event): void {
    this.validation.clear();
    if (this.validation.validate('contract-specification')) {
      this.transform.setVariable('contractSpecification', this._contractSpecification);
      if (this.isNew) {
        this.postContractSpecification(this._contractSpecification);
      } else {
        this.putContractSpecification(this._contractSpecification);
      }
    }
  }

  public setErrors(response: any): void {
    if(response && response.error && response.error.errors) {
      const errors = response.error.errors as {field: string, value: string}[];
      errors.forEach(error => {
        switch(error.field) {
          case 'description':
            this.descriptionComponent.addError(error.value);
            break;
          case 'startDate':
            this.startDateComponent.addError(error.value);
            break;
          case 'endDate':
            this.endDateComponent.addError(error.value);
            break;
        }
      });
    }
  }
}
