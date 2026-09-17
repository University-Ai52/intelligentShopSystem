import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface LoginRequest { email: string; password: string; }
export interface RegisterRequest { firstName: string; lastName: string; email: string; password: string; }
export interface AuthResponse {
  user?: { email?: string; firstName?: string; lastName?: string; role?: string; _id?: string };
  accessToken?: string;
  refreshToken?: string;
  token?: string;
  [key: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/v1/auth';

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => this.storeTokens(response))
    );
  }

  register(user: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, user);
  }

  isAuthenticated(): boolean { return Boolean(localStorage.getItem('accessToken')); }
  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  private storeTokens(response: AuthResponse): void {
    if (response.accessToken) localStorage.setItem('accessToken', response.accessToken);
    if (response.refreshToken) localStorage.setItem('refreshToken', response.refreshToken);
    if (response.user) localStorage.setItem('user', JSON.stringify(response.user));
    if (!response.accessToken && response.token) localStorage.setItem('accessToken', response.token);
  }
}