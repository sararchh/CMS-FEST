import { ISponsors } from '../sponsorRepository/sponsorRepository.types';

export interface ITypeSponsors {
  _id: string;
  uuid: string;
  name: string;
  order: number;

  items?: ISponsors[];
}
