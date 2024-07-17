import { Controller, Get, Param } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { Participant } from 'prisma/prisma-client';

@Controller('participant')
export class ParticipantController {

    constructor(
        private readonly participantService: ParticipantService
    ) {}

    
    @Get(":groupId")
    async findMany(@Param("groupId") groupId: string): Promise<Participant[]> {
        return await this.participantService.findMany({ groupId });
    }

}
