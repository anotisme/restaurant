import { sign } from 'jsonwebtoken';
import { v4 as uiidv4 } from 'uuid';
import { JWTUser } from '../../modules/auth/types';

export function generateAccessToken(user: JWTUser) {
  const accessToken = sign({ ...user }, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: '8hr',
  });

  return accessToken;
}

export function generateRefreshToken() {
  const token = uiidv4();

  return token;
}
