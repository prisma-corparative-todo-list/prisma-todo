import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { Group, User } from 'prisma/prisma-client';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dtos/create-group.dto';
import { CurrentUser } from 'user/current-user.decorator';
import { UpdateGroupDto } from './dtos/update-group.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from "shared/file.decorator"


@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @UseInterceptors(FileInterceptor("photo"))
  public async create(@Body() dto: CreateGroupDto, @File() filename: string): Promise<Group> {
    return await this.groupService.create({ ...dto, logo: filename });
  }

  @Get()
  public async findMany(@CurrentUser() user: User): Promise<Group[]> {
    return await this.groupService.findMany({
      participants: { every: { userId: user.id } },
    });
  }

  @Patch(":groupId")
  public async updateOne(@Body() dto : UpdateGroupDto,@Param("groupId") groupId: string): Promise<Group> {
    return await this.groupService.updateOne( dto , { id : groupId})
  }

  @Delete("leave/:id")
  public async leave(@Param("groupId") groupId: string,@CurrentUser() {id:userId}: User): Promise<void> {
    return await this.groupService.leave( userId , groupId )
  }

  @Delete(":groupId")
  public async deleteOne(@Param("groupId") groupId: string): Promise<void> {
    await this.groupService.deleteOne({ id : groupId })
  }

}
