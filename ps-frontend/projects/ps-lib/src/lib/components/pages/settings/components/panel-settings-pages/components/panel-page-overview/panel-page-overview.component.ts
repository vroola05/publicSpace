import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Page } from '../../../../../../../../model/page';
import { PageOverviewTemplate } from '../../../../../../../../model/page-overview-template';
import { ListTemplateT } from '../../../../../../../../model/template';

@Component({
  selector: 'lib-panel-page-overview',
  templateUrl: './panel-page-overview.component.html',
  styleUrls: ['./panel-page-overview.component.scss']
})
export class PanelPageOverviewComponent implements OnInit {
  public pageOverviewTemplate: PageOverviewTemplate[] = [];
  public _page: Page;
  @Input() set page( page: Page) {
    if (!page.pageOverviewTemplate) {
      page.pageOverviewTemplate = [];
    }
    this._page = page;
    this.pageOverviewTemplate = this._page.pageOverviewTemplate;
  }

  @Input() public prefix: string = '';
  
  //pageOverviewTemplate[2].size
  @Output() changed: EventEmitter<{ action: string, data: any }> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  public getId(id: string): string {
    return !id || !this.prefix ? id : this.prefix + (id.charAt(0) !== '[' ? '.'+ id : id);
  }

  public createNewPageOverviewTemplate(): void {
    const selectedPageOverviewTemplate = new PageOverviewTemplate();
    selectedPageOverviewTemplate.name = '';
    selectedPageOverviewTemplate.route = '';
    selectedPageOverviewTemplate.icon = '';
    selectedPageOverviewTemplate.toggle = false;
    selectedPageOverviewTemplate.priority = true;
    selectedPageOverviewTemplate.personal = false;
    this.pageOverviewTemplate.push(selectedPageOverviewTemplate);
  }

  public onPageOverviewTemplateChanged($event): void {
    switch($event.action) {
      case 'delete':
        this.pageOverviewTemplate.splice($event.index, 1);
        break;
    }
  }

  public onAddClick($event): void {
    this.createNewPageOverviewTemplate();
  }

  public isFirstButton(i: number) : boolean {
    return i <= 0;
  }

  public isLastButton(i: number) : boolean {
    return i >= this.pageOverviewTemplate.length - 1;
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
    this.pageOverviewTemplate.splice(newIndex, 0, this.pageOverviewTemplate.splice(oldIndex, 1)[0]);
  }
}
