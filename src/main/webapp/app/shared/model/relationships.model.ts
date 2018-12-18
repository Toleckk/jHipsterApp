import { IUser } from './user.model';

export interface IRelationships {
  id?: number;
  user?: IUser;
  subscriber?: IUser;
}

export const defaultValue: Readonly<IRelationships> = {};
