import { IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
    @IsString()
    name:string;

    @IsOptional()
    filename?:string

    @IsString()
    @IsOptional()
    ownerId?:string

}