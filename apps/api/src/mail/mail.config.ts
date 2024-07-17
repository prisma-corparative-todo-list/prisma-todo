import { ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { MailerOptions } from '@nestjs-modules/mailer';
import path, { join } from 'path';

export const getMailConfig = async (
  configService: ConfigService,
): Promise<MailerOptions> => {

  const email = configService.get<string>('EMAIL_USER')

  console.log(join(__dirname, '..','..','..','templates'))

  return {
    transport:{
      host: configService.get<string>("MAIL_HOST") || "smtp.gmail.com",
      port: configService.get<number>("MAIL_PORT"),
      secure: true,
      auth:{
        user: email,
        pass: configService.get<string>("USER_APP_PASS")
      }
    },
    defaults: {
      from: email
    },
    template: {
      dir: join(__dirname, '..','..','..','templates'),
      adapter: new EjsAdapter(),
      options: {
        strict: false,
      },
    },
  };
};