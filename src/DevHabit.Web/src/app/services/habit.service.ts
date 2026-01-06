import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HabitResponse, Habit, CreateHabitRequest, UpdateHabitRequest } from '../models/habit.model';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private http = inject(HttpClient);
  private baseUrl = '/api/habits';

  // Helper để tạo header chuẩn cho API Versioning
  private get headers() {
    return new HttpHeaders({
      'Accept': 'application/json'
    });
  }

  getHabits(page = 1, pageSize = 10): Observable<HabitResponse> {
    return this.http.get<HabitResponse>(this.baseUrl, {
      headers: this.headers,
      params: {
        page: page,
        page_size: pageSize
      }
    });
  }

  getHabitById(id: string): Observable<Habit> {
    return this.http.get<Habit>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }

  createHabit(habit: CreateHabitRequest): Observable<Habit> {
    return this.http.post<Habit>(this.baseUrl, habit, { headers: this.headers });
  }

  updateHabit(id: string, habit: UpdateHabitRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, habit, { headers: this.headers });
  }

  deleteHabit(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }
}