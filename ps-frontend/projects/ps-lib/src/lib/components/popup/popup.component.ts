import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
  ViewContainerRef } from '@angular/core';
import { EventEmitter } from 'events';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { PopupETypes } from '../../../model/intefaces';

@Component({
  selector: 'lib-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private events: {type: PopupETypes, event: any}[];

  @ViewChildren('viewRef', { read: ViewContainerRef }) viewRefs: QueryList<ViewContainerRef>;
  @Input() public title: string;
  public closeEvent: BehaviorSubject<PopupComponent> = new BehaviorSubject<PopupComponent>(null);

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.viewRefs.forEach(r => r.remove());

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
    setTimeout(() => {
      if (this.viewRefs) {
        const optionsInHtml: ViewContainerRef[] = this.viewRefs.toArray();
        const i = 0;
        if (optionsInHtml[i] && properties) {
          optionsInHtml[i].clear();

          const componentFactory: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(component as any);
          const dynamicOptionComponent = optionsInHtml[i].createComponent(componentFactory).instance as T;
          for (const propery in properties) {
            if (propery in dynamicOptionComponent) {
              dynamicOptionComponent[propery] = properties[propery];
            }
          }
          if ('events' in dynamicOptionComponent) {
            this.subscriptions.push(dynamicOptionComponent['events'].subscribe((event: {event: PopupETypes, data: any}) => {
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

      }
    });
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
