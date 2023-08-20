import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ErrorService} from "./error.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class RestInterceptorService implements HttpInterceptor {

  constructor(
    private errorService: ErrorService,
    private location: Location
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.responseType != 'json') {
      return next.handle(req);
    }

    let url = environment.backend + req.url
    if (environment.production) {
      url = this.location.prepareExternalUrl(url)
    }
    req = req.clone({url: url})

    return next.handle(req)
      .pipe(
        map(event => {
          if (!(event instanceof HttpResponse)) {
            return event
          }

          let responseBody = event.body as ResponseBody
          if (!responseBody.body && !responseBody.error) {
            return event
          }

          if (!responseBody.success) {
            throw new Error(responseBody.error);
          }

          return event.clone({
            body: responseBody.body
          })

        }),
        catchError(error => {
          let message: string
          if (error.statusText) {
            message = error.statusText
          } else if (typeof error == 'string') {
            message = error
          } else {
            message = "Unknown error"
          }
          this.errorService.register('ERROR', message)
          return throwError(error)
        })
      )
  }
}

export const restInterceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: RestInterceptorService, multi: true }
]

class ResponseBody {
  success: boolean = false
  body!: object
  error!: string
}
