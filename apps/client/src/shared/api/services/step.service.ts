import { Prisma, Step } from 'prisma/prisma-client';
import { instance } from '../api.instance';
import { QUERY_KEYS, SERVICE_URL } from '../../model/constants';
import { ICreateStep } from 'interfaces';

export const StepService = {
  axios: instance,

  async findMany(taskId?: string): Promise<Step[]> {
    return (await this.axios.get(`${SERVICE_URL.STEP}/${taskId}`)).data;
  },

  async create(data: ICreateStep): Promise<Step> {
    return (await this.axios.post(`${SERVICE_URL.STEP}`, data)).data;
  },

  async toggleComplete(stepId: string): Promise<Step> {
    return (
      await this.axios.patch(
        `${SERVICE_URL.STEP}/${QUERY_KEYS.COMPLETED}/${stepId}`
      )
    ).data;
  },

  async deleteOne(stepId: string): Promise<void> {
    await this.axios.delete(`${SERVICE_URL.STEP}/${stepId}`);
  },

  async updateOne(data: Prisma.StepUpdateInput): Promise<Step> {
    return (await this.axios.patch(`${SERVICE_URL.STEP}/${data.id}`, data))
      .data;
  },
};

