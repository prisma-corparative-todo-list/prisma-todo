import { Invitation } from 'prisma/prisma-client';
import { SERVICE_URL } from '../../model/constants';
import { instance } from '../api.instance';
import { ICreateInvitation } from 'interfaces';

export const InvitationService = {
  axios: instance,

  async createOne(data: ICreateInvitation): Promise<Invitation> {
    return (await this.axios.post(`${SERVICE_URL.INVITATION}`, data)).data;
  },

  async findMany(): Promise<Invitation[]> {
    return (await this.axios.get(`${SERVICE_URL.INVITATION}`)).data;
  },
};
