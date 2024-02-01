import { Reflector } from '@nestjs/core';

// The Roles decorator here is a function that takes a single argument of type string[].
export const Roles = Reflector.createDecorator<string[]>();