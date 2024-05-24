import { Logger, Module } from '@nestjs/common';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { CustomersModule } from './modules/customers/customers.module';
import { AuthModule } from './modules/auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { UserModule } from './modules/users/users.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: typeof redisStore,
      host: 'localhost',
      port: 6379,
    }),
    AuthModule,
    UserModule,
    CustomersModule,
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log',
          }),
        ],
      },
    }),
  ],
})
export class AppModule {}
