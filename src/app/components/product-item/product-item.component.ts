// import { Component, EventEmitter, Input, Output } from '@angular/core';

// @Component({
//   selector: 'app-product-item',
//   templateUrl: './product-item.component.html',
//   styleUrls: ['./product-item.component.css']
// })
// export class ProductItemComponent {
//   @Input() product: any;
//   @Output() addToCart = new EventEmitter<any>();

//   onAddToCart() {
//     this.addToCart.emit(this.product);
//   }

//   getStars(rate: number): number[] {
//     return [1, 2, 3, 4, 5];
//   }
// }




import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  onAddToCart() {
    this.addToCart.emit(this.product);
  }

 getStars(rate: number): number[] {
    return [1, 2, 3, 4, 5];
  }
}
