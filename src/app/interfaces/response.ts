import { IQuestion } from './question';

export interface IResponse {
  has_more: number;
  items: Array<IQuestion | any>;
  quota_max: number;
  quota_remaining: number;
  total?: number;
}

export interface IResponseError {
  error_id: number;
  error_message: string;
  error_name: string;
}
