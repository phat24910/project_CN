import { Injectable } from '@angular/core';
import { BehaviorSubject, count } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);

  cartItemCount$ = this.cartItemCount.asObservable();

  constructor() {
    const savedCart = JSON.parse(localStorage.getItem('my-cart') || '[]');
    this.cartItems = savedCart;
    this.updateCartCount();
  }

  getCart() {
    return this.cartItems;
  }

  addToCart(product: any) {
    const index = this.cartItems.findIndex(item => item.id === product.id);
    // if (index !== -1) {
    if (index ===1) {
      this.cartItems[index].quantity += 1;
    } else {
      const discountRate = this.getDiscountRate(product);
      const priceAfterDiscount = product.price * (1 - discountRate / 100);

      this.cartItems.push({
        ...product,
        quantity: 1,
        discountRate,
        priceAfterDiscount
      });
    }
    this.saveCart();
  }

  removeItem(id: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.saveCart();
  }

  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }

  private saveCart() {
    localStorage.setItem('my-cart', JSON.stringify(this.cartItems));
    this.updateCartCount();
  }

  private updateCartCount () {
    const count =this.cartItems.reduce((total,item) => total + item.quantity, 0);
    this.cartItemCount.next(count);
  }

  getDiscountRate(product: any): number {
    switch (product.category) {
      case 'electronics': return 10;
      case 'jewelery': return 5;
      default: return 0;
    }
  }

  increaseQuantity(item: any): void {
    const found = this.cartItems.find(i => i.id === item.id);
    if (found) {
      found.quantity++;
      this.updateCartCount();
      this.saveCart();
    }
  }

  decreaseQuantity(item: any): void {
    const found = this.cartItems.find(i => i.id === item.id);
    if (found && found.quantity > 1) {
      found.quantity--;
      this.updateCartCount();
      this.saveCart();
    }
  }

}



