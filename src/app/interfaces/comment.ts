import { SafeHtml } from '@angular/platform-browser';
import { IUser } from './user';

export interface IComment {
  post_id: number;
  owner: IUser;
  body: string | SafeHtml;
  comment_id: number;
  creation_date: number;
  score: number;
  edited: boolean;
}
