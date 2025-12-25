import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TagResponse, Tag, CreateTagRequest } from '../models/habit.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private http = inject(HttpClient);
  private baseUrl = '/api/tags';

  private get headers() {
    return new HttpHeaders({
      'Accept': 'application/json;v=1'
    });
  }

  getTags(page = 1, pageSize = 10): Observable<TagResponse> {
    return this.http.get<TagResponse>(this.baseUrl, {
      headers: this.headers,
      params: {
        page: page,
        page_size: pageSize
      }
    });
  }

  getTagById(id: string): Observable<Tag> {
    return this.http.get<Tag>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }

  createTag(tag: CreateTagRequest): Observable<Tag> {
    return this.http.post<Tag>(this.baseUrl, tag, { headers: this.headers });
  }

  updateTag(id: string, tag: CreateTagRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, tag, { headers: this.headers });
  }

  deleteTag(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }
}
