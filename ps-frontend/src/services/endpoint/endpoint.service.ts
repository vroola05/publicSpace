import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { TransformService } from '../transform/transform.service';
import { AuthorisationService } from '../authorisation/authorisation.service';
import { ConfigService } from '../config/config.service';
import { first } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  constructor(
    private apiService: ApiService,
    private transform: TransformService,
    private config: ConfigService,
    private authorisation: AuthorisationService
  ) { }

  public get(endpointIdentifier: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const endpoint = this.config.getEndpoint(endpointIdentifier);
      if (endpoint.endpoint !== null && this.authorisation.hasRoles(endpoint.roles)) {
        this.apiService.get(this.transform.URL(endpoint.endpoint)).pipe(first()).subscribe(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          });
      } else {
        reject(new Error('No access'));
      }
    });
  }

  public post(endpointIdentifier: string, data: any, options?:
    {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe?: 'events';
      params?: HttpParams | {
        [param: string]: string | string[];
      };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    },
    multipart = false): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const endpoint = this.config.getEndpoint(endpointIdentifier);
      if (endpoint.endpoint !== null && this.authorisation.hasRoles(endpoint.roles)) {
        this.apiService.post(this.transform.URL(endpoint.endpoint), data).pipe(first()).subscribe(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          });
      } else {
        reject(new Error('No access'));
      }
    });
  }

  public put(endpointIdentifier: string, data: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const endpoint = this.config.getEndpoint(endpointIdentifier);
      if (endpoint.endpoint !== null && this.authorisation.hasRoles(endpoint.roles)) {
        this.apiService.put(this.transform.URL(endpoint.endpoint), data).pipe(first()).subscribe(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          });
      } else {
        reject(new Error('No access'));
      }
    });
  }

  public delete(endpointIdentifier: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const endpoint = this.config.getEndpoint(endpointIdentifier);
      if (endpoint.endpoint !== null && this.authorisation.hasRoles(endpoint.roles)) {
        this.apiService.delete(this.transform.URL(endpoint.endpoint)).pipe(first()).subscribe(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          });
      } else {
        reject(new Error('No access'));
      }
    });
  }
}
