import { Controller, Get, Post, Req, Query, HttpCode, Header, Redirect, Param, Body, Res, HttpStatus, HttpException, UseFilters, ParseIntPipe, UsePipes, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import { HttpExceptionFilter } from './exception/http-exception.filter';
import { ZodValidationPipe } from './pipes/zod-validation.pip';
import { createCatSchema } from './pipes/zod-schemas/create-cat-schema';
import { ClassValidationPipe } from './pipes/class-validation.pip';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorator/roles.decorator';
import { LoggingInterceptor } from './interceptor/logging.interceptor';

// reference: https://docs.nestjs.com/controllers
@Controller('cats')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class AppController {
  // This shorthand allows us to both declare and initialize the appService member immediately in the same location.
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
  @Header('Cache-Control', 'none')
  @UsePipes(new ZodValidationPipe(createCatSchema))
  create(@Body() createCatDto: CreateCatDto): string {
    return `This action adds a new cat ${createCatDto.name}`;
  }

  @Post('/create3')
  @Header('Cache-Control', 'none')
  @UsePipes(new ClassValidationPipe())
  @Roles(['admin'])
  create3(@Body() createCatDto: CreateCatDto): string {
    return `This action adds a new cat ${createCatDto.name}`;
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

  // returned values will override any arguments passed to the @Redirect() decorato
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version: string) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  // /cat/findOne/1 -> id = 1
  @Get('findOne/:id')
  findOne(@Param() params: any): string {
    return `This action returns a #${params.id} cat`;
  }

  // equal to findOne
  @Get('findOne/:id')
  findOne2(@Param('id') id: string): string {
    return `This action returns #${id} cat`;
  }

  // Every async function has to return a Promise. This means that you can return a deferred value that Nest will be able to resolve by itself
  @Get('findAllAsync')
  async findAllAsync(): Promise<string[]> {
    return ['black cat', 'white cat', 'orange cat'];
  }

  /*
  Though this approach works, and does in fact allow for more flexibility in some ways by providing full control of the response object (headers manipulation, library-specific features, and so on), 
  it should be used with care. In general, the approach is much less clear and does have some disadvantages. 
  The main disadvantage is that your code becomes platform-dependent (as underlying libraries may have different APIs on the response object), and harder to test (you'll have to mock the response object, etc.).
  */
  @Get('findAllWithRes')
  findAllWithRes(@Res() res: Response) {
    res.status(HttpStatus.OK).json([{name: 'black cat', age: 1}, {name: 'white cat', age: 2}]);
  }


  /*
  * The HttpException constructor takes two required arguments which determine the response:
      The response argument defines the JSON response body. It can be a string or an object as described below.
      The status argument defines the HTTP status code.
    
    By default, the JSON response body contains two properties:
      {
        "statusCode": 403,
        "message": "Forbidden"
      }
  */
  @Get('mockException')
  @UseFilters(HttpExceptionFilter)
  async mockException() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Get('findById/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    // can change status code: @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    return 'find cat ' + id
  }
}
