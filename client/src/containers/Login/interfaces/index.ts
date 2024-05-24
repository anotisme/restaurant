export interface SignInDto {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SignInResponse {
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  statusCode: number;
}

export interface SignUpDto {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}
