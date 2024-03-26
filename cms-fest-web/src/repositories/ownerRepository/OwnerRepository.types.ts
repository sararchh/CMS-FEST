export interface IDataOwner {
  _id: string;
  uuid: string;
  slug: string;
  name: string;
  fullname: string;
  responsible: string;
  email: string;
  phone: string;
  whatsapp: string;
  address01: string;
  number: number;
  address02?: string;
  state: string;
  city: string;
  cep: string;
  logo?: string;
  favicon?: string;
  title: string;
  description?: string;
  youtube?: string,
  instagram?: string,
  facebook?: string
}
