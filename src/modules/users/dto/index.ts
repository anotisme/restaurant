import { MinLength } from 'class-validator';

export class CreateUserDto {
  id: string;
  @MinLength(5, { message: 'At least 5 characters' })
  name: string;

  email: string;

  password: string;
  createdAt: Date;
  updatedAt: Date;
  phoneNumber: string;
}
