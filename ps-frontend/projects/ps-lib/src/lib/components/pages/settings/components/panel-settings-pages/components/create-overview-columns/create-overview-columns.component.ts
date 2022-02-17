import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageOverviewColumns } from 'projects/ps-lib/src/model/page-overview-columns';

@Component({
  selector: 'lib-create-overview-columns',
  templateUrl: './create-overview-columns.component.html',
  styleUrls: ['./create-overview-columns.component.scss']
})
export class CreateOverviewColumnsComponent implements OnInit {

  @Input() public columns: PageOverviewColumns[] = [];
  @Input() public prefix: string = '';

  @Output() changed: EventEmitter<{action: string, columns: PageOverviewColumns[]}> = new EventEmitter<{action: string, columns: PageOverviewColumns[]}>();
  
  constructor() { }

  ngOnInit(): void {
  }

  public getId(id: string): string {
    return !id || !this.prefix ? id : this.prefix + (id.charAt(0) !== '[' ? '.'+ id : id);
  }
  
  public onColumnsChanged($event: {action: string, index: number, columns: PageOverviewColumns}): void {
    switch($event.action) {
      case 'delete':
        this.columns.splice($event.index, 1);
        break;
    }

    this.changed.emit({action: 'changed', columns: this.columns});
  }

  public onAddClick($event): void {
    if (!this.columns) {
      this.columns = [];
    }
    const column = new PageOverviewColumns();
    column.name = '';
    column.title = '';
    column.type = '';
    column.filter = '';
    column.css = '';
    column.mobile = '';
    this.columns.push(column);

    this.changed.emit({action: 'changed', columns: this.columns});
  }

  public isFirstButton(i: number) : boolean {
    return i <= 0;
  }

  public isLastButton(i: number) : boolean {
    return i >= this.columns.length - 1;
  }

  public moveUp(i: number): void {
    if (this.isFirstButton(i)) {
      return;
    }

    this.moveButton(i, i-1);
  }

  public moveDown(i: number): void {
    if (this.isLastButton(i)) {
      return;
    }

    this.moveButton(i, i+1);
  }

  private moveButton(oldIndex, newIndex) {
    this.columns.splice(newIndex, 0, this.columns.splice(oldIndex, 1)[0]);
    this.changed.emit({action: 'changed', columns: this.columns});
  }
}
