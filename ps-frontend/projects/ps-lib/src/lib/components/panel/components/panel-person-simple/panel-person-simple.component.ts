import { Component, Input, OnInit } from '@angular/core';
import { Person } from '../../../../../model/person';

@Component({
  selector: 'lib-panel-person-simple',
  templateUrl: './panel-person-simple.component.html',
  styleUrls: ['./panel-person-simple.component.scss']
})
export class PanelPersonSimpleComponent implements OnInit {
  @Input() public person: Person;

  constructor() { }

  public ngOnInit(): void {
  }

  public keepInformed(): boolean {
    return this.person && ((this.person.email && this.person.email !== '') || (this.person.phone && this.person.phone !== ''));
  }
}
