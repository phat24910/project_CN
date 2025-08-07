// import { Component, Input, Output, EventEmitter } from '@angular/core';

// @Component({
//   selector: 'app-cart-item',
//   templateUrl: './cart-item.component.html',
//   styleUrls: ['./cart-item.component.css']
// })
// export class CartItemComponent {
//   @Input() item: any;
//   @Output() increase = new EventEmitter<any>();
//   @Output() decrease = new EventEmitter<any>();
//   @Output() remove = new EventEmitter<number>();

//   onIncrease() {
//     this.increase.emit(this.item);
//   }

//   onDecrease() {
//     this.decrease.emit(this.item);
//   }

//   onRemove() {
//     this.remove.emit(this.item.id);
//   }

// }




import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  quantity: number;
  sku?: string;
  availabilityStatus?: string;
}

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() item!: CartItem;
  @Output() increase = new EventEmitter<CartItem>();
  @Output() decrease = new EventEmitter<CartItem>();
  @Output() remove = new EventEmitter<number>();

  onIncrease() {
    this.increase.emit(this.item);
  }

  onDecrease() {
    this.decrease.emit(this.item);
  }

  onRemove() {
    this.remove.emit(this.item.id);
  }
}
