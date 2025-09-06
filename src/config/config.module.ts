import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule} from '@nestjs/config';
import * as Joi from 'joi';
@Module({
    imports: [NestConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().port().default(3000),
        MONGODB_URI: Joi.string().required(),
      }),
    })],
})
export class ConfigModule {}
