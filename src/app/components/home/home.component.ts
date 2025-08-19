// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../../core/product.service';
// import { CartService } from '../../services/cart.service';
// import { Router } from '@angular/router';
// import { NzNotificationService } from 'ng-zorro-antd/notification';
// import { TranslocoService } from '@jsverse/transloco';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
//   featuredProducts: any[] = [];
//   bestSellerProducts: any[] = [];
//   saleProducts: any[] = [];
//   newArrivals: any[] = [];

//   isLoading = true;

//   constructor(
//     private productService: ProductService,
//     private cartService: CartService,
//     private router: Router,
//     private notification: NzNotificationService,
//     private transloco: TranslocoService
//   ) {}

//   ngOnInit(): void {
//     this.loadHomeProducts();
//   }

//   loadHomeProducts(): void {
//     this.isLoading = true;

//     this.productService.getProducts().subscribe(products => {
//       this.featuredProducts = products.slice(0, 4);
//       this.bestSellerProducts = products.slice(4, 8);
//       this.saleProducts = products.slice(8, 12);
//       this.newArrivals = products.slice(12, 16);
//       this.isLoading = false;
//     });
//   }

//   addToCart(product: any): void {
//     this.cartService.addToCart(product);
//     this.notification.success(
//       this.transloco.translate('productList.notification.successTitle'),
//       this.transloco.translate('productList.notification.successMsg')
//     );
//   }

//   goToProductDetail(id: number): void {
//     this.router.navigate(['/products', id]);
//   }

//   goToAllProducts(): void {
//     this.router.navigate(['/products']);
//   }

//   getStars(rate: number): number[] {
//     return [1, 2, 3, 4, 5];
//   }

//   getDiscountPercentage(originalPrice: number, salePrice: number): number {
//     return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/product.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredProducts: any[] = [];
  bestSellerProducts: any[] = [];
  saleProducts: any[] = [];
  newArrivals: any[] = [];

  isLoading = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private notification: NzNotificationService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.loadHomeProducts();
  }

  loadHomeProducts(): void {
    this.isLoading = true;

    // this.productService.getProducts().subscribe(products => {
    //   const updatedProducts = products.map(product => {
    //     const originalPrice = product.price / (1 - product.discountPercentage / 100);
    //     return {
    //       ...product,
    //       originalPrice: parseFloat(originalPrice.toFixed(2))
    //     };
    //   });

    this.productService.getProducts().subscribe(products => {
      const updatedProducts = products.map(product => ({
        ...product,
        originalPrice: parseFloat(
          (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
        )
      }));

      this.featuredProducts = updatedProducts.slice(0, 4);
      this.bestSellerProducts = updatedProducts.slice(4, 8);
      this.saleProducts = updatedProducts.slice(8, 12);
      this.newArrivals = updatedProducts.slice(12, 16);

      this.isLoading = false;
    });
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    this.notification.success(
      this.transloco.translate('productList.notification.successTitle'),
      this.transloco.translate('productList.notification.successMsg')
    );
  }

  goToProductDetail(id: number): void {
    this.router.navigate(['/products', id]);
  }

  goToAllProducts(): void {
    this.router.navigate(['/products']);
  }

  getStars(rate: number): number[] {
    return [1, 2, 3, 4, 5];
  }
}


