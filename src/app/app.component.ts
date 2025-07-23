import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'product-management';

  total = 0;
  constructor ( private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItemCount$.subscribe(count => {
      this.total = count;
    });

  }
}







