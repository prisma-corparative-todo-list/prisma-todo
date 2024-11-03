import { Prisma, Step, Task } from 'prisma/prisma-client';
import { instance } from '../api.instance';
import { QUERY_KEYS, SERVICE_URL } from '../../model/constants';
import { ExtendedTask } from 'interfaces';
import { ICreateTaskDto } from "../../../shared";

export const TaskService = {
  axios: instance,

  async findMany({
    deadline,
    isImportant,
    isPlanned,
    id,
    isToday
  }: {
    deadline?: Date;
    isImportant?: boolean;
    isPlanned?: boolean;
    id?: string;
    isToday?: boolean
  } = {}): Promise<ExtendedTask[]> {
    
    return (
      await this.axios.get(`${SERVICE_URL.TASK}${id ? `/${id}` : ''}`, {
        params: {
          deadline,
          isImportant,
          isPlanned,
          isToday
        },
      })
    ).data;
  },

  async create(dto: ICreateTaskDto): Promise<Task> {
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

  async updateOne(data: Prisma.TaskUpdateInput, id?: string): Promise<Task> {

    return (await this.axios.patch(`/${SERVICE_URL.TASK}/${id}`, data))
      .data;
  },

  async deleteOne(id?: string): Promise<void> {
    await this.axios.delete(`/${SERVICE_URL.TASK}/${id}`);
  },

  async findUserListTasks(listId?: string): Promise<ExtendedTask[]> {
    return (
      await this.axios.get(`${SERVICE_URL.TASK}/${QUERY_KEYS.LIST}/${listId}`)
    ).data;
  },
};
