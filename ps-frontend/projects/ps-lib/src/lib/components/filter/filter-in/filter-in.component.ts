import {Component, OnInit, Input, OnDestroy, Output, EventEmitter} from '@angular/core';
import {ConfigService} from '../../../services/domain/domain.service';
import {FilterService} from '../../../services/filter/filter.service';
import {FilterType} from '../../../../model/query-parameters';
import {KeyValueT} from '../../../../model/template';
import moment from 'moment';

@Component({
  selector: 'lib-filter-in',
  templateUrl: './filter-in.component.html',
  styleUrls: ['./filter-in.component.scss']
})
export class FilterInComponent implements OnInit {
  @Output() changed: EventEmitter<any> = new EventEmitter();
  @Input() title: string;
  @Input() id: string;
  @Input() type: string;

  public hasFilter: boolean = false;

  public list: Array<KeyValueT> = [];

  public checked: boolean[] = [];

  constructor(
    private config: ConfigService,
    protected filterService: FilterService) {
  }

  public ngOnInit(): void {
    const filters = this.config.template.components.filter;

    const serviceList = this.getValueFromService();
    if (this.id && filters.has(this.id)) {
      const list = filters.get(this.id);
      list.forEach((item, i) => {
        const value = item.key ? item.key : item.value;
        this.checked.push((serviceList.find(v => v === value)) ? true : false);
      });
      this.list = list;
    }
    this.hasFilter = serviceList.length > 0;
  }

  public getValueFromService(): any[] {
    const list = this.filterService.getFilterValue(this.id) as any[];
    return list ? list : [];
  }

  public onChange($event) {
    const list = this.getValueFromService();
    if ($event.data) {
      const value = $event.data.key ? $event.data.key : $event.data.value;
      const index = list.indexOf(value);
      if ($event.checked) {
        if (index < 0) {
          list.push(value);
        }
      } else {
        if (index >= 0) {
          list.splice(index, 1);
        }
      }

      if (list.length > 0) {
        this.hasFilter = true;
        this.filterService.setFilterIn(this.id, this.getFilterType(), list);
      } else {
        this.hasFilter = false;
        this.filterService.removeFilter(this.id, true);
      }
      this.changed.emit(list);
    }
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

}
