import { hash } from 'argon2';

export async function handleHashedPassword(password: string): Promise<string> {
  const hashedPassword = await hash(password);
  return hashedPassword;
}
