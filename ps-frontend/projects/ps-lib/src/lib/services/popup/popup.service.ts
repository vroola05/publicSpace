import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type } from '@angular/core';
import { Subscription } from 'rxjs';
import { PopupETypes } from '../../../model/intefaces';
import { PopupComponent } from '../../components/popup/popup.component';

@Injectable({
  providedIn: 'root'
})
export class Popup {

  private popups: Array<{subscription: Subscription, component: ComponentRef<PopupComponent>}> = [];
  private popupsi = [];
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  public add<T>(title: string, component: Type<any>, properies: any, events?: {type: PopupETypes, event: any}[]): number {
    const componentRefer = this.componentFactoryResolver
      .resolveComponentFactory(PopupComponent)
      .create(this.injector);

    const instance = componentRefer.instance as PopupComponent;
    instance.title = title;
    const subscription = instance.popupEvent().subscribe(popupComponent => {
      this.remove(popupComponent);
    });
    this.appRef.attachView(componentRefer.hostView);

    const popupElem = (componentRefer.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    this.popupsi.push(popupElem);
    document.body.appendChild(popupElem);
    instance.renderHtml(component, properies, events);

    return this.popups.push({subscription, component: componentRefer}) - 1;
  }

  public remove(popupComponent: PopupComponent) {
    const popup = this.popups.find(p => p.component.instance === popupComponent);
    if (popup) {
      if (popup.subscription) {
        popup.subscription.unsubscribe();
      }
      popup.component.destroy();
      this.popups = this.popups.filter(p => p.component.instance !== popupComponent);
    }
  }
}
