export type FormatType = 'reel' | 'carousel' | 'story';
export type UsageRights = 'none' | '30_days' | '90_days' | '1_year';
export type Exclusivity = 'none' | 'category_30d' | 'full_30d';

export interface Post {
  id: string;
  date: string;
  format: FormatType;
  title: string;
  reach: number;
  likes: number;
  comments: number;
  saves: number;
  post_hour: number;
  hook_type: string;
  hashtag_count: number;
  topic: string;
  length_seconds?: number;
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  followers: number;
  niche: string;
  avatar: string;
  posts: Post[];
  deals: Deal[];
}

export interface Benchmark {
  niche: string;
  cpm_inr: number;
  er_baseline: number; // e.g. 0.033 for 3.3%
}

export interface Deal {
  id: string;
  brand: string;
  product: string;
  deliverable: FormatType;
  quoted_inr: number;
  status: 'Pitched' | 'Negotiating' | 'Closed' | 'Paid';
  closed_value_inr?: number;
  is_sponsored: boolean;
}

export interface RateCardResult {
  deliverable: FormatType;
  rights: UsageRights;
  exclusivity: Exclusivity;
  niche: string;
  median_reach: number;
  post_count: number;
  cpm_used: number;
  er_factor: number;
  base_price: number;
  low_inr: number;
  likely_inr: number;
  high_inr: number;
  confidence: 'LOW' | 'MEDIUM' | 'HIGH';
  followers_reach_mismatch: boolean;
  reach_ratio_pct: number;
  explanation: {
    summary: string;
    explanation: string;
    next_steps: string[];
    flags: string[];
  };
}

export interface AutopsyResult {
  post_id: string;
  post_title: string;
  post_reach: number;
  median_reach: number;
  diff_pct: number;
  verdict: 'POSSIBLE CAUSE FOUND' | 'NO CLEAR CAUSE';
  cause_factor?: string;
  evidence?: string;
  ruled_out: string[];
  experiment: string;
  explanation: {
    summary: string;
    explanation: string;
    next_steps: string[];
    flags: string[];
  };
}

export interface OutreachResult {
  subject: string;
  body: string;
  flags: string[];
  facts_used: {
    median_reach: number;
    er_pct: number;
    niche: string;
    rate_range: string;
  };
}

export interface PlannerSlot {
  day: string;
  format: FormatType;
  topic: string;
  time: string;
  based_on: string;
}

export interface PlannerResult {
  plan: PlannerSlot[];
  confidence: 'LOW' | 'MEDIUM' | 'HIGH';
  explanation?: string;
}

export interface EvalResult {
  case_id: number;
  title: string;
  is_hard: boolean;
  passed: boolean;
  notes: string;
  details: any;
}
