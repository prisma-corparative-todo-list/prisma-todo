import { Participant } from "prisma/prisma-client";
import { SERVICE_URL } from "../../model/constants";
import { instance } from "../api.instance";




export const ParticipantService = {

    axios: instance,

    async findMany() : Promise<Participant[]> {
        return (await this.axios.get(`${SERVICE_URL.PARTICIPANT}`)).data
    }
}