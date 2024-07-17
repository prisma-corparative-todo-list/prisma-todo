import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';

import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';
import { TokenService } from '../../auth/helpers/token.service';

export class AuthIoAdapter extends IoAdapter {
  private readonly authService: AuthService;
  private readonly userService: UserService;
  private readonly tokenService: TokenService;

  constructor(private app: INestApplicationContext) {
    super(app);
    this.authService = this.app.get(AuthService);
    this.userService = this.app.get(UserService);
    this.tokenService = this.app.get(TokenService);
  }

  createIOServer(port: number, options?: any): any {
    options.allowRequest = async (request, allowFunction) => {
      const token = request._query?.token;

      const email = token && (await this.tokenService.verifyToken(token));

      const userExists =
        email &&
        (await this.userService.findOne({
          email,
        }));

      if (email && userExists) {
        return allowFunction(null, true);
      }

      return allowFunction('Unauthorized', false);
    };

    return super.createIOServer(port, options);
  }
}
