export interface User {
    _id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: string;
    createdAt: Date;
    status: String;
    image:String;
    stores:String[];
    sexe:String;
    
  }