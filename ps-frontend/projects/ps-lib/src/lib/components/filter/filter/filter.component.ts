import { Component, OnInit, Input, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, AfterViewInit {
  @ViewChild('container') public container: ElementRef;
  @ViewChild('dropdown') public dropdown: ElementRef;
  @Input() title: string;
  @Input() hasFilter: boolean;

  public isOpen: boolean;

  @HostListener('document:click', ['$event'])
  public clickOut(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event) {
    if (this.isOpen) {
      this.setPosition();
    }
  }

  public constructor(private eRef: ElementRef) {
    this.isOpen = false;
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    if (this.isOpen) {
      this.setPosition();
    }
  }

  public setPosition() {
    setTimeout(() => {
      const defaultSpacing = 10;
      const domContainer = this.container.nativeElement;
      const rectContainer = domContainer.getBoundingClientRect();
      this.dropdown.nativeElement.style.top = (rectContainer.height + defaultSpacing) + 'px';

      const domDropdown = this.dropdown.nativeElement;
      const rectDropdown = domDropdown.getBoundingClientRect();

      if (rectContainer.x + rectDropdown.width > document.documentElement.clientWidth - (defaultSpacing * 2)) {
        domDropdown.style.left =
          (0 - defaultSpacing * 2 - ((rectContainer.x + rectDropdown.width) - document.documentElement.clientWidth)) + 'px';
      } else {
        domDropdown.style.left = (0 - defaultSpacing) + 'px';
      }
    });
  }

  public toggle(): boolean {
    this.isOpen = !this.isOpen;
    this.setPosition();
    return this.isOpen;
  }

}
