import { IUser } from './user';
import { SafeHtml } from '@angular/platform-browser';

export interface IAnswer {
  is_accepted: boolean;
  score: number;
  creation_date: number;
  answer_id: number;
  question_id: number;
  owner?: IUser;
  last_activity_date?: number;
  body?: string | SafeHtml;
}
