export interface Habit {
  id: string;
  name: string;
  description?: string;
  type: number; // 1: Binary, 2: Measurable
  frequency: {
    type: number;
    timesPerPeriod: number;
  };
  target: {
    value: number;
    unit: string;
  };
  createdAtUtc: string;
  updatedAtUtc?: string;
  lastCompletedAtUtc?: string;
  tags: Tag[]; // Thêm mảng Tag vào đây
}

export interface CreateHabitRequest {
  name: string;
  description?: string;
  type: number;
  frequency: {
    type: number;
    timesPerPeriod: number;
  };
  target: {
    value: number;
    unit: string;
  };
  tagIds?: string[]; // Cho phép gửi kèm danh sách ID Tag
}

export interface UpdateHabitRequest extends CreateHabitRequest {}

export interface HabitResponse {
  data: Habit[];
  page: number;
  pageSize: number;
  totalCount: number;
}

// --- TAGS ---

export interface Tag {
  id: string;
  name: string;
  description?: string;
}

export interface CreateTagRequest {
  name: string;
  description?: string;
}

export interface TagResponse {
  data: Tag[];
  page: number;
  pageSize: number;
  totalCount: number;
}