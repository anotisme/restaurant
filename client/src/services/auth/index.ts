import * as fetcher from "@/services/utils/fetcher";
import {
  SignInDto,
  SignInResponse,
  SignUpDto,
} from "@/containers/Login/interfaces";

export async function signIn(input: SignInDto) {
  const data = await fetcher.post<SignInDto, SignInResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`,
    {
      ...input,
    }
  );
  return data;
}

export async function signUp(input: SignUpDto) {
  const data = await fetcher.post<SignUpDto, SignInResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/sign-up`,
    {
      ...input,
    }
  );
  return data;
}
