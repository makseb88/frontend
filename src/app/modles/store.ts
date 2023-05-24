import { User } from './user';



export interface Store {
    owner: User;
    name: string;
    description: string;
    address: string;
    longitude: number;
    latitude: number;
    phoneNumber: string;
    status: string;
    //categories: Category[];
   // subcategories: Subcategory[];
   // products: Product[];
  }