import { IUser } from './user.model';
import { IPost } from 'app/shared/model//post.model';

export interface IComment {
  id?: number;
  text?: string;
  owner?: IUser;
  on?: IPost;
}

export const defaultValue: Readonly<IComment> = {};
