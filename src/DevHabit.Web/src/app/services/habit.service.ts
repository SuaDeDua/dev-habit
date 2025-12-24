import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HabitResponse } from '../models/habit.model';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private http = inject(HttpClient);

  getHabits(): Observable<HabitResponse> {
    const headers = new HttpHeaders({
      'Accept': 'application/json;v=1'
    });

    return this.http.get<HabitResponse>('/api/habits', { headers });
  }
}
