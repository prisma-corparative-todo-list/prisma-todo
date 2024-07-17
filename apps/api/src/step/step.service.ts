import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Step } from 'prisma/prisma-client';

@Injectable()
export class StepService {

    constructor(
        private readonly prisma:PrismaService
    ){}

    async findMany(payload:Prisma.StepWhereInput): Promise<Step[]> {
        return await this.prisma.step.findMany( {where : payload })
    }

    async create(data:Prisma.StepCreateInput): Promise<Step> {
        return await this.prisma.step.create({ data })
    }

    async deleteOne(payload:Prisma.StepWhereUniqueInput): Promise<void> {
        await this.prisma.step.delete({ where: payload })
    }

    async updateOne(payload:Prisma.StepWhereUniqueInput,data:Prisma.StepUpdateInput): Promise<Step> {
        return await this.prisma.step.update({
            where: payload,
            data
        })
    }

    async findOne(payload:Prisma.StepWhereUniqueInput): Promise<Step> {
        return await this.prisma.step.findUnique({ where: payload })
    }

}
