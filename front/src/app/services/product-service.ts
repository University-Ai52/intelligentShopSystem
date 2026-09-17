import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {Iproduct,ProductResponse,ProductDetailsResponse} from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/api/v1/products';

  constructor(private http: HttpClient) {}

  async getProducts(): Promise<ProductResponse<Iproduct>> {
    return await firstValueFrom(
      this.http.get<ProductResponse<Iproduct>>(this.apiUrl)
    );
  }

  async getProduct(slug: string): Promise<ProductDetailsResponse> {
    return await firstValueFrom(
      this.http.get<ProductDetailsResponse>(
        `${this.apiUrl}/${slug}`
      )
    );
  }

  async addProduct(product: Iproduct): Promise<Iproduct> {
    return await firstValueFrom(
      this.http.post<Iproduct>(
        `${this.apiUrl}/admin`,
        product
      )
    );
  }

  async updateProduct(
    slug: string,
    product: Iproduct
  ): Promise<Iproduct> {
    return await firstValueFrom(
      this.http.put<Iproduct>(
        `${this.apiUrl}/admin/${slug}`,
        product
      )
    );
  }

  async deleteProduct(slug: string): Promise<any> {
    return await firstValueFrom(
      this.http.delete<any>(
        `${this.apiUrl}/admin/${slug}`
      )
    );
  }
}