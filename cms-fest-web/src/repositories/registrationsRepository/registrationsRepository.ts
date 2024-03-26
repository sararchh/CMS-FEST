/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from 'axios';
import { setupApiClient } from '@/services/api';

import { IRegistration } from './registrationsRepository.types';

export class RegistrationsRepository {
  private api: AxiosInstance;

  constructor(ctx?: any) {
    this.api = setupApiClient(ctx);
  }

  listAll = async (): Promise<IRegistration[]> => {
    const { data } = await this.api.get(`registrations`);

    return data;
  };

  listOne = async (uuid: string): Promise<IRegistration> => {
    const { data: types } = await this.api.get(`registrations/${uuid}`);

    return types;
  };

  create = async (data: Partial<IRegistration>): Promise<IRegistration> => {
    const { data: types } = await this.api.post(`registrations`,  data );

    return types;
  };

  update = async (id: string, dataValues: Partial<IRegistration>): Promise<IRegistration> => {
    const { data: types } = await this.api.put(`registrations/${id}`, dataValues);

    return types;
  };

  delete = async (id: string): Promise<unknown> => {
    const { data } = await this.api.delete(`registrations/${id}`);

    return data;
  };
}
