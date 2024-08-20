import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Invitation } from 'prisma/prisma-client';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UserService } from '../user/user.service';
import { InvitationGuard } from './invitation.guard';

@Controller('invitation')
export class InvitationController {
  constructor(
    private readonly invitationService: InvitationService,
    private readonly userService: UserService
  ) {}

  @UseGuards(InvitationGuard)
  @Post()
  public async createOne(
    @Body() dto: CreateInvitationDto
  ): Promise<Invitation> {
    const user = await this.userService.findOne({
      email: dto.email,
    });

    return await this.invitationService.createOne({
      user: {
        connect: {
          id: user.id,
        },
      },
      group: {
        connect: {
            id: dto.groupId
        }
      }
    });
  }
}
