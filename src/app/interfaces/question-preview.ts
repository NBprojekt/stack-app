export interface IQuestionPreview {
  anwser_count: number;
  creation_date: number;
  is_answered: boolean;
  last_activity_date: number;
  last_edit_date?: number;
  link: string;
  owner: any; // TODO: Add owner interface
  question_id: number;
  score: number;
  tags: Array<string>;
  title: string;
  view_count: number;
}
