export interface ISite {
  aliases?: Array<string>;
  api_site_parameter: string;
  audience?: string;
  closed_beta_date?: number;
  favicon_url?: string;
  high_resolution_icon_url: string;
  icon_url?: string;
  launch_date?: number;
  logo_url?: string;
  markdown_extensions?: Array<string>;
  name: string;
  open_beta_date?: number;
  related_sites?: Array<IRelatedSite>;
  site_state?: 'normal' | 'closed_beta' | 'open_beta' | 'linked_meta';
  sity_type?: 'main_site' | 'meta_site';
  site_url?: string;
  styling: ISiteStyling;
  twitter_account?: string;
  reputation?: number;
}

export interface IRelatedSite {
  api_site_parameter: string;
  name: string;
  site_url: string;
  relation?: string;
}

export interface ISiteStyling {
  link_color: string;
  tag_background_color: string;
  tag_foreground_color: string;
}
