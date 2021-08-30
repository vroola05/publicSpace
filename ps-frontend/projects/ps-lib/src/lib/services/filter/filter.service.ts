import { Injectable } from '@angular/core';
import { FilterType, FilterOperator, FilterField, QueryParameters, FilterValue } from '../../../model/query-parameters';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  protected queryParameters: QueryParameters = this.getQueryParameters();

  constructor(
    protected storage: StorageService) {
  }

  public getQueryParameters() {
    if (!this.queryParameters) {
      const queryParametersString = this.storage.getSession('filter');
      if (queryParametersString) {
        this.queryParameters = JSON.parse(queryParametersString) as QueryParameters;
        this.resetOffset();
      } else {
        this.queryParameters = new QueryParameters();
        this.clear();
      }
    }
    return this.queryParameters;
  }

  public clear() {
    this.queryParameters.filters = [];
    this.queryParameters.offset = 0;
    this.queryParameters.search = '';
    this.storeFilter();
  }

  public storeFilter() {
    this.storage.setSession('filter', JSON.stringify(this.queryParameters));
  }
  public resetOffset() {
    this.queryParameters.offset = 0;
  }

  public setListsize(size: number) {
    this.queryParameters.size = size;
    this.storeFilter();
  }

  public getListsize(): number {
    return !this.queryParameters ? 0 : this.queryParameters.size;
  }

  public addOffset() {
    this.queryParameters.offset += 1;
  }

  public getSearch(): string {
    return !this.queryParameters ? '' : this.queryParameters.search;
  }

  public setSearch(value: string) {
    this.queryParameters.offset = 0;
    this.queryParameters.search = value;
    this.storeFilter();
  }

  public removeFilter(field: string, store = false) {
    if (this.queryParameters.filters) {
      this.queryParameters.filters = this.queryParameters.filters.filter(f => f.field !== field);
    } else {
      this.queryParameters.filters = [];
    }
    if (store) {
      this.storeFilter();
    }
  }

  public getFilterValue(field: string): any {
    if (this.queryParameters.filters) {
      const filter = this.queryParameters.filters.find(f => f.field === field);
      if (!filter) {
        return null;
      }
      if (filter.operator === FilterOperator.EQUAL) {
        return this.getValue(filter.type, filter.value);
      } else if (filter.operator === FilterOperator.BETWEEN) {
        return {from: this.getValue(filter.type, filter.from), to: this.getValue(filter.type, filter.to)};
      } else if (filter.operator === FilterOperator.IN) {
        const result = [];
        if (filter.list) {
          filter.list.forEach(filterValue => result.push(this.getValue(filter.type, filterValue)));
        }
        return result;
      }
    }
  }

  private createFilterValue(type: FilterType, value: any) {
    const filterValue = new FilterValue();
    if (type === FilterType.TEXT) {
      filterValue.text = value;
    } else if (type === FilterType.DATE) {
      filterValue.date = value;
    } else if (type === FilterType.NUMBER) {
      filterValue.number = value;
    }
    return filterValue;
  }

  public setFilterEqual(field: string, type: FilterType, value: any) {
    this.removeFilter(field);

    const filterField = new FilterField();
    filterField.field = field;
    filterField.operator = FilterOperator.EQUAL;
    filterField.type = type;
    filterField.value = this.createFilterValue(type, value);

    this.queryParameters.filters.push(filterField);
    this.storeFilter();
  }

  public setFilterBetween(field: string, type: FilterType, from: any, to: any) {
    this.removeFilter(field);

    const filterField = new FilterField();
    filterField.field = field;
    filterField.operator = FilterOperator.BETWEEN;
    filterField.type = type;
    filterField.from = this.createFilterValue(type, from);
    filterField.to = this.createFilterValue(type, to);

    this.queryParameters.filters.push(filterField);
    this.storeFilter();
  }

  public setFilterIn(field: string, type: FilterType, values: any[]) {
    this.removeFilter(field);

    const filterField = new FilterField();
    filterField.field = field;
    filterField.operator = FilterOperator.IN;
    filterField.type = type;
    filterField.list = [];
    values.forEach(value => {
      filterField.list.push(this.createFilterValue(type, value));
    });

    this.queryParameters.filters.push(filterField);
    this.storeFilter();
  }

  public getValue(type: FilterType, filterValue: FilterValue): any {
    if (type === FilterType.TEXT) {
      return filterValue.text;
    } else if (type === FilterType.DATE) {
      return filterValue.date;
    } else if (type === FilterType.NUMBER) {
      return filterValue.number;
    }
    return null;
  }
}
