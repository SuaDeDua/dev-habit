import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
  confirmationPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/auth/login', data).pipe(
      tap(response => {
        localStorage.setItem(this.accessTokenKey, response.accessToken);
        localStorage.setItem(this.refreshTokenKey, response.refreshToken);
      })
    );
  }

  register(data: RegisterRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/auth/register', data).pipe(
      tap(response => {
        localStorage.setItem(this.accessTokenKey, response.accessToken);
        localStorage.setItem(this.refreshTokenKey, response.refreshToken);
      })
    );
  }

  logout(): void {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);

    if (refreshToken) {
      this.http.post('/api/auth/logout', { refreshToken }).subscribe({
        next: () => console.log('Successfully logged out from server'),
        error: (err) => console.error('Error logging out from server', err)
      });
    }

    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  refreshToken(): Observable<LoginResponse> {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    
    return this.http.post<LoginResponse>('/api/auth/refresh', { refreshToken }).pipe(
      tap(response => {
        localStorage.setItem(this.accessTokenKey, response.accessToken);
        // Nếu backend có trả về refresh token mới (Rotation), lưu lại luôn
        if (response.refreshToken) {
          localStorage.setItem(this.refreshTokenKey, response.refreshToken);
        }
      })
    );
  }
}
