import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';


/**
First, note that the transform() method is marked as async. 
This is possible because Nest supports both synchronous and asynchronous pipes. 
We make this method async because some of the class-validator validations can be async 

you don't have to build a generic validation pipe on your own since the ValidationPipe is provided by Nest out-of-the-box. 
The built-in ValidationPipe offers more options than the sample we built, which has been kept basic for the sake of illustrating the mechanics of a custom-built pipe
*/
@Injectable()
export class ClassValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}