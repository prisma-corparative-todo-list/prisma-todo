import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'user';
import { Prisma } from 'prisma/prisma-client';

@Injectable()
export class SignupGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const {
      body: { email, userName },
    }: { body: Pick<Prisma.UserWhereUniqueInput, 'email' | 'userName'> } =
      context.switchToHttp().getRequest();

    const user = await this.userService.findOne({
      OR: [{ email: email }, { userName: userName }],
      
    });

    return user ? false : true
  }
}
