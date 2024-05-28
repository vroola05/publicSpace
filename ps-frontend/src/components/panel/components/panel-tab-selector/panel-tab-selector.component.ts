import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-panel-tab-selector',
  templateUrl: './panel-tab-selector.component.html',
  styleUrls: ['./panel-tab-selector.component.scss']
})
export class PanelTabSelectorComponent implements OnInit {
  @Output() changed: EventEmitter<{search: string, tab: {name: string, value?: string, data?: any, selected: boolean}}>
    = new EventEmitter<{search: string, tab: {name: string, value?: string, data?: any, selected: boolean}}>();

  public _tabs: {name: string, value?: string, data?: any, selected: boolean}[] = [];
  @Input() set tabs(tabs: {name: string, value?: string, data?: any, selected: boolean}[]) {
    this._tabs = tabs;
    if (this._tabs && this._tabs.length > 0 && !this._tabs.find(t => t.selected === true)) {
        this._tabs[0].selected = true;
        this.changed.emit({search: this.search, tab: this._tabs[0]});
    }
    
  }

  @Input() direction: 'tab-row' | 'tab-column' = 'tab-column';

  private search = '';

  constructor() { }

  public ngOnInit(): void {
  }

  public onClicked(tab): void {
    this._tabs.forEach(t => t.selected = false);
    tab.selected = true;
    this.changed.emit({search: this.search, tab});
  }
}
