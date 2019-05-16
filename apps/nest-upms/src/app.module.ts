import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormModule } from './typeorm/index';
import { ssoProviders } from './sso';
import { AuthModule } from './auth';
import { JwtStrategyImpl } from './sso/jwt.strategy.impl';
import coreProviders from './core/index';
import baseInfoProviders from './baseInfo';
import commonServicesProviders from './commonServices/index';
import casbinProviders from './casbin/providers'
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlOptions } from './graphql.options'
@Module({
  imports: [
    TypeormModule,
    AuthModule.forRoot(JwtStrategyImpl),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'test_ci',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GraphQLModule.forRootAsync({
      useClass: GraphqlOptions,
    })
  ],
  controllers: [],
  providers: [
    ...coreProviders,
    ...ssoProviders,
    ...baseInfoProviders,
    ...commonServicesProviders,
    ...casbinProviders
  ]
})
export class ApplicationModule { }
