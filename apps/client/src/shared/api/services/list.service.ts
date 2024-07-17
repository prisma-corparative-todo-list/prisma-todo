import { List } from 'prisma/prisma-client';
import { QUERY_KEYS, SERVICE_URL } from '../../model/constants';
import { instance } from '../api.instance';
import { ICreateList, IUpdateList } from 'interfaces';

export const ListService = {
  axios: instance,

  async findMany(): Promise<List[]> {
    return (await this.axios.get(`${SERVICE_URL.LIST}`)).data;
  },

  async create(data: ICreateList): Promise<List> {
    return (await this.axios.post(`${SERVICE_URL.LIST}`, data)).data;
  },

  async findOne(id?: string): Promise<List> {
    return (await this.axios.get(`${SERVICE_URL.LIST}/${id}`)).data;
  },

  async deleteOne(id?: string): Promise<void> {
    await this.axios.delete(`${SERVICE_URL.LIST}/${id}`);
  },

  async updateOne(title: string, id?: string): Promise<List> {
    return (await this.axios.put(`${SERVICE_URL.LIST}/${id}`, { title }))
      .data;
  },
};
