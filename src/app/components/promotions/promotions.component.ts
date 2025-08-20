import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/product.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslocoService } from '@jsverse/transloco';

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }>;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {
  flashSaleProducts: Product[] = [];
  currentPromotions: Product[] = [];
  couponCodes: any[] = [];
  isLoading = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private notification: NzNotificationService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.loadPromotions();
    this.loadFlashSaleProducts();
    this.loadCouponCodes();
  }

  loadPromotions(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe(products => {
      // dữ liệu khuyến mãi fake
      this.currentPromotions = products.slice(0, 3); // Assuming 3 promotions for now
      this.isLoading = false;
    });
  }

  loadFlashSaleProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.flashSaleProducts = products.slice(0, 8).map(product => {
        const discount = product.discountPercentage;
        const salePrice = product.price;
        const originalPrice = salePrice / (1 - discount / 100);

        return {
          ...product,
          originalPrice: parseFloat(originalPrice.toFixed(2)),
          salePrice: salePrice,
          discount: discount,
          timeLeft: Math.floor(Math.random() * 24) + 1
        };
      });
    });
  }


//   loadFlashSaleProducts(): void {
//   this.productService.getProducts().subscribe(products => {
//     this.flashSaleProducts = products.slice(0, 8).map(product => ({
//       ...product,
//       // Giá gốc thật dựa vào price và discountPercentage
//       originalPrice: parseFloat(
//         (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
//       ),
//       salePrice: product.price,
//       discount: product.discountPercentage,
//       // Thời gian flash sale vẫn lấy ngẫu nhiên
//       timeLeft: Math.floor(Math.random() * 24) + 1
//     }));
//   });
// }


  loadCouponCodes(): void {
    this.couponCodes = [
      {
        code: 'SUMMER30',
        discount: 30,
        description: 'promotions.coupons.summer30.description',
        validUntil: '2025-02-28',
        minPurchase: 50
      },
      {
        code: 'NEWYEAR50',
        discount: 50,
        description: 'promotions.coupons.newyear50.description',
        validUntil: '2025-01-31',
        minPurchase: 100
      },
      {
        code: 'WEEKEND20',
        discount: 20,
        description: 'promotions.coupons.weekend20.description',
        validUntil: '2025-01-15',
        minPurchase: 30
      }
    ];
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

  getStars(rate: number): number[] {
    return [1, 2, 3, 4, 5];
  }

  copyCouponCode(code: string): void {
    navigator.clipboard.writeText(code).then(() => {
      this.notification.success(
        this.transloco.translate('promotions.coupon.copied.title'),
        this.transloco.translate('promotions.coupon.copied.message')
      );
    });
  }

  getTimeLeft(endDate: string): string {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return 'Expired';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  }

}

