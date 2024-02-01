import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


/**
 * The NestInterceptor<T, R> is a generic interface in which T indicates the type of an Observable<T> (supporting the response stream), 
 * and R is the type of the value wrapped by Observable<R>.
 * 
 * onsider, for example, an incoming POST /cats request. 
 * This request is destined for the create() handler defined inside the CatsController. 
 * If an interceptor which does not call the handle() method is called anywhere along the way, the create() method won't be executed. 
 * Once handle() is called (and its Observable has been returned), the create() handler will be triggered. 
 * And once the response stream is received via the Observable, additional operations can be performed on the stream, and a final result returned to the caller.
*/
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}