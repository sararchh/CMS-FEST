export interface IMvContato {
  _id?: string;
  uuid?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: Date;
}

export interface IContactProps {
  data: IMvContato[];
  total: number;
  pages: number;
  current_page: number;
}