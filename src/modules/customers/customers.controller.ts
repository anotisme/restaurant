import { Controller, Get, Param } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { ResponseData } from 'src/global/globalClass';
import { Customers } from '@prisma/client';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';

@Controller('/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async getCustomers() {
    try {
      return new ResponseData<Customers[]>(
        await this.customersService.getCustomers(),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Customers[]>(
        error,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get(':id')
  async getCustomer(@Param('id') id: string) {
    try {
      return new ResponseData<Customers>(
        await this.customersService.getCustomer(id),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Customers>(
        error,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
