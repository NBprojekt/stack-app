import { IUser } from './user';
import { SafeHtml } from '@angular/platform-browser';

export interface IAnswer {
  owner: IUser;
  is_accepted: boolean;
  score: number;
  last_activity_date: number;
  creation_date: number;
  answer_id: number;
  question_id: number;
  body?: string | SafeHtml;
}
