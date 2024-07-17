import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ListController } from './list.controller';

@Module({
  imports: [PrismaModule],
  providers: [ListService],
  controllers: [ListController],
})
export class ListModule {}
