import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


/**
* Nest middleware fully supports Dependency Injection. 
* Just as with providers and controllers, they are able to inject dependencies that are available within the same module. 
* As usual, this is done through the constructor.
*/
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...', req);
    next();
  }
}
