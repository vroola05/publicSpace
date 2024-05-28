import { Component, Input, OnInit } from '@angular/core';
import { ButtonTypes } from '../../../model/intefaces';
import { BtnAbstract } from '../btn-abstract';


@Component({
  selector: 'app-btn-contained',
  templateUrl: './btn-contained.component.html',
  styleUrls: ['./btn-contained.component.scss']
})
export class BtnContainedComponent extends BtnAbstract implements OnInit {
  
  @Input() public type: ButtonTypes = 'containedPrimary';
  
  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
