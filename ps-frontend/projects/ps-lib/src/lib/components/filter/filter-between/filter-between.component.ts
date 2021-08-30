import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilterService } from '../../../services/filter/filter.service';
import {FilterType} from '../../../../model/query-parameters';
import moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'lib-filter-between',
  templateUrl: './filter-between.component.html',
  styleUrls: ['./filter-between.component.scss']
})
export class FilterBetweenComponent implements OnInit {
  @Output() changed: EventEmitter<any> = new EventEmitter();

  @Input() title: string;
  @Input() id: string;
  @Input() type: string;

  public hasFilter: boolean;

  public valueFrom = '';
  public valueTo = '';

  constructor(
    protected filterService: FilterService
  ) { }

  public ngOnInit(): void {
    const value = this.filterService.getFilterValue(this.id);
    if (value) {
      if (value.from) {
        this.valueFrom = moment(new Date(value.from)).format('YYYY-MM-DD');
      }
      if (value.to) {
        this.valueTo = moment(new Date(value.to)).format('YYYY-MM-DD');
      }
    }
    this.checkHasFilter();
  }

  private checkHasFilter() {
    if ((this.valueFrom && this.valueFrom !== '') || (this.valueTo && this.valueTo !== '')) {
      this.hasFilter = true;
    } else {
      this.hasFilter = false;
    }
  }
  public getServiceValue(): {from: any, to: any} {
    const value = this.filterService.getFilterValue(this.id);
    return value;
  }
  public onChangeFrom(value: any) {
    this.valueFrom = !value.target.value ? '' : value.target.value;
    this.checkHasFilter();
    this.changeValue();
  }

  public onChangeTo(value: any) {
    this.valueTo = !value.target.value ? '' : value.target.value;
    this.checkHasFilter();
    this.changeValue();
  }

  public onDateChangeFrom(value: MatDatepickerInputEvent<any>) {
    this.valueFrom = value.value === null ? '' : moment(value.value).format('YYYY-MM-DD');
    this.checkHasFilter();
    this.changeValue();
  }

  public onDateChangeTo(value: MatDatepickerInputEvent<any>) {
    this.valueTo = value.value === null ? '' : moment(value.value).format('YYYY-MM-DD');
    this.checkHasFilter();
    this.changeValue();
  }

  public getFilterType(): FilterType {
    if (this.type === 'string') {
      return FilterType.TEXT;
    }
    if (this.type === 'number') {
      return FilterType.NUMBER;
    }
    if (this.type === 'date') {
      return FilterType.DATE;
    }
  }

  public getFilterValue(value: string): any {
    if (!value) {
      return undefined;
    }
    if (this.type === 'string') {
      return value;
    }
    if (this.type === 'number') {
      return parseInt(value, 10);
    }
    if (this.type === 'date') {
      return moment(value).toDate();
    }
  }

  public changeValue() {
    if ((this.valueFrom && this.valueFrom !== '') || (this.valueTo && this.valueTo !== '')) {
      this.filterService.setFilterBetween(this.id, this.getFilterType(),
        this.getFilterValue(this.valueFrom), this.getFilterValue(this.valueTo));
    } else {
      this.filterService.removeFilter(this.id, true);
    }
    this.changed.emit({from: this.valueFrom, to: this.valueTo});
  }
}
