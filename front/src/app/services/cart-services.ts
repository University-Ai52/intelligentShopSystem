import { Injectable } from '@angular/core';
import { CartResponse } from '../models/cart-response';

@Injectable({
  providedIn: 'root'
})
export class CartServices {
  private readonly apiUrl = 'http://localhost:3000/api/v1/cart';

  private getHeaders(): Record<string, string> {
    const token = localStorage.getItem('accessToken');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
  }

  async getCart(): Promise<CartResponse> {
    const response = await fetch(this.apiUrl, {
      method: 'GET',
      headers: this.getHeaders()
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || 'Failed to fetch cart');
    }

    return data;
  }

  async addItem(productId: string, quantity: number): Promise<CartResponse> {
    const response = await fetch(`${this.apiUrl}/items`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ productId, quantity })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || 'Failed to add item');
    }

    return data;
  }

  async updateItem(productId: string, quantity: number): Promise<CartResponse> {
    const response = await fetch(`${this.apiUrl}/items/${productId}`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify({ quantity })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || 'Failed to update cart item');
    }

    return data;
  }

  async removeItem(productId: string): Promise<{ success: boolean; data?: string; message?: string }> {
    const response = await fetch(`${this.apiUrl}/items/${productId}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || 'Failed to remove item');
    }

    return data;
  }

  async clearCart(): Promise<{ success: boolean; message: string }> {
    const response = await fetch(this.apiUrl, {
      method: 'DELETE',
      headers: this.getHeaders()
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || 'Failed to clear cart');
    }

    return data;
  }
}

