import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { CreateStepDto } from './dto/create-step.dto';
import { Step } from 'prisma/prisma-client';
import { StepService } from './step.service';
import { connect } from 'http2';
import { AccessTokenGuard } from 'auth/guards/access-token.guard';
import { UpdateStepDto } from './dto/update-step.dto';

@UseGuards(AccessTokenGuard)
@Controller('step')
export class StepController {
  constructor(private readonly stepService: StepService) {}

  @Post()
  public async create(@Body() dto: CreateStepDto): Promise<Step> {
    return await this.stepService.create({
      content: dto.content,
      task: { connect: { id: dto.taskId } },
      isCompleted: false,
    });
  }

  @Get(':taskId')
  public async findMany(@Param('taskId') taskId: string): Promise<Step[]> {
    return await this.stepService.findMany({ taskId });
  }

  @Patch('completed/:stepId')
  public async toggleComplete(@Param('stepId') stepId: string): Promise<Step> {
    const step = await this.stepService.findOne({ id: stepId });
    return await this.stepService.updateOne(
      { id: stepId },
      { isCompleted: !step.isCompleted }
    );
  }

  @Patch(':stepId')
  public async updateOne(
    @Param('stepId') stepId: string,
    @Body() dto: UpdateStepDto
  ): Promise<Step> {
    return await this.stepService.updateOne({ id: stepId }, { ...dto });
  }

  @Delete(':stepId')
  public async deleteOne(@Param('stepId') stepId: string): Promise<void> {
    await this.stepService.deleteOne({ id: stepId });
  }
}
