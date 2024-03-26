export interface IMvPositionCarousels {
  _id: string;
  uuid: string;
  position: string;
}

export interface IMvPositionProps {
  data: IMvPositionCarousels[];
  total: number;
  pages: number;
  current_page: number;
}
