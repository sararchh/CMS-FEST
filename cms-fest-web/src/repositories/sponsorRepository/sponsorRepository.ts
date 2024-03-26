/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from 'axios';
import { setupApiClient } from '@/services/api';

import { ISponsors } from './sponsorRepository.types';

export class SponsorsRepository {
  private api: AxiosInstance;

  constructor(ctx?: any) {
    this.api = setupApiClient(ctx);
  }

  listAll = async (): Promise<ISponsors[]> => {
    const { data } = await this.api.get(`sponsors`);

    return data;
  };

  listOne = async (id: string): Promise<ISponsors> => {
    const { data: sponsors } = await this.api.get(`sponsors/${id}`);

    return sponsors;
  };

  updateThumb = async (uuid: string, values: any): Promise<any> => {
    const { data: sponsors } = await this.api.post(`sponsors/thumb/${uuid}`, values, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return sponsors;
  };
  create = async (dataValues: Partial<ISponsors>): Promise<ISponsors> => {
    const { data: sponsors } = await this.api.post(`sponsors`, dataValues);

    return sponsors;
  };

  update = async (uuid: string, dataValues: Partial<ISponsors>): Promise<ISponsors> => {
    const { data: sponsors } = await this.api.put(`sponsors/${uuid}`, dataValues);

    return sponsors;
  };

  delete = async (uuid: string): Promise<unknown> => {
    const { data } = await this.api.delete(`sponsors/${uuid}`);

    return data;
  };
}
