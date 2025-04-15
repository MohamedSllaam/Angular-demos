import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import {
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { pipe, tap } from 'rxjs';
function logggingInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  console.log('[Outgoing Request]');
  const req = request.clone({
    headers: request.headers.set('X-DEBUG', 'TESTING'),
  });
  //const req = request.clone();
  console.log(request);
  return next(request).pipe(
    tap({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          console.log('Incoming Response');
          console.log(event.status);
          console.log(event.body);
        }
      },
    })
  );
}
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([logggingInterceptor]))],
}).catch((err) => console.error(err));
