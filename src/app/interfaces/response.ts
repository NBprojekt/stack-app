import { IQuestion } from './question';

export interface IResponse {
  has_more: number;
  items: Array<IQuestion | any>;
  quota_max: number;
  quota_remaining: number;
}