import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';


// stream overriding: why we may sometimes want to completely prevent calling the handler and return a different value instead. 
@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isCached = true;
    if (isCached) {
      // implement get cache code here
      return of([]);
    }
    return next.handle();
  }
}