import { createParamDecorator, ExecutionContext } from '@nestjs/common';


/**
Let's define a decorator that takes a property name as key, 
and returns the associated value if it exists (or undefined if it doesn't exist, 
or if the user object has not been created).
*/
export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);

/** 
@Get()
async findOne(@User() user: UserEntity) {
  console.log(user);
}

// You can use this same decorator with different keys to access different properties
@Get()
async findOne(@User('firstName') firstName: string) {
  console.log(`Hello ${firstName}`);
}

Nest treats custom param decorators in the same fashion as the built-in ones (@Body(), @Param() and @Query()). 
This means that pipes are executed for the custom annotated parameters as well (in our examples, the user argument).
Moreover, you can apply the pipe directly to the custom decorator:

@Get()
async findOne(
  @User(new ValidationPipe({ validateCustomDecorators: true }))
  user: UserEntity,
) {
  console.log(user);
}


Decorator composition: combine all decorators related to authentication into a single decorator.
import { applyDecorators } from '@nestjs/common';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
*/