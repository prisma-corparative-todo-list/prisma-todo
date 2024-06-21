import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'user';
import { SignupDto } from '../dto';
import { Prisma } from 'prisma/prisma-client';

@Injectable()
export class SignupGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const {
      body: { email, userName },
    }: { body: Pick<Prisma.UserWhereUniqueInput,"email" | "userName"> } = context.switchToHttp().getRequest();

    const user = await this.userService.findOne({
      OR:[
        { email },{ userName }
      ]
    }); 

    

    if (user) {
      return false;
    }

    return true;
  }
}
