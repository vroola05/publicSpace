import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import moment from 'moment';

@Component({
  selector: 'lib-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  @ViewChild('headerRef') public headerRef: ElementRef;

  private subscriptionData: Subscription;
  public checkNotification = false;
  public columns: any[] = [];
  public _listTemplate: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  @Input() public set listTemplate(template: any) {
    this._listTemplate.next(template);
    this.columns = template.columns;
    this.checkNotification = this.listTemplate.notification;
  }

  public get listTemplate(): any {
    return this._listTemplate.getValue();
  }

  private _data: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  @Input() public set data(data: any[]) {
    this._data.next(data);
  }
  public get data(): any[] {
    return this._data.getValue();
  }

  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() positionChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() filterChanged: EventEmitter<any> = new EventEmitter<any>();

  public rowState: { opened: boolean }[] = [];
  private selectedIndex = -1;

  constructor() {
  }

  public ngOnInit(): void {
    this._data.asObservable().subscribe((data: any[]) => {
      this.rowState = [];
      data.forEach(d => { this.rowState.push({ opened: false }); });
    });
  }

  public ngOnDestroy(): void {
    if (this.subscriptionData) {
      this.subscriptionData.unsubscribe();
    }
  }

  public _filterChanged(event): void {
    this.filterChanged.emit(event);
  }

  public hasTemplate(): boolean {
    const t = this._listTemplate.getValue();
    return t && t.columns && t.columns.length > 0;
  }

  public getValue(id: string, row: any): string {
    return row[id] ? row[id] : ' ';
  }

  public date(id: string, row: any): string {
    const date = row[id] as Date;
    if (date) {
      return moment(date).format('DD MMM YYYY');
    }
    return '';
  }

  public boolean(id: string, row: any): string {
    return row[id] ? 'Ja' : ' ';
  }
  public dateAsDays(id: string, row: any): string {
    const date = row[id] as Date;
    const today = new Date().setHours(0, 0, 0, 0);
    const dateHours = new Date(date).setHours(0, 0, 0, 0);
    const days = Math.abs(Math.round(((new Date(today).getTime() - new Date(dateHours).getTime()) / 1000) / (60 * 60 * 24)));
    return (days === 0 ? 'Vandaag' : (days === 1 ? days + ' dag' : days + ' dagen'));
  }

  public isPrio(row): boolean {
    if (this.listTemplate.priority && row[this.listTemplate.priority] ) {
      return true;
    }
    return false;
  }

  public hasTextNotification(row): boolean {
    if (
      this.checkNotification && row[this.listTemplate.notification]
      && isNaN(Number(row[this.listTemplate.notification]))) {
      return true;
    }
    return false;
  }
  public getNotification(row): string {
    return row[this.listTemplate.notification];
  }

  public hasNotification(row): boolean {
    if (this.checkNotification && row[this.listTemplate.notification]
      && !isNaN(Number(row[this.listTemplate.notification]))) {
      return true;
    }
    return false;
  }

  public selected(index: number): boolean {
    return this.rowState[index] && this.rowState[index].opened;
  }

  public closeToggle(): void {
    if (this.selectedIndex > -1) {
      this.rowState[this.selectedIndex].opened = false;
    }
    this.selectedIndex = -1;
  }

  public onClick($event, index: number): void {
    if (this.listTemplate.toggle) {
      this.rowState[index].opened = !this.rowState[index].opened;

      if (this.selectedIndex > -1) {
        this.rowState[this.selectedIndex].opened = false;
      }
      if (this.rowState[index].opened) {
        this.selectedIndex = index;
        this.setPosition($event);
      } else {
        this.selectedIndex = -1;
      }
    }
    setTimeout(() => {
      this.clicked.emit({'data': this.data[index], index});
    });
  }

  private setPosition(item: any): void {
    setTimeout(() => {
      let header = 0;
      if (this.headerRef.nativeElement) {
        const display = window.getComputedStyle(this.headerRef.nativeElement).getPropertyValue('display');
        if (display !== 'none') {
          if (this.headerRef.nativeElement.getBoundingClientRect().height) {
            header = this.headerRef.nativeElement.getBoundingClientRect().height - 20;
          }
        }
      }
      if (item.target.classList.contains('ps-table-cell-element')) {
        this.positionChanged.emit(item.target.parentElement.parentElement.parentElement.offsetTop - header);
      } else {
        this.positionChanged.emit(item.target.parentElement.parentElement.offsetTop - header);
      }
    }, 20);
  }
}
