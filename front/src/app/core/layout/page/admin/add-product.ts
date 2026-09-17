import { Component } from "@angular/core";
import { Iproduct } from "../../../../models/iproduct";
import { ProductService } from "../../../../services/product-service";
import { ProductForm } from "../../../../features/products/product-form/product-from";

@Component({
  selector: 'app-add-product',
  imports: [ProductForm],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProduct {

  constructor(private productService: ProductService) {}

  async addProduct(
    product: Omit<Iproduct, '_id' | 'createdAt' | 'updatedAt'>
  ) {
    try {

      const result = await this.productService.addProduct(product as Iproduct);

      console.log('Product added successfully');
      console.log(result);

    } catch (error) {

      console.log(error);

    }
  }
}