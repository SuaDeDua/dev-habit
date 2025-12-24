export interface Habit {
  id: string;
  name: string;
  description?: string;
  type: number;
}

export interface HabitResponse {
  data: Habit[];
  page: number;
  pageSize: number;
  totalCount: number;
}
