import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
  imports: [PrismaModule],
})
export class CustomersModule {}
