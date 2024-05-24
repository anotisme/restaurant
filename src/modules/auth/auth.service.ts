import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import { JWTUser } from './types';
import {
  generateAccessToken,
  generateRefreshToken,
} from 'src/shared/utils/generateToken';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { REFRESH_TOKEN_EXPIRE_IN } from 'src/shared/constant';
import { UserService } from '../users/users.service';
import { verify } from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { handleHashedPassword } from 'src/shared/utils/password';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    private readonly userService: UserService,
  ) {}

  async createToken(user: JWTUser) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();

    this.cacheService.set(
      String(user.id),
      refreshToken,
      REFRESH_TOKEN_EXPIRE_IN * 60 * 60,
    ); // in seconds

    return {
      accessToken,
      refreshToken,
    };
  }

  async singIn({ email, password }: SignInDto) {
    try {
      const user = await this.userService.getUserByEmail(email);

      const responseUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        isActive: user.isActive,
        phoneNumber: user.phoneNumber,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      if (!user) {
        throw new NotFoundException(`No user found for email: ${email}`);
      }

      const { id, name } = user;

      const isPasswordMatch = await verify(user.password, password);

      if (!isPasswordMatch) {
        throw new BadRequestException('Incorrect password');
      }

      const tokens = await this.createToken({
        id,
        name,
        email,
      });

      return {
        data: {
          ...tokens,
          user: responseUser,
        },
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async signUp(payload: SignUpDto) {
    const { phoneNumber, email, password, ...rest } = payload;

    try {
      const foundUser = await this.userService.getUserByEmail(email);

      if (foundUser) {
        throw new ConflictException('User email already exist!');
      }

      const hashedPassword = await handleHashedPassword(password);

      const newUser = await this.userService.createUser({
        ...rest,
        id: uuidv4(),
        password: hashedPassword,
        email,
        createdAt: new Date(),
        updatedAt: new Date(),
        phoneNumber,
      });

      return {
        data: newUser,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async getRefreshToken(requestedRefreshToken: string, user: JWTUser) {
    const redisRefreshToken = await this.cacheService.get(String(user.id));

    if (redisRefreshToken === requestedRefreshToken) {
      return this.createToken(user);
    }

    return undefined;
  }
}
