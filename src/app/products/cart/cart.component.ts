import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cartItems: any[] = [];
  total = 0; // tong tien (truoc khi giam gia)

  discountCode = ''; // ma giam gia nguoi dung nhap
  discountPercent = 0; // phan tram giam gia tuong ung
  totalAfterDiscount = 0; //tong tien sau khi ap dung giam gia

  constructor (private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCart();
    this.total = this.cartItems.reduce((sum,item) => {
      const price = item.priceAfterDiscount || item.price;
      return sum + price * item.quantity;
    }, 0);
    this.applyDiscount();
  }

  removeItem(id: number): void {
    this.cartService.removeItem(id);
    this.loadCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.loadCart();
  }

  applyDiscount(): void {
    if (this.discountCode === 'giam10') {
      this.discountPercent = 10;
    } else if (this.discountCode === 'giam20') {
      this.discountPercent = 20;
    } else {
      this.discountPercent = 0;
    }
    this.totalAfterDiscount = this.total - (this.total * this.discountPercent / 100);
  }

  checkout(): void {
    alert(`Thanh toán thành công! Tổng tiền: ${this.totalAfterDiscount.toFixed(2)}$`);
    this.clearCart();
  }

  increaseQuantity(item: any): void {
    this.cartService.increaseQuantity(item);
    this.loadCart();
  }

  decreaseQuantity(item: any): void {
    this.cartService.decreaseQuantity(item);
    this.loadCart();
  }
}





