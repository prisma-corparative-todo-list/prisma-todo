import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserService } from 'user/user.service';
import { TokenService } from 'auth/helpers/token.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export const WsCurrentUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToWs().getClient();

    function getCookieValue(
      cookieString: string,
      cookieName: string
    ): string | null {
      const match = cookieString.match(
        new RegExp('(^| )' + cookieName + '=([^;]+)')
      );
      return match ? match[2] : null;
    }

    const accessToken = getCookieValue(
      request.handshake.headers.cookies,
      'accessToken'
    );

    const prisma = new PrismaService();

    const tokenService = new TokenService(
      new JwtService(),
      prisma,
      new ConfigService()
    );

    const userEmail = await tokenService.verifyToken(accessToken);

    const userService = new UserService(prisma);

    const user = await userService.findOne({ email: userEmail });

    return user
  }
);
