import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class MailService {

    constructor(
        private readonly mailerService: MailerService
    ){}

    private readonly logger = new Logger(MailService.name)

    public async send(email:string,link:string) : Promise<void> {

        return await this.mailerService.sendMail({
            to:email,
            subject:"Prisma. Corparative TODO",
            context:{
                link,
            },
            template:"confirmReg",
        })
    }

}
