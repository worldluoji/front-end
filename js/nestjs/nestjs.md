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

## reference
- https://docs.nestjs.com/