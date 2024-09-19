import { ITimestamps } from "./common";

export interface IUser extends ITimestamps {
  id: number;
  name: string;
  email: string;
}