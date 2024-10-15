export interface Session {
  token: string;
  user: User;
  expiration: string;
}
export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  gender: number;
  isActive?: boolean;
  isDeleted?: boolean;
  createdDate?: string;
  modifiedDate?: string;
  password: string;
  phoneNumber?: string;
  username: string;
  userMatchOptions?: UserMatchOption[];
  userOptions?: UserOption[];
}
export interface MatchOption {
  id: number;
  name: string;
  createdDate: string;
  modifiedDate: string;
  isDeleted: boolean;
  isActive: boolean;
  options: Option[];
}
export interface Option {
  id: number;
  name: string;
  createdDate: string;
  modifiedDate: string;
  isDeleted: boolean;
  isActive: boolean;
  matchOptionId: number;
  matchOption?: MatchOption;
}

export interface UserOption {
  id: number;
  userId: number;
  optionId: number;
  option?: Option;
}

export interface UserMatchOption {
  id: number;
  userId: number;
  matchOptionId: number;
  matchOption?: MatchOption;
}

export interface Response<T> {
  isSuccess: boolean;
  message?: string;
  data?: T | any;
}

export class Response<T> implements Response<T> {
  isSuccess: boolean;
  message?: string;
  data?: T | any;

  constructor(isSuccess: boolean, message: string, data: T | any) {
    this.isSuccess = isSuccess;
    this.message = message;
    this.data = data;
  }
}
