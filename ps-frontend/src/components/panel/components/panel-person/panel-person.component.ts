import { Component, Input, OnInit } from '@angular/core';
import { Person } from '../../../../model/person';

@Component({
  selector: 'app-panel-person',
  templateUrl: './panel-person.component.html',
  styleUrls: ['./panel-person.component.scss']
})
export class PanelPersonComponent implements OnInit {
  @Input() public person: Person;
  @Input() public showContact = true;

  constructor() { }

  public ngOnInit(): void {
  }

  public keepInformed(): boolean {
    return this.person && ((this.person.email && this.person.email !== '') || (this.person.phone && this.person.phone !== ''));
  }

  public getPerson(): string {
    let name = '';
    let contact = '';
    let address = '';
    if (!this.showContact || !this.person) {
      return '';
    }
    name = (!this.person.name ? '' : this.person.name);
    contact = (!this.person.email ? '' : this.person.email)
      + (this.person.email && this.person.phone ? ' / ' : '')
      + (!this.person.phone ? '' : this.person.phone);

    address = (!this.person.city ? '' : this.person.city)
      + (!this.person.street ? '' : ' ' + this.person.street)
      + (!this.person.number ? '' : ' ' + this.person.number)
      + (!this.person.letter ? '' : ' ' + this.person.letter);

    return name + '<br />' + contact + '<br />' + address;
  }
}

