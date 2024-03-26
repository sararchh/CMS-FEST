 /* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from 'axios';
import { setupApiClient } from '@/services/api';

import { INews, INewsProps } from './newsRepository.types';

export class NewsRepository {
  private api: AxiosInstance;

  constructor(ctx?: any) {
    this.api = setupApiClient(ctx);
  }

  listAll = async (
    parbusca: string = '',
    page: string = '1',
    limit: string = '0',
    order: string = 'date',
    orderType: string = 'DESC',
  ): Promise<INewsProps> => {
    const { data } = await this.api.get(
      `news?page=${page}&limit=${limit}&order=${order}&orderType=${orderType}&parbusca=${parbusca}`,
    );

    return data;
  };

  listOne = async (slug: string): Promise<INews> => {
    const { data: news } = await this.api.get(`news/${slug}`);

    return news;
  };

  updateThumb = async (uuid: string, values: any): Promise<any> => {
    const { data: news } = await this.api.post(`news/thumb/${uuid}`, values, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return news;
  };
  create = async (dataValues: Partial<INews>): Promise<INews> => {
    const { data: news } = await this.api.post(`news`, dataValues);

    return news;
  };

  update = async (uuid: string, dataValues: Partial<INews>): Promise<INews> => {
    const { data: news } = await this.api.put(`news/${uuid}`, dataValues);

    return news;
  };

  delete = async (uuid: string): Promise<unknown> => {
    const { data } = await this.api.delete(`news/${uuid}`);

    return data;
  };
}
