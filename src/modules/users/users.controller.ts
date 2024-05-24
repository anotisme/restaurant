import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { Users } from '@prisma/client';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { UserService } from './users.service';
import { CreateUserDto } from './dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getOneUser(@Param('id') id: string) {
    try {
      const user = await this.userService.getOneUser(id);
      if (!user) {
        throw new NotFoundException(`User ${id} not found`);
      }

      return new ResponseData<Users>(
        user,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch {
      return new ResponseData<Users>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Post()
  async createUser(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<ResponseData<Users>> {
    try {
      return new ResponseData<Users>(
        await this.userService.createUser(createUserDto),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch {
      return new ResponseData<Users>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
}
