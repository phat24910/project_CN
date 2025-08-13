// import { Component, OnInit } from '@angular/core';
// import { CartService } from '../../services/cart.service';
// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit{
//   cartItems: any[] = [];
//   total = 0; // tong tien (truoc khi giam gia)

//   discountCode = ''; // ma giam gia nguoi dung nhap
//   discountPercent = 0; // phan tram giam gia tuong ung
//   totalAfterDiscount = 0; //tong tien sau khi ap dung giam gia

//   constructor (private cartService: CartService) {}

//   ngOnInit(): void {
//     this.loadCart();
//   }

//   loadCart(): void {
//     this.cartItems = this.cartService.getCart();

//     this.total = this.cartItems.reduce((sum,item) => {
//       const price = item.priceAfterDiscount || item.price;
//       return sum + price * item.quantity;
//     }, 0);
//     this.applyDiscount();
//   }

//   removeItem(id: number): void {
//     this.cartService.removeItem(id);
//     this.loadCart();
//   }

//   clearCart(): void {
//     this.cartService.clearCart();
//     this.loadCart();
//   }

//   applyDiscount(): void {
//     if (this.discountCode === 'giam10') {
//       this.discountPercent = 10;
//     } else if (this.discountCode === 'giam20') {
//       this.discountPercent = 20;
//     } else {
//       this.discountPercent = 0;
//     }
//     this.totalAfterDiscount = this.total - (this.total * this.discountPercent / 100);
//   }

//   checkout(): void {
//     alert(`Thanh toán thành công! Tổng tiền: ${this.totalAfterDiscount.toFixed(2)}$`);
//     this.clearCart();
//   }

//   increaseQuantity(item: any): void {
//     this.cartService.increaseQuantity(item);
//     this.loadCart();
//   }

//   decreaseQuantity(item: any): void {
//     this.cartService.decreaseQuantity(item);
//     this.loadCart();
//   }
// }



import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CartService } from '../../services/cart.service';
import { TranslocoService} from '@jsverse/transloco';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  discountCode: string = ''; // Mã giảm giá người dùng nhập
  total = 0; // Tổng tiền trước khi giảm giá
  discountPercent = 0; // Phần trăm giảm giá
  totalAfterDiscount = 0; // Tổng tiền sau giảm giá
  qrData: string = ''; // Dữ liệu QR code
  showQrCode: boolean = false;

  constructor(private cartService: CartService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    this.loadCart();
    this.qrData = this.translocoService.translate('cart.qrTitle') + `${this.totalAfterDiscount.toFixed(2)}$`;
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCart();
    let afterProductDiscountTotal = 0;

    this.cartItems.forEach(item => {
      const discount = item.discountPercentage || 0;
      const priceAfterProductDiscount = item.price * ( 1- discount / 100);
      item.priceAfterDiscount = priceAfterProductDiscount;

      afterProductDiscountTotal += priceAfterProductDiscount * item.quantity;
    });

    this.total = afterProductDiscountTotal;
    this.applyDiscount();
  }

  removeItem(id: number): void {
    this.modal.confirm({
      nzTitle: this.translocoService.translate('cart.modal.removeTitle'),
      nzOkText: this.translocoService.translate('cart.modal.removeOk'),
      nzOkDanger: true,
      nzCancelText: this.translocoService.translate('cart.modal.removeCancel'),
      nzOnOk: () => {
        this.cartService.removeItem(id);
        this.notification.info(this.translocoService.translate('cart.modal.removeSuccessTitle'),
        this.translocoService.translate('cart.modal.removeSuccessMsg'));
        this.loadCart();
      }
    });
  }

  clearCart(): void {
    this.modal.confirm({
      nzTitle: this.translocoService.translate('cart.modal.clearTitle'),
      nzOkText: this.translocoService.translate('cart.modal.removeOk'),
      nzOkDanger: true,
      nzCancelText: this.translocoService.translate('cart.modal.removeCancel'),
      nzOnOk: () => {
        this.cartService.clearCart();
        this.notification.info(this.translocoService.translate('cart.modal.removeSuccessTitle'),
        this.translocoService.translate('cart.modal.removeSuccessMsg'));
        this.loadCart();
      }
    });
  }

  confirmPayment(): void {
    alert(this.translocoService.translate('cart.paymentConfirm'));
    this.clearCart();       // Xoá giỏ hàng
    this.qrData = '';       // Xoá dữ liệu QR
    this.showQrCode = false; // Ẩn mã QR
  }


  applyDiscount(): void {
    const code = this.discountCode.trim().toLowerCase();

    switch (code) {
      case 'giam10':
        this.discountPercent = 10;
        break;
      case 'giam20':
        this.discountPercent = 20;
        break;
      default:
        this.discountPercent = 0;
        if (this.discountCode) {
          this.notification.error(this.translocoService.translate('cart.discountErrorTitle'),
          this.translocoService.translate('cart.discountErrorMsg'));
        }
        break;
    }

    this.totalAfterDiscount = this.total * (1 - this.discountPercent / 100);
  }

  increaseQuantity(item: any): void {
    this.cartService.increaseQuantity(item);
    this.loadCart();
  }

  decreaseQuantity(item: any): void {
    this.cartService.decreaseQuantity(item);
    this.loadCart();
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      alert(this.translocoService.translate('cart.alert.emptyCart'));
      return;
    }

    this.qrData =`${this.translocoService.translate('cart.total')}: ${this.totalAfterDiscount.toFixed(2)}$`;
    this.showQrCode = true;
    // this.clearCart();
  }
}
