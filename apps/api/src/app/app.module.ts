import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [AuthModule, UserModule, ConfigModule.forRoot({isGlobal:true}),PrismaModule,MailModule],
})
export class AppModule {}
