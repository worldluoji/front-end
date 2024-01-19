import { Controller, Get, Post, Req, Query, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

// reference: https://docs.nestjs.com/controllers
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

  /* It's that simple. Nest provides decorators for all of the standard HTTP methods: @Get(), @Post(), @Put(), @Delete(), @Patch(), @Options(), and @Head(). 
  In addition, @All() defines an endpoint that handles all of them */
  @Post('/create')
  create(): string {
    return 'This action adds a new cat';
  }

  // The response status code is always 200 by default, except for POST requests which are 201. We can easily change this behavior by adding the @HttpCode(...) decorator at a handler level.
  @Post('/create2')
  @HttpCode(204)
  create2() {
    return 'This action adds a new cat with httpcode 204';
  }

  /* The 'ab*cd' route path will match abcd, ab_cd, abecd, and so on. The characters ?, +, *, 
  and () may be used in a route path, and are subsets of their regular expression counterparts. 
  The hyphen ( -) and the dot (.) are interpreted literally by string-based paths.*/
  @Get('ab*cd')
  findAll() {
    return 'This route uses a wildcard';
  }
}
