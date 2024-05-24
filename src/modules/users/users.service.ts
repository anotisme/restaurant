import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  getOneUser(id: string) {
    return this.prismaService.users.findFirst({
      where: { id },
    });
  }

  getUserByEmail(email: string) {
    return this.prismaService.users.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    return this.prismaService.users.create({
      data: createUserDto,
    });
  }
}
