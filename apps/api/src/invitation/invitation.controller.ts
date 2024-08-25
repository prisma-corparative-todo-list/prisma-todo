import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Invitation, Participant, User } from 'prisma/prisma-client';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UserService } from '../user/user.service';
import { InvitationGuard } from './invitation.guard';
import { AccessTokenGuard } from 'auth/guards/access-token.guard';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { IResponseInvitation } from '../../../../interfaces';
import { CurrentUser } from 'user/decorators/current-user.decorator';
import { ParticipantService } from '../participant/participant.service';

@UseGuards(AccessTokenGuard)
@Controller('invitation')
export class InvitationController {
  constructor(
    private readonly invitationService: InvitationService,
    private readonly userService: UserService,
    private readonly participantService: ParticipantService
  ) {}


  private readonly logger = new Logger(InvitationController.name);

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
          id: dto.groupId,
        },
      },
    });
  }

  @Get()
  public async findMany(
    @CurrentUser() user: User,
    @Query('cursor', ParseIntPipe) cursor?: number,
    @Query('limit', ParseIntPipe) limit?: number
  ): Promise<IResponseInvitation> {
    const invitations = await this.invitationService.findMany(
      { user: { id: user.id } },
      { limit, cursor }
    );

    return invitations;
  }

  @Post('accept')
  public async accept(
    @CurrentUser() user: User,
    @Query('groupId') groupId: string,
    @Query('invitationId') invitationId: string
  ): Promise<Participant> {

    this.logger.log(invitationId);
    
    await this.invitationService.deleteOne({ id: invitationId });

    return await this.participantService.joinToGroup(groupId, user.id);
  }

  @Delete('reject/:invitationId')
  public async reject(
    @CurrentUser() user: User,
    @Param('invitationId') invitationId: string
  ) {
    await this.invitationService.deleteOne({
      id: invitationId,
    });
  }
}
