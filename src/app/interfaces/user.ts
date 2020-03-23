import { IBadge } from './badge';

export interface IUser {
  display_name: string;
  link: string;
  profile_image: string;
  reputation: number;
  reputation_change_day?: number;
  reputation_change_week?: number;
  reputation_change_month?: number;
  reputation_change_quarter?: number;
  reputation_change_year?: number;
  user_id: number;
  user_type: 'unregistered' | 'registered' | 'moderator';
  location?: string;
  website_url?: string;
  accept_rate?: number;
  badge_counts?: IBadge;
  is_employee?: boolean;
  creation_date?: number;
  last_modified_date?: number;
  last_access_date?: number;
}
