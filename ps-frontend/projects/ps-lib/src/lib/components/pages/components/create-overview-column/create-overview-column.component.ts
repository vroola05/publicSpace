import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PageOverviewColumns } from '../../../../../model/page-overview-columns';
import { DropdownFieldComponent } from '../../../fields/dropdown-field/dropdown-field.component';
import { TextareaFieldComponent } from '../../../fields/textarea-field/textarea-field.component';

@Component({
  selector: 'lib-create-overview-column',
  templateUrl: './create-overview-column.component.html',
  styleUrls: ['./create-overview-column.component.css']
})
export class CreateOverviewColumnComponent implements OnInit {
  @ViewChild('nameComponent') nameComponent: TextareaFieldComponent;
  @ViewChild('titleComponent') titleComponent: TextareaFieldComponent;
  @ViewChild('typeComponent') typeComponent: DropdownFieldComponent;
  @ViewChild('filterComponent') filterComponent: DropdownFieldComponent;
  @ViewChild('cssComponent') cssComponent: TextareaFieldComponent;
  @ViewChild('mobileComponent') mobileComponent: DropdownFieldComponent;

  @Output() changed: EventEmitter<{action: string, index: number, column: PageOverviewColumns}> = new EventEmitter<{action: string, index: number, column: PageOverviewColumns}>();
  
  @Input() public index: number;

  public _column: PageOverviewColumns;
  @Input() set column(column: PageOverviewColumns) {
    this._column = column;
    this.selectType();
    this.selectFilter();
  }

  public _types: { name: string, value?: string, data?: any }[] = [
    { name: 'Text', value: '', data: 'text' },
    { name: 'String', value: '', data: 'string' },
    { name: 'Nummer', value: '', data: 'number' },
    { name: 'Datum', value: '', data: 'date' }
  ];

  public _filters: { name: string, value?: string, data?: any }[] = [
    { name: 'Gelijk', value: '', data: 'equals' },
    { name: 'Tussen', value: '', data: 'between' },
    { name: 'Lijst', value: '', data: 'in' }
  ];

  public _mobile: { name: string, value?: string, data?: any }[] = [
    { name: 'Onzichtbaar', value: '', data: '' },
    { name: 'Regel 1', value: '', data: 'one' },
    { name: 'Regel 2', value: '', data: 'two' },
    { name: 'Regel 3a', value: '', data: 'three-a' },
    { name: 'Regel 3b', value: '', data: 'three-b' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  public selectType() {
    setTimeout(() => {
      if (this.typeComponent) {
        if (!this._column) {
          this.typeComponent.select(null);
          return;
        }
        const item = this._types.find( type => !type.data || type.data === this._column.type);
        if (item) {
          this.typeComponent.select(item);
        }
      }  
    });
  }

  public selectFilter() {
    setTimeout(() => {
      if (this.filterComponent) {
        if (!this._column) {
          this.filterComponent.select(null);
          return;
        }
        const item = this._filters.find( type => !type.data || type.data === this._column.filter);
        if (item) {
          this.filterComponent.select(item);
        }
      }  
    });
  }
  
  public selectMobile() {
    setTimeout(() => {
      if (this.mobileComponent) {
        if (!this._column) {
          this.mobileComponent.select(null);
          return;
        }
        const item = this._mobile.find( type => !type.data || type.data === this._column.mobile);
        if (item) {
          this.mobileComponent.select(item);
        }
      }  
    });
  }

  public onNameChanged($event) {
    this._column.name = $event;
    this.changed.emit({action: 'changed', index: this.index, column: this._column});
  }

  public onTitleChanged($event) {
    this._column.title = $event;
    this.changed.emit({action: 'changed', index: this.index, column: this._column});
  }

  public onTypeChanged($event) {
    this._column.type = $event.data;
    this.changed.emit({action: 'changed', index: this.index, column: this._column});
  }

  public onFilterChanged($event) {
    this._column.filter = $event.data;
    this.changed.emit({action: 'changed', index: this.index, column: this._column});
  }

  public onCssChanged($event) {
    this._column.css = $event;
    this.changed.emit({action: 'changed', index: this.index, column: this._column});
  }

  public onMobileChanged($event) {
    this._column.mobile = $event.data;
    this.changed.emit({action: 'changed', index: this.index, column: this._column});
  }

/*
  public onOperatorChanged($event) {
    this._condition.operator = $event.data;
    this.changed.emit({action: 'changed', index: this.index, column: this._column});
  }
  
  public onValueChanged($event) {
    this._condition.value = $event;
    this.changed.emit({action: 'changed', index: this.index, column: this._column});
  }
*/

public onDeleteClick($event): void {
  this.changed.emit({action: 'delete', index: this.index, column: this._column});
}
}
