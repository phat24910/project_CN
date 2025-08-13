// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ProductService } from '../../core/product.service';
// import { CartService } from '../../services/cart.service';

// @Component({
//   selector: 'app-product-detail',
//   templateUrl: './product-detail.component.html',
//   styleUrls: ['./product-detail.component.css']
// })
// export class ProductDetailComponent implements OnInit {
//   product: any;

//   constructor(
//     private route: ActivatedRoute,
//     private service: ProductService,
//     private cartService: CartService
//   ) {}

//   ngOnInit(): void {
//     const id = Number(this.route.snapshot.paramMap.get('id'));
//     this.service.getProduct(id).subscribe(p => (this.product = p));
//   }
// }



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/product.service';
import { CartService } from '../../services/cart.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private service: ProductService,
    private cartService: CartService,
    private notification: NzNotificationService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getProduct(id).subscribe(p => (this.product = p));
  }

  addToCart(): void {
    this.cartService.addToCart(this.product);
    this.notification.success(this.translocoService.translate('productDetail.notification.successTitle'),
    this.translocoService.translate('productDetail.notification.successMsg'));
  }

  buyNow(): void {
    this.addToCart();
  }
}
