import { Component, inject, OnInit } from "@angular/core";
import { ProductService } from "../../../../services/product-service";
import { CardComponent } from "../../../../features/products/cards/card";
import { Iproduct } from "../../../../models/iproduct";

@Component({
  selector: 'app-products',
  templateUrl: './product.html',
  imports: [CardComponent],
  styleUrl: './product.css'
})
export class product implements OnInit {

  productService = inject(ProductService);

products: Iproduct[] = [
  {
    _id: '1',
    name: 'Nike Shoes',
    slug: 'nike-shoes',
    description: 'Comfortable sports shoes',
    price: 1500,
    compareAtPrice: 1800,
    sku: 'NIKE-001',
    stock: 10,
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSwSON-AtZ0lSUNKvL9qum8REp9Fd-eumJ-NXbmHl8oA&s=10'],
    category: 'sports',
    tags: ['shoes', 'sports'],
    isActive: true,
    isDeleted: false,
    isFeatured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

  async ngOnInit() {
    try {
      const result = await this.productService.getProducts();
      this.products = result.data;
    } catch (error) {
      console.log(error);
    }
  }

async deleteProduct(slug: string) {
  try {
    await this.productService.deleteProduct(slug);

    this.products = this.products.filter(
      product => product.slug !== slug
    );

    console.log('Product deleted successfully');

  } catch (error) {
    console.log(error);
  }
}
}