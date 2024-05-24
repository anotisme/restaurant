import { Users } from '@prisma/client';

export type JWTUser = Pick<Users, 'id' | 'email' | 'name'>;
