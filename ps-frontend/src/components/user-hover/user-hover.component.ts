import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { User } from '../../model/user';

@Component({
  selector: 'app-user-hover',
  templateUrl: './user-hover.component.html',
  styleUrls: ['./user-hover.component.scss']
})
export class UserHoverComponent implements OnInit {
  @ViewChild('nameElement') nameElement : ElementRef;
  @ViewChild('informationElement') informationElement : ElementRef;
  
  public show = false;

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

  public showInformation(e) {
    if (this.nameElement) {
      const widtha = 300;//this.informationElement.nativeElement.getBoundingClientRect().width;
      const width = this.nameElement.nativeElement.getBoundingClientRect().width;
      this.informationElement.nativeElement.style.left = (0-(widtha/2) + (width/2)) + 'px';
    }

    this.show = true;
  }
  public hideInformation(e) {
    this.show = false;
  }
  
}
