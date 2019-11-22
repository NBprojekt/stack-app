import { IUser } from './user';
import { SafeHtml } from '@angular/platform-browser';
import { IComment } from './comment';

export interface IAnswer {
  is_accepted: boolean;
  score: number;
  creation_date: number;
  answer_id: number;
  question_id: number;
  owner?: IUser;
  comments?: Array<IComment>;
  last_activity_date?: number;
  body?: string | SafeHtml;
  last_editor?: IUser;
  last_edit_date?: number;
}
