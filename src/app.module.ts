import { Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import * as Joi from "joi";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.' + process.env.NODE_ENV,
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('dev')
          .required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required()
      })
    }),
    TypeOrmModule.forRoot({
      "type": "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      "synchronize": true,
      "logging": true,
      "entities": [
        "src/entity/**/*.ts"
      ],
      "migrations": [
        "src/migration/**/*.ts"
      ],
      "subscribers": [
        "src/subscriber/**/*.ts"
      ]
    }),
    GraphQLModule.forRoot({
    autoSchemaFile: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
