import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/**
Each application has at least one module, a root module. 
The root module is the starting point Nest uses to build the application graph - the internal data structure Nest uses to resolve module and provider relationships and dependencies. 
While very small applications may theoretically have just the root module, this is not the typical case. 

We want to emphasize that modules are strongly recommended as an effective way to organize your components. 
Thus, for most applications, the resulting architecture will employ multiple modules, each encapsulating a closely related set of capabilities.

To create a module using the CLI, simply execute: nest g module [module_name].

In Nest, modules are singletons by default, and thus you can share the same instance of any provider between multiple modules effortlessly.
*/

/**
* 1. Controllers always belong to a module, which is why we include the controllers array within the @Module() decorator. 
* 2. Providers are a fundamental concept in Nest. Many of the basic Nest classes may be treated as a provider – services, repositories, factories, helpers, and so on. 
* The main idea of a provider is that it can be injected as a dependency; this means objects can create various relationships with each other, 
* and the function of "wiring up" these objects can largely be delegated to the Nest runtime system.
* 3. imports: the list of imported modules that export the providers which are required in this module.
* 4. exports: the subset of providers that are provided by this module and should be available in other modules which import this module. You can use either the provider itself or just its token (provide value)
*/
@Module({
  imports: [],
  exports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
