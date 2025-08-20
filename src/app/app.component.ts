import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Router } from '@angular/router';
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
  title = 'product-management';
  searchText: string = '';
  total = 0;
  userName: string | null = null;
  userEmail: string | null = null;
  alert: { type: any; message: string } | null = null;
  currentLang: string = 'vi';
  showMobileMenu: boolean = false;
  showInfoModal: boolean = false;
  showSearch: boolean = false;

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
    public router: Router,
    private cartService: CartService,
    private sharedService: SharedService,
    private userService: UserService,
    private notify: NotificationService,
    private notification: NzNotificationService,
    private translocoService: TranslocoService
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

    const saved = localStorage.getItem('lang');
    if (saved) {
      this.currentLang = saved;
      this.translocoService.setActiveLang(saved);
    } else {
      this.currentLang = 'vi';
      this.translocoService.setActiveLang('vi');
    }

    // Load user email from localStorage
    const email = localStorage.getItem('email');
    if (email) {
      this.userEmail = email;
    }
  }

  goHome(): void {
    this.sharedService.setSearchText('');
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
  }

  setLang(lang: string) {
    this.currentLang = lang;
    this.translocoService.setActiveLang(lang);
    localStorage.setItem('lang', lang);
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  onSearchChange(event?: any): void {
    const value = event !== undefined ? event : this.searchText;
    if (value && value.trim()) {
      this.sharedService.setSearchText(value.trim());
      this.showSearch = false;
      this.router.navigate(['/products'], { queryParams: { search: value.trim() } });
      this.searchText = '';
    }
  }

  showInfo(): void {
    this.showInfoModal = true;
  }

  logout(): void {
    localStorage.clear();
    this.userService.logout();
    this.router.navigate(['/auth']);
    this.notification.info(
      this.translocoService.translate('app.logout'),
      this.translocoService.translate('notification.logoutSuccess')
    );
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
      this.showAlertMessage(this.translocoService.translate('notification.fillAll'), 'warning');
      return;
    }

    if (newPassword !== confirmPassword) {
      this.showAlertMessage(this.translocoService.translate('notification.passwordMismatch'), 'error');
      return;
    }

    const email = localStorage.getItem('email');
    if (!email) {
      this.showAlertMessage(this.translocoService.translate('notification.userNotFound'), 'error');
      return;
    }

    const storedUserStr = localStorage.getItem(`username_${email}`);
    if (!storedUserStr) {
      this.showAlertMessage(this.translocoService.translate('notification.accountNotFound'), 'error');
      return;
    }

    const storedUser = JSON.parse(storedUserStr);
    if (storedUser.password !== oldPassword) {
      this.showAlertMessage(this.translocoService.translate('notification.oldPasswordIncorrect'), 'error');
      return;
    }

    storedUser.password = newPassword;
    localStorage.setItem(`username_${email}`, JSON.stringify(storedUser));
    this.showAlertMessage(this.translocoService.translate('notification.changePasswordSuccess'), 'success');

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






