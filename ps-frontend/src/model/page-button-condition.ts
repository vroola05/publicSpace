export class PageButtonCondition {
  field: string;
  operator: 'eq' | 'neq' | 'lt' | 'le' | 'gt' | 'ge';
  value: string;
}
