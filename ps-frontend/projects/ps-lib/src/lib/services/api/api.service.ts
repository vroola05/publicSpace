import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public post(url: string, data: any, options?: {
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
    multipart = false): Observable<any> {
    let opts = {};
    if (!multipart) {
      opts = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
    }

    if (options) {
      opts = Object.assign(opts, options);
    }

    return this.http.post(url, data, opts);
  }

  public put(url: string, data: any, options?: {
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
    multipart = false): Observable<any> {
    let opts = {};
    if (!multipart) {
      opts = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
    }

    if (options) {
      opts = Object.assign(opts, options);
    }

    return this.http.put(url, data, opts);
  }

  public get(url: string, options?: any): Observable<any> {
    let opts = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    if (options) {
      opts = Object.assign(opts, options);
    }

    return this.http.get(url, opts);
  }
}
