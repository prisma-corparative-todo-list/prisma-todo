import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FolderService } from './folder.service';
import { Folder, User } from 'prisma/prisma-client';
import { CurrentUser } from 'user/current-user.decorator';
import { CreateFolderDto } from './dtos/create-folder.dto';
import { UpdateFolderDto } from './dtos/update-folder.dto';

@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  public async create(
    @CurrentUser() { id: userId }: User,
    @Body() { title }: CreateFolderDto
  ): Promise<Folder> {
    return await this.folderService.create({
      title,
      user: { connect: { id: userId } },
    });
  }

  @Get()
  public async findMany(@CurrentUser() { id : userId }:User): Promise<Folder[]> {
    return await this.folderService.findMany({ userId })
  }

  @Put(":folderId")
  public async updateOne(@Param("folderId") folderId: string,@Body() dto: UpdateFolderDto): Promise<Folder> {
    return await this.folderService.updateOne({...dto},{ id:folderId })
  }

  @Delete(":folderId")
  public async deleteOne(@Param("folderId") folderId: string): Promise<void> {
     await this.folderService.deleteOne({ id : folderId })
  }


}
