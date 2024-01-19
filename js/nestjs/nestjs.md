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

## response
Nest employs two different options for manipulating responses:
### 1. standard
Using this built-in method, when a request handler returns a JavaScript object or array, it will automatically be serialized to JSON. 
When it returns a JavaScript primitive type (e.g., string, number, boolean), however, Nest will send just the value without attempting to serialize it. 
This makes response handling simple: just return the value, and Nest takes care of the rest.

Furthermore, the response's status code is always 200 by default, except for POST requests which use 201.
We can easily change this behavior by adding the @HttpCode(...) decorator at a handler-level.

### 2. libiary-specific
We can use the library-specific (e.g., Express) response object, 
which can be injected using the @Res() decorator in the method handler signature (e.g., findAll(@Res() response)). 
With this approach, you have the ability to use the native response handling methods exposed by that object. 
For example, with Express, you can construct responses using code like response.status(200).send().

<br>

## reference
- https://docs.nestjs.com/