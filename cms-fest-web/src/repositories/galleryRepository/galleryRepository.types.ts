export interface IGallery {
  _id?: string;
  uuid?: string;
  url: string;
  status?: number;
}

export interface IGalleryprops {
  data: IGallery[];
  total: number;
  pages: number;
  current_page: number;
}