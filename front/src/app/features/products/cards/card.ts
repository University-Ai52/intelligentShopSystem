import { Component, Input, inject, output } from '@angular/core';

import { Router } from '@angular/router';

import { Iproduct } from '../../../models/iproduct';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class CardComponent {

  @Input() product!: Iproduct;

  router = inject(Router);

  productDelete = output<string>();

  viewProduct() {
    this.router.navigate(['/products', this.product.slug]);
  }

  deleteProduct() {
    this.productDelete.emit(this.product.slug);
  }

}