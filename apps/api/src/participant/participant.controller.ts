import { Controller, Get, Param } from '@nestjs/common';
import { ParticipantService } from './participant.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { IUserWithUserRole } from '../../../../interfaces';

@Controller('participant')
export class ParticipantController {

    constructor(
        private readonly participantService: ParticipantService
    ) {}

    @Get(":groupId")
    async findMany(@Param("groupId") groupId: string): Promise<IUserWithUserRole[]> {
        return await this.participantService.findMany({ groupId });
    }

}
