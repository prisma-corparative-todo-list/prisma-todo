import { Module } from '@nestjs/common';
import { RequisitionController } from './requisition.controller';

@Module({
  controllers: [RequisitionController]
})
export class RequisitionModule {}
