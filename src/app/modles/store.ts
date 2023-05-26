import { User } from './user';



export interface Store {
    owner: User;
    _id: string;
    name: string;
    description: string;
    address: string;
    longitude: number;
    latitude: number;
    phoneNumber: string;
    status: string;
    ownerName: string;

    //categories: Category[];
   // subcategories: Subcategory[];
   // products: Product[];
  }