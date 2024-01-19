import { Controller, Get, Req, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  // The request object represents the HTTP request and has properties for the request query string, parameters, HTTP headers, and body，https://expressjs.com/en/api.html#req
  @Get('findByType')
  findByType(@Req() request: Request): string {
    console.dir(request.path)
    const type = request.query['type'] || 'orange cat'
    return 'This action returns cats with type: ' + type;
  }

  // findByType2 is equal to findByType
  @Get('findByType2')
  findByType2(@Query('type') type: string): string {
    return 'This action returns cats with type: ' + type;
  }
}
