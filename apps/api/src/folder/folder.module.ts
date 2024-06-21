import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { PrismaModule } from 'prisma';
import { FolderController } from './folder.controller';

@Module({
  imports: [PrismaModule],
  providers: [FolderService],
  controllers: [FolderController]
})
export class FolderModule {}
