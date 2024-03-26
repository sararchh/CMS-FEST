/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from 'axios';
import { setupApiClient } from '@/services/api';

import { ISchedule, IScheduleProps } from './scheduleRepository.types';

export class ScheduleRepository {
  private api: AxiosInstance;

  constructor(ctx?: any) {
    this.api = setupApiClient(ctx);
  }

  listAll = async (
    parbusca: string = '',
    page: string = '1',
    limit: string = '8',
    order: string = 'day',
    orderType: string = 'ASC',
  ): Promise<IScheduleProps> => {
    const { data } = await this.api.get(
      `schedule?page=${page}&limit=${limit}&order=${order}&orderType=${orderType}&parbusca=${parbusca}`,
    );

    return data;
  };

  listOne = async (uuid: string): Promise<ISchedule> => {
    const { data: schedule } = await this.api.get(`schedule/${uuid}`);

    return schedule;
  };

  create = async (dataValues: ISchedule): Promise<ISchedule> => {
    const { data: schedule } = await this.api.post(`schedule`, dataValues);

    return schedule;
  };

  update = async (uuid: string, dataValues: ISchedule): Promise<ISchedule> => {
    const { data: schedule } = await this.api.put(`schedule/${uuid}`, dataValues);

    return schedule;
  };

  delete = async (uuid: string): Promise<unknown> => {
    const { data } = await this.api.delete(`schedule/${uuid}`);

    return data;
  };
}
