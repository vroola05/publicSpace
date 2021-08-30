import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import moment from 'moment';

import { Call } from '../../../model/call';
import { CallList } from '../../../model/call-list';
import { DomainT, EndpointsT, EndpointT, KeyValueT } from '../../../model/template';
import { AuthorisationService } from '../authorisation/authorisation.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  private _domain: BehaviorSubject<DomainT> = new BehaviorSubject<any>(null);
  private _endpoints: Map<string, EndpointT>;
  private _api: string;

  public get api(): string {
    return this._api;
  }

  public set api(api: string) {
    this._api = api;
  }

  public getEndpoint(identifier: string): EndpointT {
    if (this._endpoints.has(identifier)) {
      return this._endpoints.get(identifier);
    }
    return { endpoint: null };
  }

  public set config(domain: DomainT) {
    domain = this.setDefaults(domain);
    if (domain.endpoints) {
      this._endpoints = domain.endpoints;
    }

    this._domain.next(domain);
  }

  public get config(): DomainT {
    return this._domain.getValue();
  }

  constructor(
    protected activatedRoute: ActivatedRoute,
    private storage: StorageService
  ) { }

  public setDefaults(domain: DomainT): DomainT {
    if (domain.info.favicon) {
      const favicon = document.getElementById('favicon') as HTMLLinkElement;
      if (favicon) {
        favicon.href = domain.info.favicon;
      }
    }
    if (domain.info.favicon32) {
      const favicon = document.getElementById('favicon32') as HTMLLinkElement;
      if (favicon) {
        favicon.href = domain.info.favicon32;
      }
    }
    if (domain.info.favicon512) {
      const favicon = document.getElementById('favicon512') as HTMLLinkElement;
      if (favicon) {
        favicon.href = domain.info.favicon512;
      }
    }

    if (domain.endpoints) {
      const endpoints = new Map<string, EndpointT>();
      for (const filter in domain.endpoints) {
        if (domain.endpoints[filter]) {
          endpoints.set(filter, domain.endpoints[filter]);
        }
      }
      domain.endpoints = endpoints;
    }
    if (domain.components.filter) {
      const filters = new Map<string, Array<KeyValueT>>();
      for (const filter in domain.components.filter) {
        if (domain.components.filter[filter]) {
          filters.set(filter, domain.components.filter[filter]);
        }
      }
      domain.components.filter = filters;
    }
    return domain;
  }

  public getLogo(): string {
    return !this.config.info.logo ? 'assets/images/default-logo.svg' : this.config.info.logo;
  }

  public configObservable(): Observable<any> {
    return this._domain.asObservable();
  }

  public transformCall(call: Call): CallList {
    const callList = new CallList();
    callList.id = call.id;
    callList.casenumber = call.casenumber;
    callList.description = call.description;
    callList.category = !call.mainCategory ? '' : call.mainCategory.name + ' - ' + call.mainCategory.category.name;
    callList.status = !call.status ? '' : call.status.name;
    //callList.dateCreated = moment(call.dateStart).toISOString();
    if (call.location) {
      callList.area = call.location.area;
      callList.city = call.location.city;
      callList.postal = call.location.postal;
      callList.street = call.location.street;
      callList.number = call.location.number;
      callList.location = (!call.location.postal ? '' : call.location.postal)
        + (!call.location.city ? '' : ' ' + call.location.city)
        + (!call.location.street ? '' : ', ' + call.location.street)
        + (!call.location.number ? '' : ' ' + call.location.number);
    }
    callList.supervisor = !call.supervisor ? '' : call.supervisor.name;

    return callList;
  }

  public transformCallOrder(call: Call): CallList {
    const callList = this.transformCall(call);
    callList.status = (!call.orders || call.orders.length !== 1 || !call.orders[0].statusProces)
      ? callList.status
      : call.orders[0].statusProces.name;

    return callList;
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
        response.json().then((domain: DomainT) => {
          this.config = domain;
          resolve(this.config);
        }).catch(() => {
          reject();
        });
      }).catch((error) => {
        reject();
      });
    });

  }
}
