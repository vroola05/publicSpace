import { ApplicationRef, createComponent, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector } from '@angular/core';

import { LoaderComponent } from '../../components/loader/loader.component';


@Injectable({
  providedIn: 'root'
})
export class Loader {

  private loaders: Array<ComponentRef<LoaderComponent>> = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  public add(title: string): number {
    const componentRefer = this.componentFactoryResolver
      .resolveComponentFactory(LoaderComponent)
      .create(this.injector);

    const instance = componentRefer.instance as LoaderComponent;
    instance.title = title;
    
    this.appRef.attachView(componentRefer.hostView);
    const elem = (componentRefer.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(elem);

    return this.loaders.push(componentRefer) - 1;
  }

  public remove(index: number) {
    const loader = this.loaders[index];
    if (loader) {
      loader.destroy();
      this.loaders = this.loaders.splice(index, 1);
    }
  }
}
