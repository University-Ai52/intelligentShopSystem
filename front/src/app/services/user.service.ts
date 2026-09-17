import { Injectable } from '@angular/core';
import { IUser } from '../models/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'http://localhost:3000/api/v1/auth';

  async me(): Promise<IUser> {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`${this.apiUrl}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || 'Failed to load user');
    }

    return data;
  }
}
