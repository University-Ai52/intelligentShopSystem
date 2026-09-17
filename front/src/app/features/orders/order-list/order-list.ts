import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { OrderServices } from '../../../services/order-services';

@Component({
  imports: [DatePipe  ],
  selector: 'app-order-list',
  styleUrl: './order-list.css',
  templateUrl: './order-list.html',
})
export class OrderList implements OnInit {
  ngOnInit(): void {
    console.log(this.orderServices.orders)
  }
  orderServices  = inject(OrderServices)
}
