import { Component, Input, OnInit } from '@angular/core';
import { ButtonTypes } from '../../../../model/intefaces';
import { BtnAbstract } from '../btn-abstract';


@Component({
  selector: 'lib-btn-contained',
  templateUrl: './btn-contained.component.html',
  styleUrls: ['./btn-contained.component.scss']
})
export class BtnContainedComponent extends BtnAbstract implements OnInit {
  @Input() public type: ButtonTypes = ButtonTypes.containedPrimary;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
