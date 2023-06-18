import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // original request is readonly
    const modifiedReq = req.clone({
      withCredentials: true,
    });

    return next.handle(modifiedReq);

    // events around request can be watched via pipe
    // return next.handle(modifiedReq).pipe(
    //   tap((val) => {
    //     if (val.type === HttpEventType.Sent) {
    //       console.log('request is sent to server', val);
    //     }

    //     if (val.type === HttpEventType.Response) {
    //       console.log('got response from api', val);
    //     }
    //   })
    // );
  }
}
