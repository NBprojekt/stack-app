import { SafeHtml } from '@angular/platform-browser';
import { IUser } from './user';
import { IAnswer } from './answer';

export interface IQuestion {
  answer_count: number;
  creation_date: number;
  is_answered: boolean;
  last_activity_date: number;
  link: string;
  owner: IUser;
  question_id: number;
  score: number;
  tags: Array<string>;
  title: string;
  view_count: number;
  accepted_answer_id?: number;
  answers?: Array<IAnswer>;
  closed_date?: number;
  closed_reason?: string;
  last_edit_date?: number;
  bounty_amount?: number;
  bounty_closes_date?: number;
  body?: string | SafeHtml;
  locked_date?: number;
  last_editor?: IUser;
  favorite_count?: number;
}
