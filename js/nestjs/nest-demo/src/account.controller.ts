import { Controller, Get, HostParam } from '@nestjs/common';

// The @Controller decorator can take a host option to require that the HTTP host of the incoming requests matches some specific value.
@Controller({ host: ':account.example.com' })
export class AccountController {
  // Similar to a route path, the hosts option can use tokens to capture the dynamic value at that position in the host name
  @Get()
  getInfo(@HostParam('account') account: string) {
    return account;
  }
}
