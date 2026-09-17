import { Component, effect, input, output, signal } from '@angular/core';

import { Iproduct } from '../../../models/iproduct';

import { form, FormField, min, minLength, required, submit } from '@angular/forms/signals';

interface ProductFormModel {
  name: string;
  slug: string;
  price: number;
  compareAtPrice: number;
  sku: string;
  stock: number;
  images: string;
  category: string;
  tags: string;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  isFeatured: boolean;
}

@Component({
  imports: [FormField],
  selector: 'app-product-form',
  styleUrl: './product-form.css',
  templateUrl: './product-form.html',
})
export class ProductForm {

  productModel = signal<ProductFormModel>({
    name: '',
    slug: '',
    price: 0,
    compareAtPrice: 0,
    sku: '',
    stock: 0,
    images: '',
    category: '',
    tags: '',
    description: '',
    isActive: true,
    isDeleted: false,
    isFeatured: false
  });

  product = input<Omit<Iproduct, '_id' | 'createdAt' | 'updatedAt'>>();

  productSubmit = output<Omit<Iproduct, '_id' | 'createdAt' | 'updatedAt'>>();

  productForm = form(this.productModel, schema => {

    required(schema.name, { message: 'Name is Required' });

    required(schema.price, { message: 'Price is Required' });

    required(schema.category, { message: 'Category is Required' });

    required(schema.description, { message: 'Description is Required' });

    required(schema.sku, { message: 'SKU is Required' });

    minLength(schema.name, 3, {
      message: 'Name must be 3 char or more'
    });

    minLength(schema.description, 3, {
      message: 'Description must be 3 char or more'
    });

    min(schema.price, 1, {
      message: 'Price must be positive value'
    });

    min(schema.stock, 0, {
      message: 'Stock cannot be negative'
    });

  });

  constructor() {

    effect(() => {

      const product = this.product();

      if (product) {

        this.productModel.set({
          ...product,
          compareAtPrice: product.compareAtPrice ?? 0,
          images: product.images.join(', '),
          tags: product.tags.join(', ')
        });

      }});}
  showError(field: any) {

    return field.errors().length &&
      (field.touched() || field.dirty());

  }

  async onSubmit(e: Event) {

    e.preventDefault();

    submit(this.productForm, async data => {

      const formData = data().value();

      const product = {
        ...formData,
        compareAtPrice: formData.compareAtPrice || undefined,
        images: formData.images
          .split(',')
          .map((image: string) => image.trim())
          .filter(Boolean),
        tags: formData.tags
          .split(',')
          .map((tag: string) => tag.trim())
          .filter(Boolean)
      };

      console.log(product);

      this.productSubmit.emit(product);

    });

  }

}