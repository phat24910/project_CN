import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

export interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
  images: string[];
  discountPercentage?: number;
  stock?: number;
}

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  constructor(private router: Router) {}

  onAddToCart() {
    this.addToCart.emit(this.product);
  }

  viewDetails(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

  getStars(rate: number): number[] {
    return [1, 2, 3, 4, 5];
  }
}
