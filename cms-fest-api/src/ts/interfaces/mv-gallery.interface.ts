export interface IMvGallery {
  _id?: string;
  uuid?: string;
  url: string;
  status?: number;
}

export interface IGalleryprops {
  data: IMvGallery[];
  total: number;
  pages: number;
  current_page: number;
}
