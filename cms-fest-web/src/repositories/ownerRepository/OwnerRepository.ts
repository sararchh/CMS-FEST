/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from "axios";
import { setupApiClient } from "@/services/api";

import { IDataOwner } from "./OwnerRepository.types";

export class OwnerRepository {
  private api: AxiosInstance;

  constructor(ctx?: any) {
    this.api = setupApiClient(ctx);
  }

  list = async (): Promise<IDataOwner> => {
    const { data: dataOwner } = await this.api.get(`data-owner`);

    return dataOwner;
  };

  updateLogo = async (id: string, values: any): Promise<any> => {
    const { data: dataOwner } = await this.api.post(
      `data-owner/logo/${id}`,
      values,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return dataOwner;
  };
  create = async (dataValues: IDataOwner): Promise<IDataOwner> => {
    const { data: dataOwner } = await this.api.post(`data-owner`, dataValues);

    return dataOwner;
  };

  update = async (id: string, dataValues: IDataOwner): Promise<IDataOwner> => {
    const { data: dataOwner } = await this.api.put(
      `data-owner/${id}`,
      dataValues
    );

    return dataOwner;
  };

  delete = async (id: string): Promise<unknown> => {
    const { data } = await this.api.delete(`data-owner/${id}`);

    return data;
  };
}
