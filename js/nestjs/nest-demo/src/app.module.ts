import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/**
* 1. Controllers always belong to a module, which is why we include the controllers array within the @Module() decorator. 
* 2. Providers are a fundamental concept in Nest. Many of the basic Nest classes may be treated as a provider – services, repositories, factories, helpers, and so on. 
* The main idea of a provider is that it can be injected as a dependency; this means objects can create various relationships with each other, 
* and the function of "wiring up" these objects can largely be delegated to the Nest runtime system.
*/
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
