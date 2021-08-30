import {Component, OnInit, Input, OnDestroy, Output, EventEmitter} from '@angular/core';
import {Subscription} from 'rxjs';
import {FilterService} from '../../../services/filter/filter.service';
import {FilterType} from '../../../../model/query-parameters';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import moment from 'moment';

@Component({
  selector: 'lib-filter-equals',
  templateUrl: './filter-equals.component.html',
  styleUrls: ['./filter-equals.component.scss']
})
export class FilterEqualsComponent implements OnInit, OnDestroy {
  @Output() changed: EventEmitter<any> = new EventEmitter();

  @Input() title: string;
  @Input() id: string;
  @Input() type: string;


  public value = '';

  public hasFilter: boolean;

  protected subscriptionSearch: Subscription;

  constructor(
    protected filterService: FilterService
  ) {
  }

  public ngOnInit(): void {
    const value = this.filterService.getFilterValue(this.id);
    if (value) {
      this.setFilterValue(value);
    }
  }

  public ngOnDestroy(): void {
    if (this.subscriptionSearch) {
      this.subscriptionSearch.unsubscribe();
    }
  }

  public onDateChange(value: MatDatepickerInputEvent<any>) {
    const date = value.value === null ? '' : moment(value.value).format('YYYY-MM-DD');
    this.changeValue(!date ? '' : date);
  }

  public onKeydown(value) {
    this.changeValue(!value.target.value ? '' : value.target.value);
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

  public getFilterValue(): any {
    if (this.type === 'string') {
      return this.value;
    }
    if (this.type === 'number') {
      return parseInt(this.value, 10);
    }
    if (this.type === 'date') {
      return moment(this.value).toDate();
    }
  }

  public changeValue(value: string) {
    this.setFilterValue(value);
    if (this.value && this.value !== '') {
      this.filterService.setFilterEqual(this.id, this.getFilterType(), this.getFilterValue());
    } else {
      this.filterService.removeFilter(this.id, true);
    }

    this.changed.emit(this.value);
  }

  public setFilterValue(value: string) {
    this.value = value;
    this.hasFilter = value.length > 0;
  }
}
