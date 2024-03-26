export interface ISchedule {
  _id?: string;
  uuid?: string;
  day: string;
  order: number;
  items: { _id: string; time: string; title: string; status: number; locale: string; description: string }[];
  status?: number;
}

export interface IScheduleProps {
  data: ISchedule[];
  total: number;
  pages: number;
  current_page: number;
}
