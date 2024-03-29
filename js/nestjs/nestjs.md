# nestjs
Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications. 
It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers to code in pure JavaScript) 
and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

Under the hood, Nest makes use of robust HTTP Server frameworks like <strong>Express<strong> (the default) 
and optionally can be configured to use <strong>Fastify<strong> as well!

<br>

## demo
[demo](./nest-demo)
```
app.controller.ts	A basic controller with a single route.
app.controller.spec.ts	The unit tests for the controller.
app.module.ts	The root module of the application.
app.service.ts	A basic service with a single method.
main.ts	The entry file of the application which uses the core function NestFactory to create a Nest application instance.
```

<br>

## Inject
### @Optional
In such a case, the dependency becomes optional, because lack of the configuration provider wouldn't lead to errors.
```
@Injectable()
export class HttpService<T> {
  constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}
}
```

### Property-based injection
```
@Injectable()
export class HttpService<T> {
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;
}
```
If your class doesn't extend another class, you should always prefer using constructor-based injection:
```
constructor(private catsService: CatsService) {}
```

### @Global()
```
@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```
The @Global() decorator makes the module global-scoped. 
Global modules should be registered only once, generally by the root or core module. 
In the above example, the CatsService provider will be ubiquitous, and modules that wish to inject the service will not need to import the CatsModule in their imports array.

<br>

## Middleware
Middleware is a function which is called before the route handler.
Middleware functions have access to the request and response objects, and the next() middleware function in the application’s request-response cycle. 
The next middleware function is commonly denoted by a variable named next.

Nest middleware are, by default, equivalent to express middleware,

Middleware functions can perform the following tasks:
- execute any code.
- make changes to the request and the response objects.
- end the request-response cycle.
- call the next middleware function in the stack.
- if the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

-> [demo](./nest-demo/src/middleware/logger.middleware.ts)

<br>

## Exception process

### 1. process exception in catch block
```
@Get()
async findAll() {
  try {
    await this.service.findAll()
  } catch (error) { 
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'This is a custom message',
    }, HttpStatus.FORBIDDEN, {
      cause: error
    });
  }
}
```
Customer Exception:
```
export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
```
Built-in HTTP exceptions:
```
BadRequestException
UnauthorizedException
NotFoundException
ForbiddenException
NotAcceptableException
RequestTimeoutException
ConflictException
GoneException
HttpVersionNotSupportedException
PayloadTooLargeException
UnsupportedMediaTypeException
UnprocessableEntityException
InternalServerErrorException
NotImplementedException
ImATeapotException
MethodNotAllowedException
BadGatewayException
ServiceUnavailableException
GatewayTimeoutException
PreconditionFailedException
```
throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })


### 2. Exception filter
Nest comes with a built-in exceptions layer which is responsible <strong>for processing all unhandled exceptions</strong> across an application. 
When an exception is not handled by your application code, it is caught by this layer, which then automatically sends an appropriate user-friendly response.

While the base (built-in) exception filter can automatically handle many cases for you, you may want full control over the exceptions layer. 
For example, you may want to <strong>add logging or use a different JSON schema</strong> based on some dynamic factors. 

Exception filters are designed for exactly this purpose. They let you control the exact flow of control and the content of the response sent back to the client.

-> [demo](./nest-demo/src/exception/http-exception.filter.ts)

<br>

## pipes
A pipe is a class annotated with the @Injectable() decorator, which implements the PipeTransform interface.

Pipes have two typical use cases:
- transformation: transform input data to the desired form (e.g., from string to integer)
- validation: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception

In both cases, pipes operate on the arguments being processed by a controller route handler. 

### 1. built-in pipes
Nest comes with nine pipes available out-of-the-box:
```
ValidationPipe
ParseIntPipe
ParseFloatPipe
ParseBoolPipe
ParseArrayPipe
ParseUUIDPipe
ParseEnumPipe
DefaultValuePipe
ParseFilePipe
```
[demo](./nest-demo/src/app.controller.ts) -> findById


### 2. custom pipes
you can build your own custom pipes.
```
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
```
`PipeTransform<T, R>` is a generic interface that must be implemented by any pipe. 
The generic interface uses T to indicate the type of the input value, and R to indicate the return type of the transform() method.

The value parameter is the currently processed method argument (before it is received by the route handling method), 
and metadata is the currently processed method argument's metadata:
```
export interface ArgumentMetadata {
  type: 'body' | 'query' | 'param' | 'custom';
  metatype?: Type<unknown>;
  data?: string;
}
```

<br>

## Guards
Guards have a single responsibility. They determine whether a given request will be handled by the route handler or not, 
depending on certain conditions (like permissions, roles, ACLs, etc.) present at run-time. 
This is often referred to as authorization.

Authorization (and its cousin, authentication, with which it usually collaborates) has typically been handled by middleware in traditional Express applications.

But middleware, by its nature, is dumb. It doesn't know <strong>which handler will be executed</strong> after calling the next() function. 
On the other hand, Guards have access to the <strong>ExecutionContext</strong> instance, and thus know exactly what's going to be executed next.

->[authdemo](./nest-demo/src/guards/auth.guard.ts)

<br>


## Interceptor
Interceptors have a set of useful capabilities which are inspired by the Aspect Oriented Programming (AOP) technique. 
They make it possible to:
- bind extra logic before / after method execution
- transform the result returned from a function
- transform the exception thrown from a function
- extend the basic function behavior
- completely override a function depending on specific conditions (e.g., for caching purposes)

[demo](./nest-demo/src/interceptor/)

<br>

## reference
- https://docs.nestjs.com/
- https://docs.nestjs.com/fundamentals/execution-context