import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CustomersService {
  constructor(private readonly prismaService: PrismaService) {}

  getCustomers() {
    return this.prismaService.customers.findMany();
  }

  getCustomer(id: string) {
    return this.prismaService.customers.findFirst({
      where: { id },
    });
  }
}
