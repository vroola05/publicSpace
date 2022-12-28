import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../model/user';

@Component({
  selector: 'lib-user-hover',
  templateUrl: './user-hover.component.html',
  styleUrls: ['./user-hover.component.scss']
})
export class UserHoverComponent implements OnInit {
  public _user: User = new User();
  @Input() public set user(user: User) {
    this._user = user;
  }
  
  constructor() { }

  public ngOnInit(): void {
  }

  public getUserGroups(): string {
    let groups = '';
    this._user.groups.forEach(group => {groups += (groups !== '' ? ', ' + group.name : group.name)});
    return groups;
  }
}
