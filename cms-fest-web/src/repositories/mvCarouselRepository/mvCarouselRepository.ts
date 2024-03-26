/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from 'axios';
import { setupApiClient } from '@/services/api';

import { IMVCarouselProps, IMvCarousels } from './mvCarouselRepository.types';

export class MvBannerRepository {
  private api: AxiosInstance;

  constructor(ctx?: any) {
    this.api = setupApiClient(ctx);
  }

  listAll = async (
    parbusca: string = '',
    page: string = '1',
    limit: string = '8',
    order: string = 'name',
    orderType: string = 'ASC',
  ): Promise<IMVCarouselProps> => {
    const { data } = await this.api.get(
      `mv-carousel?page=${page}&limit=${limit}&order=${order}&orderType=${orderType}&parbusca=${parbusca}`,
    );

    return data;
  };

  listOne = async (uuid: string): Promise<IMvCarousels> => {
    const { data: carousel } = await this.api.get(`mv-carousel/${uuid}`);

    return carousel;
  };

  create = async (id_position: string): Promise<IMvCarousels> => {
    const { data: carousel } = await this.api.post(`mv-carousel`, {id_position});

    return carousel;
  };

  createBanner = async (uuid: string, values: any): Promise<IMvCarousels> => {
    const { data: carousel } = await this.api.post(`mv-carousel/${uuid}`, values, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return carousel;
  };

  update = async (uuid: string, dataValues: IMvCarousels): Promise<IMvCarousels> => {
    const { data: carousel } = await this.api.put(`mv-carousel/${uuid}`, dataValues);

    return carousel;
  };

  deleteCarousel = async (uuid: string): Promise<unknown> => {
    const { data } = await this.api.delete(`mv-carousel/${uuid}`);

    return data;
  };

  deleteBanner = async (uuid: string, url: string): Promise<unknown> => {
    const { data } = await this.api.delete(`mv-carousel/url/${uuid}`, {
      data: { url: url },
    });
    return data;
  };
}
