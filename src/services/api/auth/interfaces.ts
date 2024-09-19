import { IUser } from "@/interfaces/user";

export interface ISignInParams {
  email: string;
  password: string;
}

export interface ISignInResponse {
  data: {
    plain_text_token: string;
    user: IUser;
  }
}

export interface IGetMyDataResponse {
  data: IUser
}

export interface ISignUpParams {
  name: string;
  email: string;
  password: string;
}

export interface ISignUpResponse {
  data: {
    plain_text_token: string;
    user: IUser;
  }
}

export interface IUpdateParams {
  name: string;
  email: string;
  password?: string|null;
}

export interface IUpdateResponse {
  data: IUser
}