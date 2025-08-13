import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './services/cart.service';
import { UserService } from './services/user.service';
import { SharedService } from './services/shared.service';
import { NotificationService } from './services/Notify.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Cosmetsy - Beauty & Cosmetics';
  total = 0;
  wishlistCount = 0;
  userName: string | null = null;
  alert: { type: 'error' | 'success' | 'info' | 'warning'; message: string } | null = null;
  changePasswordVisible = false;
  passwordData = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  searchText = '';
  showMobileMenu = false;
  currentLang = 'vi';
  showAlert = false;
  alertType = 'info';
  alertMessage = '';

  constructor(
    private cartService: CartService,
    private router: Router,
    private userService: UserService,
    private sharedService: SharedService,
    private notificationService: NotificationService,
    private nzNotification: NzNotificationService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    // Lấy số lượng sản phẩm trong giỏ hàng
    this.cartService.cartItemCount$.subscribe(count => {
      this.total = count;
    });

    // Lấy thông tin user
    this.userService.userName$.subscribe(name => {
      this.userName = name;
    });

    // Load user từ localStorage
    this.userService.loadUserFromLocalStorage();

    // Lấy ngôn ngữ hiện tại
    this.currentLang = this.translocoService.getActiveLang();
  }

  // Phương thức đơn giản để mua sắm
  goShopping(): void {
    alert('Chào mừng bạn đến với Cosmetsy!');
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  onSearchChange(): void {
    if (this.searchText.trim()) {
      this.router.navigate(['/products'], { queryParams: { search: this.searchText } });
    }
  }

  setLang(lang: string): void {
    console.log('Setting language to:', lang);
    this.currentLang = lang;
    this.translocoService.setActiveLang(lang);
    // Close mobile menu if open
    if (this.showMobileMenu) {
      this.showMobileMenu = false;
    }
  }

  showInfo(): void {
    console.log('Show info clicked');
    this.nzNotification.info('Thông tin', 'Thông tin người dùng');
  }

  changePassword(): void {
    console.log('Change password clicked');
    this.changePasswordVisible = true;
  }

  logout(): void {
    console.log('Logout clicked');
    this.userService.logout();
    this.router.navigate(['/auth']);
  }

  handleCancel(): void {
    this.changePasswordVisible = false;
    this.resetPasswordForm();
  }

  handleChangePassword(): void {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      this.showAlertMessage('error', 'Mật khẩu mới không khớp');
      return;
    }
    
    // Xử lý đổi mật khẩu
    this.showAlertMessage('success', 'Đổi mật khẩu thành công');
    this.handleCancel();
  }

  resetPasswordForm(): void {
    this.passwordData = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    this.showAlert = false;
  }

  showAlertMessage(type: 'error' | 'success' | 'info' | 'warning', message: string): void {
    this.alert = { type, message };
    setTimeout(() => {
      this.alert = null;
    }, 3000);
  }
}






