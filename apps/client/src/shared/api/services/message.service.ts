import { IResponseMessageAndUser } from 'interfaces';
import { instance } from '../api.instance';
import { SERVICE_URL } from '../../model/constants';


export const MessageService = {
  axios: instance,

  async findMany({
    groupId,
    limit = 10,
    pageParam
  }: {
    groupId?: string;
    limit?: number;
    pageParam: number | null;
  }): Promise<IResponseMessageAndUser> {

    const params = new URLSearchParams();

    if (limit) {
      params.append('limit', limit.toString());
    }

    if(pageParam != null){
      params.append("cursor", pageParam.toString());
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
