export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface UserData {
  page: number;
  totalItems: number;
  totalPages: number;
  users: User[];
}
