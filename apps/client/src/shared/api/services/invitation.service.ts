import { Invitation, Participant } from 'prisma/prisma-client';
import { QUERY_KEYS, SERVICE_URL } from '../../model/constants';
import { instance } from '../api.instance';
import { ICreateInvitation, IResponseInvitation } from 'interfaces';

export const InvitationService = {
  axios: instance,

  async createOne(data: ICreateInvitation): Promise<Invitation> {
    return (await this.axios.post(`${SERVICE_URL.INVITATION}`, data)).data;
  },

  async findMany({
    limit,
    cursor,
  }: {
    limit: number;
    cursor: number | null;
  }): Promise<IResponseInvitation> {
    const params = new URLSearchParams();

    if (limit) {
      params.append('limit', limit.toString());
    }

    if (cursor != null) {
      params.append('cursor', cursor.toString());
    }

    return (
      await this.axios.get(
        `${SERVICE_URL.INVITATION}${params.toString() !== '' && '?' + params}`
      )
    ).data;
  },

  async accept({
    groupId,
    invitationId,
  }: {
    groupId: string;
    invitationId: string;
  }): Promise<Participant> {
    const params = new URLSearchParams();

    params.append('invitationId', invitationId);

    params.append('groupId', groupId);

    return await this.axios.post(
      `${SERVICE_URL.INVITATION}/${QUERY_KEYS.ACCEPT}/${params.toString() !== '' && '?' + params}`
    );
  },

  async reject(invitationId: string): Promise<void> {
    return await this.axios.delete(
      `${SERVICE_URL.INVITATION}/${QUERY_KEYS.REJECT}/${invitationId}`
    );
  },
};
