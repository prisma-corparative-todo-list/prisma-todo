import { ICreateGroup, IGroupInfo } from 'interfaces';
import { instance } from '../api.instance';
import { Group } from 'prisma/prisma-client';
import { SERVICE_URL } from '../../model/constants';

export const GroupService = {
  axios: instance,

  async create(dto: ICreateGroup): Promise<Group> {
    return (await this.axios.post(`${SERVICE_URL.GROUP}`, dto)).data;
  },

  async findMany(): Promise<Group[]> {
    return (await this.axios.get(`${SERVICE_URL.GROUP}`)).data;
  },

  async findOne(id?: string): Promise<IGroupInfo> {
    return (await this.axios.get(`${SERVICE_URL.GROUP}/${id}`)).data;
  },
};
