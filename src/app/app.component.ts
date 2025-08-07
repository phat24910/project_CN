// import { Component, OnInit } from '@angular/core';
// import { CartService } from './services/cart.service';
// import { Router } from '@angular/router';
// import { UserService } from './services/user.service';
// import { SharedService } from './services/shared.service';
// import { NotificationService } from './services/Notify.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
// })
// export class AppComponent implements OnInit {
//   title = 'product-management';

//   searchText: string = '';

//   total = 0;

//   userName: string | null=null;

//   alert: { type: any, message: string} | null=null;

//   constructor (
//     private cartService: CartService,
//     private router: Router,
//     private userService: UserService,
//     private sharedService: SharedService,
//     private notify: NotificationService
//   ) {}

//   onSearchChange() {
//     this.sharedService.setSearchText(this.searchText);
//   }

//   ngOnInit(): void {
//     this.cartService.cartItemCount$.subscribe(count => {
//       this.total = count;
//     });

//     this.userService.userName$.subscribe(name => {
//       this.userName = name;
//     });

//     this.userService.loadUserFromLocalStorage();

//     this.notify.alert$.subscribe(alert => {
//       this.alert = alert;
//     });

//     // this.userName = localStorage.getItem('username');
//     // console.log(this.userName)
//   }

//   showInfo(): void {
//     this.router.navigate (['/profile']);
//   }

//   changePasswordVisible = false;

//   passwordData = {
//     oldPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   }

//   alertMessage: string = '';
//   alertType: 'success' | 'info' | 'warning' | 'error' = 'info';
//   showAlert: boolean = false;


//   changePassword(): void {
//     this.changePasswordVisible = true;
//   }

//   logout(): void {
//     localStorage.clear();
//     this.userService.logout();
//     this.router.navigate(['/auth']);
//   }

//   handleCancel(): void {
//     this.changePasswordVisible = false;
//     this.resetPasswordForm();
//   }

//   handleChangePassword(): void {
//     const { oldPassword, newPassword, confirmPassword } = this.passwordData;
//     if (!oldPassword || !newPassword || !confirmPassword) {
//       this.showAlertMessage('Vui lòng nhập đầy đủ thông tin', 'warning');
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//             this.showAlertMessage('Mật khẩu mới không khớp', 'error');

//       return;
//     }

//     const email = localStorage.getItem('email');
//     if (!email) {
//       this.showAlertMessage('Không tìm thấy người dùng hiện tại', 'error');
//       return;
//     }

//     const storedUserStr = localStorage.getItem(`username_${email}`);
//     if (!storedUserStr) {
//       this.showAlertMessage('Tài khoản không tồn tại', 'error');
//       return;
//     }

//     const storedUser = JSON.parse(storedUserStr);
//     if (storedUser.password !== oldPassword) {
//       this.showAlertMessage('Mật khẩu cũ không đúng', 'error');
//       return;
//     }

//     storedUser.password = newPassword;
//     localStorage.setItem(`username_${email}`, JSON.stringify(storedUser));
//     this.showAlertMessage('Đổi mật khẩu thành công', 'success');
//     setTimeout(() => {
//        this.changePasswordVisible = false;
//        this.resetPasswordForm();
//     }, 2000)
//   }

//   resetPasswordForm(): void {
//     this.passwordData = {
//       oldPassword: '',
//       newPassword: '',
//       confirmPassword: ''
//     }
//   }

//   showAlertMessage(message: string, type: 'success' | 'info' | 'warning' | 'error') {
//     this.alertMessage = message;
//     this.alertType = type;
//     this.showAlert = true;

//     setTimeout(() => {
//       this.showAlert = false;
//     }, 2000);
//   }
// }




import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { SharedService } from './services/shared.service';
import { NotificationService } from './services/Notify.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'product-management';
  searchText: string = '';
  total = 0;
  userName: string | null = null;
  alert: { type: any; message: string } | null = null;

  changePasswordVisible = false;
  passwordData = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  alertMessage: string = '';
  alertType: 'success' | 'info' | 'warning' | 'error' = 'info';
  showAlert: boolean = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private userService: UserService,
    private sharedService: SharedService,
    private notify: NotificationService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItemCount$.subscribe(count => {
      this.total = count;
    });

    this.userService.userName$.subscribe(name => {
      this.userName = name;
    });

    this.userService.loadUserFromLocalStorage();

    this.notify.alert$.subscribe(alert => {
      this.alert = alert;
    });
  }

  goHome(): void {
    this.sharedService.setSearchText('');
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
  }

  onSearchChange(event?: any): void {
    const value = event !== undefined ? event : this.searchText;
    this.sharedService.setSearchText(value.trim());
  }

  showInfo(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    localStorage.clear();
    this.userService.logout();
    this.router.navigate(['/auth']);
    this.notification.info('Đăng xuất', 'Bạn đã đăng xuất thành công!');
  }

  changePassword(): void {
    this.changePasswordVisible = true;
  }

  handleCancel(): void {
    this.changePasswordVisible = false;
    this.resetPasswordForm();
  }

  handleChangePassword(): void {
    const { oldPassword, newPassword, confirmPassword } = this.passwordData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      this.showAlertMessage('Vui lòng nhập đầy đủ thông tin', 'warning');
      return;
    }

    if (newPassword !== confirmPassword) {
      this.showAlertMessage('Mật khẩu mới không khớp', 'error');
      return;
    }

    const email = localStorage.getItem('email');
    if (!email) {
      this.showAlertMessage('Không tìm thấy người dùng hiện tại', 'error');
      return;
    }

    const storedUserStr = localStorage.getItem(`username_${email}`);
    if (!storedUserStr) {
      this.showAlertMessage('Tài khoản không tồn tại', 'error');
      return;
    }

    const storedUser = JSON.parse(storedUserStr);
    if (storedUser.password !== oldPassword) {
      this.showAlertMessage('Mật khẩu cũ không đúng', 'error');
      return;
    }

    storedUser.password = newPassword;
    localStorage.setItem(`username_${email}`, JSON.stringify(storedUser));
    this.showAlertMessage('Đổi mật khẩu thành công', 'success');

    setTimeout(() => {
      this.changePasswordVisible = false;
      this.resetPasswordForm();
    }, 2000);
  }

  resetPasswordForm(): void {
    this.passwordData = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  }

  showAlertMessage(message: string, type: 'success' | 'info' | 'warning' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 2000);
  }
}
