/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from 'axios';
import { setupApiClient } from '@/services/api';

import { IMenu } from './menuRepository.types';

export class MenuRepository {
  private api: AxiosInstance;

  constructor(ctx?: any) {
    this.api = setupApiClient(ctx);
  }

  list = async (): Promise<IMenu[]> => {
    const { data: menu } = await this.api.get(`menu`);

    return menu;
  };

  listOne = async (uuid: string): Promise<IMenu> => {
    const { data: menu } = await this.api.get(`menu/${uuid}`);

    return menu;
  };

  create = async (values: any): Promise<IMenu> => {
    const { data: menu } = await this.api.post(`menu`, values, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return menu;
  };

  update = async (uuid: string, dataValues: IMenu): Promise<IMenu> => {
    const { data: menu } = await this.api.put(`menu/${uuid}`, dataValues);

    return menu;
  };

  delete = async (uuid: string): Promise<unknown> => {
    const { data } = await this.api.delete(`menu/${uuid}`);

    return data;
  };
}
