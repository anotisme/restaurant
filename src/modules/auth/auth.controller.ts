import {
  Body,
  Controller,
  Post,
  Put,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Users } from '@prisma/client';
import { ResponseData } from 'src/global/globalClass';
import { SignInDto, SignUpDto } from './dto';
import { AuthService } from './auth.service';
import { REFRESH_TOKEN_EXPIRE_IN } from 'src/shared/constant';
import { Request, Response } from 'express';
import { JWTUser } from './types';
import { HttpStatus } from 'src/global/globalEnum';
import * as jwt from 'jsonwebtoken';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(
    @Body() payload: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const {
        data: { accessToken, refreshToken, user },
      } = await this.authService.singIn(payload);

      response.cookie('refreshToken', refreshToken, {
        maxAge: REFRESH_TOKEN_EXPIRE_IN * 60 * 60 * 1000,
        sameSite: 'none',
        httpOnly: true,
        secure: false,
        // path: '/auth/refresh-token',
        path: '/refresh-token',
      });

      return {
        data: {
          accessToken,
          refreshToken,
          user,
        },
      };
    } catch (error) {
      return new ResponseData<Users>(
        null,
        error.response.statusCode,
        error.message,
      );
    }
  }

  @Post('sign-up')
  async signUp(@Body() payload: SignUpDto) {
    try {
      const newUser = await this.authService.signUp(payload);

      return newUser;
    } catch (error) {
      return new ResponseData<Users>(
        null,
        error.response.statusCode,
        error.message,
      );
    }
  }

  @Put('refresh-token')
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const authorizationHeader = request.headers['authorization'];

      const token = authorizationHeader && authorizationHeader.split(' ')[1];
      const refreshToken = request.cookies['refreshToken'];

      if (!refreshToken || !token) {
        throw new UnauthorizedException('Invalid token');
      }

      const jwtObject = jwt.decode(token);

      const { id, email, name } = jwtObject as JWTUser;

      const data = await this.authService.getRefreshToken(refreshToken, {
        email,
        id,
        name,
      });

      if (!data) {
        throw new UnauthorizedException('Refresh Token Expired');
      }

      response.cookie('refreshToken', data.refreshToken, {
        maxAge: REFRESH_TOKEN_EXPIRE_IN * 60 * 60 * 1000,
        sameSite: 'none',
        httpOnly: true,
        secure: false,
        path: '/refresh-token',
      });

      return data;
    } catch (error) {
      return new ResponseData<Users>(null, HttpStatus.ERROR, error?.message);
    }
  }
}
