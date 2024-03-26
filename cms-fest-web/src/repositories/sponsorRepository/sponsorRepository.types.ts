export interface ISponsors {
  _id?: string;
  uuid: string;
  name: string;
  id_type?: string;
  thumb: string;
  url_site: string;
  status: number;
}

export interface ISponsorsProps {
  data: ISponsors[];
  total: number;
  pages: number;
  current_page: number;
}