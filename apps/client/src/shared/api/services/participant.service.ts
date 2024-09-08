import { User } from "prisma/prisma-client";
import { SERVICE_URL } from "../../model/constants";
import { instance } from "../api.instance";
import { IUserWithUserRole } from "interfaces";




export const ParticipantService = {

    axios: instance,

    async findMany(id?: string) : Promise<IUserWithUserRole[]> {
        return (await this.axios.get(`${SERVICE_URL.PARTICIPANT}/${id}`)).data
    }
}