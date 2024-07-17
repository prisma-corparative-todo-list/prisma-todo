import { IMessageAndUser } from 'interfaces';
import { instance } from '../api.instance';
import { SERVICE_URL } from '../../model/constants';

export const MessageService = {
  axios: instance,

  async findMany({
    groupId,
    limit = 10,
    page = 1,
  }: {
    groupId?: string;
    limit?: number;
    page?: number;
  }): Promise<IMessageAndUser[]> {
    const params = new URLSearchParams();

    if (limit) {
      params.append('limit', limit.toString());
    }

    if (page) {
      params.append('page', page.toString());
    }

    return (
      await this.axios.get(
        `${SERVICE_URL.MESSAGE}/${groupId}${
          params.toString() !== '' && '?' + params
        }`
      )
    ).data;
  },
};
