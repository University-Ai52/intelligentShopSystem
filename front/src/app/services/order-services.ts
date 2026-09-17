import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { IOrder } from '../models/iorder';

@Service()
export class OrderServices {
    private _http = inject(HttpClient);
    apiLink = 'http://localhost:3000/api/v1/orders';
    
    orders = httpResource<{ data: IOrder[]; total: number }>(() => `${this.apiLink}`);
}
