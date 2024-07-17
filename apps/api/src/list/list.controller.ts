import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ListService } from './list.service';
import { List, User } from 'prisma/prisma-client';
import { CurrentUser } from 'user/decorators/current-user.decorator';
import { CreateListDto } from './dtos/create-list.dto';
import { UpdateListDto } from './dtos/update-list.dto';
import { AccessTokenGuard } from 'auth/guards/access-token.guard';

@UseGuards(AccessTokenGuard)
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  public async findMany(@CurrentUser() { id: userId }: User): Promise<List[]> {
    return await this.listService.findMany({ userId });
  }

  @Get(':listId')
  public async findOne(
    @Param('listId') listId: string
  ): Promise<List> {
    return await this.listService.findOne({ id: listId });
  }

  @Post()
  public async create(
    @CurrentUser() { id: userId }: User,
    @Body() { title }: CreateListDto
  ): Promise<List> {
    return await this.listService.create({
      title,
      user: { connect: { id: userId } },
    });
  }

  @Put(':listId')
  public async updateOne(
    @Param('listId') listId: string,
    @Body() dto: UpdateListDto
  ): Promise<List> {
    return await this.listService.updateOne({ ...dto }, { id: listId });
  }

  @Delete(':listId')
  public async deleteOne(
    @Param('listId') folderId: string
  ): Promise<void> {
    await this.listService.deleteOne({ id: folderId });
  }
  



}
