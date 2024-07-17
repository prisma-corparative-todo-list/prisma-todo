import { User } from 'prisma/prisma-client';
import { ISinginForm, ISingupFormData } from '../../model/types/auth.types';
import { instance } from '../api.instance';
import { QUERY_KEYS, SERVICE_URL } from '../../model/constants';
import { ITokensAndUserId } from 'interfaces';

export const AuthService = {
  async signup(data: ISingupFormData): Promise<User> {
    return await instance.post(
      `${SERVICE_URL.AUTH}/${QUERY_KEYS.SIGNUP}`,
      data
    );
  },
  async signin(data: ISinginForm): Promise<User> {
    return await instance.post(
      `${SERVICE_URL.AUTH}/${QUERY_KEYS.SIGNIN}`,
      data
    );
  },
  async refresh(): Promise<ITokensAndUserId> {
    return (await instance.get(`${SERVICE_URL.AUTH}/${QUERY_KEYS.REFRESH}`))
      .data;
  },
};
