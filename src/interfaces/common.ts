export interface ITimestamps {
  created_at: string;
  updated_at: string|null;
  deleted_at?: string|null;
}

export interface IPaginatedResponse<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string|null;
    next: string|null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}