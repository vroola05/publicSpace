import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() public title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
