export interface IMvCarousels {
  _id?: string;
  uuid?: string;
  slug?: string;
  id_position: IPosition;
  url: string[];
  status?: number;
}

export interface IMVCarouselProps {
  data: IMvCarousels[];
  total: number;
  pages: number;
  current_page: number;
}

export interface IPosition {
  _id: string;
  uuid: string;
  position: string;
  createdAt: Date;
  updatedAt: Date;
  __v: 0;
}
