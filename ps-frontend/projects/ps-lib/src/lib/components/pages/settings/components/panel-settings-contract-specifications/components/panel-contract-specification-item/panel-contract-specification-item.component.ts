import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TextFieldComponent } from '../../../../../../fields/text-field/text-field.component';
import { ContractSpecificationItem } from '../../../../../../../../model/contract-specification-item';

@Component({
  selector: 'lib-panel-contract-specification-item',
  templateUrl: './panel-contract-specification-item.component.html',
  styleUrls: ['./panel-contract-specification-item.component.scss']
})
export class PanelContractSpecificationItemComponent implements OnInit {
  @ViewChild('nameComponent') nameComponent: TextFieldComponent;
  @ViewChild('specificationNumberComponent') specificationNumberComponent: TextFieldComponent;
  @ViewChild('priceComponent') priceComponent: TextFieldComponent;
  @ViewChild('unitComponent') unitComponent: TextFieldComponent;

  @Output() changed: EventEmitter<{action: string, index: number, contractSpecificationItem: ContractSpecificationItem}> = new EventEmitter<{action: string, index: number, contractSpecificationItem: ContractSpecificationItem}>();

  @Input() public index: number;
  @Input() public prefix: string = '';

  @Input() contractSpecificationItem: ContractSpecificationItem;
  constructor() { }

  ngOnInit(): void {
  }

  public getId(id: string): string {
    return !id || !this.prefix ? id : this.prefix + (id.charAt(0) !== '[' ? '.'+ id : id);
  }

  public onNameChanged($event): void {
    if (this.nameComponent.validate()) {
      this.contractSpecificationItem.name = $event;
      this.changed.emit({action: 'changed', index: this.index, contractSpecificationItem: this.contractSpecificationItem});
    }
  }

  public onSpecificationNumberChanged($event): void {
    if (this.specificationNumberComponent.validate()) {
      this.contractSpecificationItem.specificationNumber = $event;
      this.changed.emit({action: 'changed', index: this.index, contractSpecificationItem: this.contractSpecificationItem});
    }
  }
  
  public onPriceChanged($event): void {
    if (this.priceComponent.validate()) {
      this.contractSpecificationItem.price = $event;
      this.changed.emit({action: 'changed', index: this.index, contractSpecificationItem: this.contractSpecificationItem});
    }
  }

  public onUnitChanged($event): void {
    if (this.unitComponent.validate()) {
      this.contractSpecificationItem.unit = $event;
      this.changed.emit({action: 'changed', index: this.index, contractSpecificationItem: this.contractSpecificationItem});
    }
  }

  public onActiveChanged($event): void {
    this.contractSpecificationItem.active = $event;
  }

  public onDeleteClick($event): void {
    this.changed.emit({action: 'delete', index: this.index, contractSpecificationItem: this.contractSpecificationItem});
  }
}
