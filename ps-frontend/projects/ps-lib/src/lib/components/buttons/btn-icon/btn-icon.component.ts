import { Component, OnInit, Input } from '@angular/core';
import { BtnAbstract } from '../btn-abstract';

@Component({
  selector: 'lib-btn-icon',
  templateUrl: './btn-icon.component.html',
  styleUrls: ['./btn-icon.component.scss']
})
export class BtnIconComponent extends BtnAbstract implements OnInit {
  @Input() public icon: string;
  @Input() public alt: string;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
