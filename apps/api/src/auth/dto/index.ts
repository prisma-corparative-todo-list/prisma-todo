export class SignupDto {
  email: string;
  userName: string;
  password: string;
}

export class SigninDto {
  login: string;
  password: string;
}

export class TokensAndUserIdResponse {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  userId: string;
}
