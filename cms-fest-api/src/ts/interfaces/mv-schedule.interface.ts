export interface IMvSchedule {
  _id: string;
  uuid: string;
  day: string;
  order: number;
  items: {
    time: string;
    title: string;
    status: number;
    locale: string;
    description: string;
  }[];
  status: number;
}
