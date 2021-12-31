import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { PopupETypes } from '../../../model/intefaces';
import { DynamicDirective } from '../../directives/dynamic.directive';

@Component({
  selector: 'lib-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, OnDestroy {
  @ViewChild(DynamicDirective, {static: true}) private dynamicHost!: DynamicDirective;

  private subscriptions: Subscription[] = [];
  private events: {type: PopupETypes, event: any}[];

  @Input() public title: string;
  public closeEvent: BehaviorSubject<PopupComponent> = new BehaviorSubject<PopupComponent>(null);

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.dynamicHost.viewContainerRef.remove();

    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public popupEvent(): Observable<PopupComponent> {
    return this.closeEvent.asObservable();
  }
  public close() {
    return this.closeEvent.next(this);
  }

  public renderHtml<T>(component: T, properties: any, events?: {type: PopupETypes, event: any}[]): void {
    this.events = events;
    const viewContainerRef = this.dynamicHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<T>(component as any);  
    const instance = componentRef.instance;
    
    for (const propery in properties) {
      if (propery in instance) {
        instance[propery] = properties[propery];
      }
    }

    if ('events' in instance) {
      this.subscriptions.push(instance['events'].subscribe((event: {event: PopupETypes, data: any}) => {
        this.onEvent(event);
        switch (event.event) {
          case PopupETypes.close:
            this.close();
            break;
          case PopupETypes.cancel:
            this.close();
            break;
          case PopupETypes.ok:
            this.close();
            break;
        }
      }));
    }
  }

  private onEvent(event: {event: PopupETypes, data: any}): void {
    if (this.events) {
      const found = this.events.find(e => e.type === event.event);
      if (found && found.event) {
        found.event(event.data);
      }
    }
  }
}
