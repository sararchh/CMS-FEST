/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from "axios";
import { setupApiClient } from "@/services/api";

import { ListUserProps, UserProps } from "./UserRepository.types";

export class UserRepository {
  private api: AxiosInstance;

  constructor(ctx?: any) {
    this.api = setupApiClient(ctx);
  }

  listAll = async (
    parbusca: string = "",
    page: string = "1",
    limit: string = "8",
    order: string = "name",
    orderType: string = "ASC",
    isAdmin: string = "0"
  ): Promise<ListUserProps> => {
    const { data } = await this.api.get(
      `users?page=${page}&limit=${limit}&order=${order}&orderType=${orderType}&parbusca=${parbusca}&isAdmin=${isAdmin}`
    );

    return data;
  };

  listOne = async (id: string): Promise<UserProps> => {
    const { data: user } = await this.api.get(`users/${id}`);

    return user;
  };
  create = async (dataValues: UserProps): Promise<UserProps> => {
    const { data: user } = await this.api.post(`sign-up`, dataValues);

    return user;
  };

  update = async (id: string, dataValues: UserProps): Promise<UserProps> => {
    const { data: user } = await this.api.put(`users/${id}`, dataValues);

    return user;
  };

  delete = async (id: string): Promise<unknown> => {
    const { data } = await this.api.delete(`users/${id}`);

    return data;
  };
}
