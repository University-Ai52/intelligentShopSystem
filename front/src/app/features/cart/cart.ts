import { Component, inject, OnInit } from '@angular/core';
import { Icart } from '../../models/icart';
import { IUser } from '../../models/iuser';
import { CartServices } from '../../services/cart-services';
import { UserService } from '../../services/user.service';

@Component({
  imports: [],
  selector: 'app-cart',
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart implements OnInit {
  private readonly cartServices = inject(CartServices);
  private readonly userService = inject(UserService);

  cart: Icart | null = null;
  user: IUser | null = null;
  shipping = 5;
  discountPercent = 10;

  async ngOnInit(): Promise<void> {
    try {
      this.user = await this.userService.me();
      await this.loadCart();
    } catch (error) {
      console.error('Cart init failed:', error);
      this.user = null;
      this.cart = null;
    }
  }

  async loadCart(): Promise<void> {
    const response = await this.cartServices.getCart();
    this.cart = response.data;
  }

  get itemCount(): number {
    return this.cart?.items?.length ?? 0;
  }

  get subtotal(): number {
    return (this.cart?.items ?? []).reduce((sum, item) => {
      return sum + (item.quantity * item.priceAtAdd);
    }, 0);
  }

  get discount(): number {
    return this.subtotal * (this.discountPercent / 100);
  }

  get taxes(): number {
    return (this.subtotal - this.discount + this.shipping) * 0.14;
  }

  get total(): number {
    return this.subtotal - this.discount + this.shipping + this.taxes;
  }

  get fullName(): string {
    if (!this.user) return '';
    return `${this.user.firstName || ''} ${this.user.lastName || ''}`.trim();
  }
}
