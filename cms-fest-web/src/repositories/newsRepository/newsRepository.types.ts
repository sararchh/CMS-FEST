export interface INews {
  _id?: string;
  uuid?: string;
  slug?: string;
  title: string;
  description: string;
  date: string;
  thumb?: string;
  status: number;
}

export interface INewsProps {
  data: INews[];
  total: number;
  pages: number;
  current_page: number;
}