/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from 'axios';
import { setupApiClient } from '@/services/api';

import { IGallery, IGalleryprops } from './galleryRepository.types';

export class GalleryRepository {
  private api: AxiosInstance;

  constructor(ctx?: any) {
    this.api = setupApiClient(ctx);
  }

  listAll = async (
    parbusca: string = '',
    page: string = '1',
    limit: string = '30',
    order: string = 'url',
    orderType: string = 'ASC',
  ): Promise<IGalleryprops> => {
    const { data } = await this.api.get(
      `mv-gallery?page=${page}&limit=${limit}&order=${order}&orderType=${orderType}&parbusca=${parbusca}`,
    );

    return data;
  };

  listOne = async (uuid: string): Promise<IGallery> => {
    const { data: gallery } = await this.api.get(`mv-gallery/${uuid}`);

    return gallery;
  };

  createImage = async ( values: any): Promise<IGallery> => {
    const { data: gallery } = await this.api.post(`mv-gallery/url`, values, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return gallery;
  };

  update = async (uuid: string, dataValues: IGallery): Promise<IGallery> => {
    const { data: gallery } = await this.api.put(`mv-gallery/${uuid}`, dataValues);

    return gallery;
  };

  deleteCarousel = async (uuid: string): Promise<unknown> => {
    const { data } = await this.api.delete(`mv-gallery/${uuid}`);

    return data;
  };

  deleteImage = async (uuid: string): Promise<unknown> => {
    const { data } = await this.api.delete(`mv-gallery/url/${uuid}`);
    return data;
  };
}
