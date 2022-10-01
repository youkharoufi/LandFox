import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class InterInterceptor implements HttpInterceptor {

  constructor(private localStorageToken : LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.localStorageToken.getToken();
    const isAPIURL = request.url.startsWith(environment.apiURL);

    if(token && isAPIURL){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer $(token)`
        }
      })
    }

    return next.handle(request);
  }
}
