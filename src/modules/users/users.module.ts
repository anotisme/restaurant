import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { PrismaModule } from 'nestjs-prisma';
import { AuthenticationMiddleware } from 'src/middlewares/authMiddleware';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [PrismaModule],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('/users');
  }
}
