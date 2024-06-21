import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { PrismaModule } from 'prisma';
import { MulterModule } from '@nestjs/platform-express';
import { UploadFileMiddleware } from 'shared/upload-file.middleware';

@Module({
  imports: [PrismaModule,MulterModule.registerAsync({
    useClass: UploadFileMiddleware
  })],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule {}
