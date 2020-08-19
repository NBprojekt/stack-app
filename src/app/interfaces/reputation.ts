export interface IReputation {
  reputation_history_type: string;
  reputation_change: number;
  creation_date: number;
  post_id?: number;
  user_id?: number;
  reputation_summ?: number;
}
