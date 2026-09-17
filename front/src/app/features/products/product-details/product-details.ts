import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product-service';
import { Iproduct } from '../../../models/iproduct';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {

  productService = inject(ProductService);
  route = inject(ActivatedRoute);

  product!: Iproduct;

  async ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (!slug) {
      return;
    }

    try {
      const result = await this.productService.getProduct(slug);

      if (!result.data) {
        console.log('Product not found');
        return;
      }

      this.product = result.data;
    } catch (error: unknown) {
      console.log(error instanceof Error ? error.message : error);
    }
  }
}