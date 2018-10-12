import { IPost } from 'app/shared/model//post.model';
import { IUser } from './user.model';

export interface ILike {
  id?: number;
  on?: IPost;
  owner?: IUser;
}

export const defaultValue: Readonly<ILike> = {};
