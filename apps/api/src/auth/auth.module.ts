import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenService } from './helpers/token.service';
import { PasswordService } from './helpers/password.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'user/user.module';
import { PrismaModule } from 'prisma';
import { MailModule } from 'mail/mail.module';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports:[JwtModule.register({}),UserModule,PrismaModule,MailModule],
  controllers: [AuthController],
  providers: [AuthService,TokenService,PasswordService,AccessTokenStrategy,
    RefreshTokenStrategy,]
})
export class AuthModule {};
 