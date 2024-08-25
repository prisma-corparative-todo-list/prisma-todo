import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Group, User } from 'prisma/prisma-client';
import { GroupService } from './group.service';
import { CurrentUser } from 'user/decorators/current-user.decorator';
import { UpdateGroupDto } from './dtos/update-group.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from 'shared/file.decorator';
import { AccessTokenGuard } from 'auth/guards/access-token.guard';
import { CreateGroupDto } from './dtos/create-group.dto';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { IGroupInfo } from '../../../../interfaces';
import { ParticipantService } from '../participant/participant.service';

@UseGuards(AccessTokenGuard)
@Controller('group')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly participantService: ParticipantService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  public async create(
    @Body() dto: CreateGroupDto,
    @File() filename: string,
    @CurrentUser() { id }: User
  ): Promise<Group> {
    const group = await this.groupService.create({
      ...dto,
      logo: filename,
      owner: { connect: { id } },
    });

    await this.participantService.createOne({
      user: { connect: { id } },
      group: { connect: { id: group.id } },
      role: 'ADMIN',
    });

    return group;
  }

  @Get()
  public async findMany(@CurrentUser() { id: userId }: User): Promise<Group[]> {
    return await this.groupService.findMany({
      participants: { some: { userId } },
    });
  }

  @Patch(':groupId')
  public async updateOne(
    @Body() dto: UpdateGroupDto,
    @Param('groupId') groupId: string
  ): Promise<Group> {
    return await this.groupService.updateOne(dto, { id: groupId });
  }

  @Delete('leave/:id')
  public async leave(
    @Param('groupId') groupId: string,
    @CurrentUser() { id: userId }: User
  ): Promise<void> {
    return await this.groupService.leave(userId, groupId);
  }

  @Delete(':groupId')
  public async deleteOne(@Param('groupId') groupId: string): Promise<void> {
    await this.groupService.deleteOne({ id: groupId });
  }

  @Get(':groupId')
  public async findOne(@Param('groupId') groupId: string): Promise<IGroupInfo> {
    return await this.groupService.findOne({ id: groupId });
  }
}
