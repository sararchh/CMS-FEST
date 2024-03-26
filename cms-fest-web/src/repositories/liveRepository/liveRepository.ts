/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from 'axios';
import { setupApiClient } from '@/services/api';

import { ILive } from './liveRepository.types';

export class LiveRepository {
  private api: AxiosInstance;

  constructor(ctx?: any) {
    this.api = setupApiClient(ctx);
  }

  listAll = async (): Promise<ILive[]> => {
    const { data } = await this.api.get(`in-live`);

    return data;
  };

  listOne = async (uuid: string): Promise<ILive> => {
    const { data: live } = await this.api.get(`in-live/${uuid}`);

    return live;
  };

  create = async (data: ILive): Promise<ILive> => {
    const { data: live } = await this.api.post(`in-live`,  data );

    return live;
  };

  update = async (uuid: string, dataValues: ILive): Promise<ILive> => {
    const { data: live } = await this.api.put(`in-live/${uuid}`, dataValues);

    return live;
  };

  delete = async (uuid: string): Promise<unknown> => {
    const { data } = await this.api.delete(`in-live/${uuid}`);

    return data;
  };
}
