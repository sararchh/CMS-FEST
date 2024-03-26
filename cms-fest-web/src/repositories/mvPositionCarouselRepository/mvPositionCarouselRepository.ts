/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from 'axios';
import { setupApiClient } from '@/services/api';

import { IMvPositionCarousels, IMvPositionProps } from './mvPositionCarouselRepository.types';

export class MvPositionCarouselRepository {
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
  ): Promise<IMvPositionProps> => {
    const { data } = await this.api.get(
      `position-carousel?page=${page}&limit=${limit}&order=${order}&orderType=${orderType}&parbusca=${parbusca}`,
    );

    return data;
  };

  listOne = async (uuid: string): Promise<IMvPositionCarousels> => {
    const { data: positionCarousel } = await this.api.get(`position-carousel/${uuid}`);

    return positionCarousel;
  };

  create = async (position: Partial<IMvPositionCarousels['position']>): Promise<IMvPositionCarousels> => {
    const { data: positionCarousel } = await this.api.post(`position-carousel`, { position });

    return positionCarousel;
  };

  update = async (uuid: string, dataValues: IMvPositionCarousels): Promise<IMvPositionCarousels> => {
    const { data: positionCarousel } = await this.api.put(`position-carousel/${uuid}`, dataValues);

    return positionCarousel;
  };

  delete = async (uuid: string): Promise<unknown> => {
    const { data } = await this.api.delete(`position-carousel/${uuid}`);

    return data;
  };
}
