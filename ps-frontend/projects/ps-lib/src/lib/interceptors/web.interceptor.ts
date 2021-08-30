import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthorisationService } from '../services/authorisation/authorisation.service';
import { DomainService } from '../services/domain/domain.service';

@Injectable({
  providedIn: 'root'
})
export class WebInterceptor implements HttpInterceptor {

  public constructor(
    private authorisation: AuthorisationService,
    private domain: DomainService) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const req: { url: string, setHeaders?: {[key: string]: string} } = { url: this.domain.api + request.url};
    const user = this.authorisation.user;

    if (user && user.apikey) {
      req.setHeaders = {};
      req.setHeaders[this.domain.config.info.apikey] = user.apikey;
    }

    request = request.clone(req);
    return next.handle(request).pipe(
      tap(httpResponse => {
        if (httpResponse instanceof HttpResponse) {
          if (httpResponse.status === 403) {
            this.authorisation.logout();
          }
        }
      }),
      catchError((httpErrorResponse: any) => {
        if (httpErrorResponse instanceof HttpErrorResponse) {
          if (httpErrorResponse.status === 403) {
            this.authorisation.logout();

          }
        }
        return throwError(httpErrorResponse);
      }));
  }
}
