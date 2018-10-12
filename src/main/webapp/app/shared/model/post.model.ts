import { IUser } from './user.model';

export interface IPost {
  id?: number;
  text?: string;
  resource?: string;
  user?: IUser;
}

export const defaultValue: Readonly<IPost> = {};
