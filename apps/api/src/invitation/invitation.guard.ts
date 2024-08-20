import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserService } from 'user';
import { CreateInvitationDto } from './dto/create-invitation.dto';

@Injectable()
export class InvitationGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const { email } = req.body as CreateInvitationDto;

    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new NotFoundException('user doesnot exist');
    }

    return true
  }
}
