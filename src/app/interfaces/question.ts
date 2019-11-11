import { SafeHtml } from '@angular/platform-browser';

export interface IQuestion {
  anwser_count: number;
  creation_date: number;
  is_answered: boolean;
  last_activity_date: number;
  link: string;
  owner: any; // TODO: Add owner interface
  question_id: number;
  score: number;
  tags: Array<string>;
  title: string;
  view_count: number;
  closed_date?: number;
  closed_reason?: string;
  last_edit_date?: number;
  bounty_amount?: number;
  bounty_closes_date?: number;
  body?: string | SafeHtml;
}
