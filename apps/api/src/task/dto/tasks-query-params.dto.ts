import { IsOptional, IsDateString, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class TasksQueryParamsDto {
  @IsOptional()
  @IsDateString()
  deadline?: Date;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isImportant: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isPlanned?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isToday?: boolean;
}
