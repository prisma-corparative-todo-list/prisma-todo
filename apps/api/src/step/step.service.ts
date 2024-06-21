import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma';

@Injectable()
export class StepService {

    constructor(
        private readonly prisma:PrismaService
    ){}

    


}
