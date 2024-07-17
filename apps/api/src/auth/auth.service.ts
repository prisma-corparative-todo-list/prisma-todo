import { Injectable, Logger } from '@nestjs/common';
import { SignupDto } from './dto';
import * as bcrypt from "bcrypt"
import { UserService } from 'user';
import { PasswordService } from './helpers/password.service';
import { User } from 'prisma/prisma-client';
import { MailService } from 'mail/mail.service';


@Injectable()
export class AuthService {
    
    constructor(
        private readonly userService: UserService,
        private readonly passwordService: PasswordService,
        private readonly mailService?: MailService
      ) {}
      
      private readonly logger = new Logger(AuthService.name)

    public async signup(data:SignupDto) : Promise<User> {

        const salt = await bcrypt.genSalt(5);

        const hashPass = await this.passwordService.hashPassword(
          data.password,
          salt
        );

        const user = await this.userService.createOne({
          hashPass,
          email: data.email,
          salt,
          userName:data.userName
        });

        await this.mailService.send(user.email,user.activationLink)

        return user
    }


   // public async signin(data:SigninDto){}

}
