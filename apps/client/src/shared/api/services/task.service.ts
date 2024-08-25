import { Prisma, Step, Task } from 'prisma/prisma-client';
import { instance } from '../api.instance';
import { QUERY_KEYS, SERVICE_URL } from '../../model/constants';
import { ICreateTask, ITask, WorkFlow } from 'interfaces';
import { AxiosResponse } from 'axios';

export const TaskService = {
  axios: instance,

  async findMany({
    deadline,
    isImportant,
    isPlanned,
    id,
  }: {
    deadline?: Date;
    isImportant?: boolean;
    isPlanned?: boolean;
    id?: string;
  } = {}): Promise<Task[]> {
    
    return (
      await this.axios.get(`${SERVICE_URL.TASK}${id ? `/${id}` : ''}`, {
        params: {
          deadline,
          isImportant,
          isPlanned,
        },
      })
    ).data;
  },

  async create(dto: ICreateTask): Promise<Task> {
    return (await this.axios.post(`${SERVICE_URL.TASK}`, dto)).data;
  },

  async toggleImportantStatus(id?: string): Promise<Task> {
    return (
      await this.axios.patch(
        `/${SERVICE_URL.TASK}/${QUERY_KEYS.IMPORTANT}/${id}`
      )
    ).data;
  },

  async findOne(id?: string): Promise<Task> {
    return (await this.axios.get(`${SERVICE_URL.TASK}/${id}`)).data;
  },

  async toggleCompleteTask(id?: string): Promise<Task> {
    return (
      await this.axios.patch(
        `/${SERVICE_URL.TASK}/${QUERY_KEYS.COMPLETED}/${id}`
      )
    ).data;
  },

  async updateOne(data: Prisma.TaskUpdateInput): Promise<Task> {

    console.log(data)

    return (await this.axios.patch(`/${SERVICE_URL.TASK}/${data.id}`, data))
      .data;
  },

  async deleteOne(id?: string): Promise<void> {
    await this.axios.delete(`/${SERVICE_URL.TASK}/${id}`);
  },

  async findUserListTasks(listId?: string): Promise<Task[]> {
    return (
      await this.axios.get(`${SERVICE_URL.TASK}/${QUERY_KEYS.LIST}/${listId}`)
    ).data;
  },
};
