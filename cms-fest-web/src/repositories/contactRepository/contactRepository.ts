/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from 'axios';
import { setupApiClient } from '@/services/api';

import { IContactProps, IMvContato } from './contactRepository.types';

export class ContactsRepository {
  private api: AxiosInstance;

  constructor(ctx?: any) {
    this.api = setupApiClient(ctx);
  }

  listAll = async (
    parbusca: string = '',
    page: string = '1',
    limit: string = '8',
    order: string = 'date',
    orderType: string = 'DESC',
  ): Promise<IContactProps> => {
    const { data } = await this.api.get(
      `contato?page=${page}&limit=${limit}&order=${order}&orderType=${orderType}&parbusca=${parbusca}`,
    );

    return data;
  };

  listOne = async (uuid: string): Promise<IMvContato> => {
    const { data: contato } = await this.api.get(`contato/${uuid}`);

    return contato;
  };

  create = async (data: IMvContato): Promise<IMvContato> => {
    const { data: contato } = await this.api.post(`contato`, data);

    return contato;
  };

  update = async (uuid: string, dataValues: IMvContato): Promise<IMvContato> => {
    const { data: contato } = await this.api.put(`contato/${uuid}`, dataValues);

    return contato;
  };

  delete = async (uuid: string): Promise<unknown> => {
    const { data } = await this.api.delete(`contato/${uuid}`);

    return data;
  };
}
