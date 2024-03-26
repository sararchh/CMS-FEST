/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from 'axios';
import { setupApiClient } from '@/services/api';

import { ITypeSponsors } from './typeSponsorsRepository.types';

export class TypesSponsorsRepository {
  private api: AxiosInstance;

  constructor(ctx?: any) {
    this.api = setupApiClient(ctx);
  }

  listAll = async (): Promise<ITypeSponsors[]> => {
    const { data } = await this.api.get(`type-sponsors`);

    return data;
  };

  listOne = async (uuid: string): Promise<ITypeSponsors> => {
    const { data: types } = await this.api.get(`type-sponsors/${uuid}`);

    return types;
  };

  create = async (data: Partial<ITypeSponsors>): Promise<ITypeSponsors> => {
    const { data: types } = await this.api.post(`type-sponsors`,  data );

    return types;
  };

  update = async (uuid: string, dataValues: Partial<ITypeSponsors>): Promise<ITypeSponsors> => {
    const { data: types } = await this.api.put(`type-sponsors/${uuid}`, dataValues);

    return types;
  };

  delete = async (uuid: string): Promise<unknown> => {
    const { data } = await this.api.delete(`type-sponsors/${uuid}`);

    return data;
  };
}
