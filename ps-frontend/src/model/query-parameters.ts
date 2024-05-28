export enum FilterType {
  TEXT,
  DATE,
  NUMBER
}

export enum FilterOperator {
  EQUAL,
  BETWEEN,
  IN
}

export class FilterValue {
  public text?: string;
  public date?: Date;
  public number?: number;
}

export class FilterField {
  public field: string;
  public operator: FilterOperator;
  public type: FilterType;


  public value?: FilterValue;
  public list?: Array<FilterValue>;
  public from?: FilterValue;
  public to?: FilterValue;
}

export class QueryParameters {
  public search?: string;
  public filters?: FilterField[];

  public offset?: number;
  public size?: number;
}
