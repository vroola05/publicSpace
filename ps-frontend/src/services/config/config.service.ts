import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import HeaderMenuItemT, { Template, EndpointT, KeyValueT } from '../../model/template';
import { Page } from '../../model/page';
import { Company } from '../../model/company';

import { StorageService } from '../storage/storage.service';
import { Action } from '../../model/action';
import { ActionTypeEnum, DomainTypeEnum } from '../../model/intefaces';
import { DomainType } from '../../model/domain-type';

export enum PageTypes {
  overview = 'overview',
  details = 'details',
  assign = 'assign',
  newLocation = 'newLocation',
  newInformation = 'newInformation',
  newConfirm = 'newConfirm',
  orderCreation = 'orderCreation',
  orderConfirm = 'orderConfirm',
  orderSpecificationSelect = 'orderSpecificationSelect',
  orderSpecificationHandle = 'orderSpecificationHandle',
  orderSpecificationConfirmation = 'orderSpecificationConfirmation',
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _template: BehaviorSubject<Template> = new BehaviorSubject<any>(null);
  private _endpoints: Map<string, EndpointT>;
  private _api: string;

  private _headers: HeaderMenuItemT[] = [];
  public get headers(): HeaderMenuItemT[] {
    return this._headers;
  }

  public get api(): string {
    return this._api;
  }

  public set api(api: string) {
    this._api = api;
  }

  public set template(template: Template) {
    template = this.setInitialize(template);
    if (template.endpoints) {
      this._endpoints = template.endpoints;
    }

    this._template.next(template);
  }

  public get template(): Template {
    return this._template.getValue();
  }

  constructor(
    protected activatedRoute: ActivatedRoute,
    private storage: StorageService
  ) { }

  public setInitialize(template: Template): Template {
    if (template.info.favicon) {
      const favicon = document.getElementById('favicon') as HTMLLinkElement;
      if (favicon) {
        favicon.href = template.info.favicon;
      }
    }
    if (template.info.favicon32) {
      const favicon = document.getElementById('favicon32') as HTMLLinkElement;
      if (favicon) {
        favicon.href = template.info.favicon32;
      }
    }
    if (template.info.favicon512) {
      const favicon = document.getElementById('favicon512') as HTMLLinkElement;
      if (favicon) {
        favicon.href = template.info.favicon512;
      }
    }

    if (template.endpoints) {
      const endpoints = new Map<string, EndpointT>();
      for (const filter in template.endpoints) {
        if (template.endpoints[filter]) {
          endpoints.set(filter, template.endpoints[filter]);
        }
      }
      template.endpoints = endpoints;
    }
    if (template.components.filter) {
      const filters = new Map<string, Array<KeyValueT>>();
      for (const filter in template.components.filter) {
        if (template.components.filter[filter]) {
          filters.set(filter, template.components.filter[filter]);
        }
      }
      template.components.filter = filters;
    }

    if (template.pages) {
      const pages = new Map<string, Page>();
      for (const pageId in template.pages) {
        if (template.pages[pageId]) {
          pages.set(pageId, template.pages[pageId]);
        }
      }
      template.pages = pages;
    }
    
    if (template.pages.has(PageTypes.overview)) {
      const header: HeaderMenuItemT[] = [];
      template.pages.get(PageTypes.overview).pageOverviewTemplate.forEach(pageOverviewTemplate => {
        header.push({
          name: pageOverviewTemplate.name,
          id: pageOverviewTemplate.id,
          icon: pageOverviewTemplate.icon,
          menuType: 'main',
          api: null
        } as HeaderMenuItemT);

      });
      this._headers = header;
    }
    
    return template;
  }


  public getDomainType(): DomainType {
    return this.template.domain.domainType;
  }
  public isGovernment(): boolean {
    return this.template.domain.domainType.id === DomainTypeEnum.GOVERNMENT;
  }

  public isContractor(): boolean {
    return this.template.domain.domainType.id === DomainTypeEnum.CONTRACTOR;
  }

  public getCompany(): Company {
    return this.template.company;
  }

  public getPage(page: string): Page {
    if (this.template.pages.has(page)) {
      return this.template.pages.get(page);
    }
    return null;
  }

  public getEndpoint(identifier: string): EndpointT {
    if (this._endpoints.has(identifier)) {
      return this._endpoints.get(identifier);
    }
    return { endpoint: null };
  }

  public getAction(actionType: ActionTypeEnum): Action {
    if (this.template.actions) {
      return this.template.actions.find(action => action.actionType.id == actionType);
    }
    return null;
  }
  public getLogo(): string {
    return !this.template.info.logo ? 'assets/images/default-logo.svg' : this.template.info.logo;
  }

  public configObservable(): Observable<any> {
    return this._template.asObservable();
  }

  public readConfig(domainUrl: string): Promise<any> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };

    const opts: RequestInit = {
      method: 'GET',
      headers,
    };

    return new Promise((resolve, reject) => {
      fetch(domainUrl, opts).then((response) => {
        response.json().then((template: Template) => {
          this.template = template;
          resolve(this.template);
        }).catch(() => {
          reject();
        });
      }).catch((error) => {
        reject();
      });
    });

  }
}
