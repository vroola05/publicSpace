import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-panel-toggle',
  templateUrl: './panel-toggle.component.html',
  styleUrls: ['./panel-toggle.component.scss']
})
export class PanelToggleComponent implements OnInit {
  @Input() public toggle = false;
  @Input() public title: string[] = [];
  @Input() style: 'default' | 'filled' | 'primary' | 'grey' | 'secondary' = 'default';

  constructor() { }

  ngOnInit(): void {
  }

  public onClick($event): void {
    this.toggle = !this.toggle;
  }
}
