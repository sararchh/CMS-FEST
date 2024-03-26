export interface ICadUser {
  _id: string;
  uuid: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  password_hash: string;
  status: number;
  isAdmin: boolean;
}

export interface ISessionStore {
  userId: string;
}
