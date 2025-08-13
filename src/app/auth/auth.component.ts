import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/Notify.service';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(private router: Router,
    private userService: UserService,
    private notify: NotificationService,
    private transloco: TranslocoService
  ) {}

  isLogin = true;

  alertMessage: string = '';
  alertType: 'success' | 'info' | 'warning' | 'error' = 'success';
  showAlert: boolean = false;

  showLogin() {
    this.isLogin = true;
  }

  showRegister() {
    this.isLogin = false;
  }

  onLogin(form: NgForm) {
    if (!form.valid) {
      this.notify.show('warning', this.transloco.translate('auth.alerts.fill_all_login'));
      return;
    }

    const {email, password} = form.value;
    console.log(this.transloco.translate('Thông tin đăng nhập:'), {email, password});

    const savedUsername = localStorage.getItem(`username_${email}`);
    if(!savedUsername) {
      this.notify.show('error', this.transloco.translate('auth.alerts.email_not_registered'));
      return;
    }

    const parseUser = JSON.parse(savedUsername);
    if(parseUser.password !== password) {
      this.notify.show('error', this.transloco.translate('auth.alerts.password_incorrect'));
      return;
    }

    localStorage.setItem('username',parseUser.username);
    localStorage.setItem('email', parseUser.email);

    this.userService.setUserName(parseUser.username);
    this.notify.show ('success', this.transloco.translate('auth.alerts.login_success'));

    this.router.navigate(['/']);
    form.resetForm();
  }

  onRegister(form: NgForm) {
    if (!form.valid) {
      this.notify.show('warning', this.transloco.translate('auth.alerts.fill_all_register'));
      return;
    }

    const {username, email, password} = form.value;
    console.log(this.transloco.translate('Thông tin đăng ký'), { username, email, password});

    const existingUser = localStorage.getItem(`username_${email}`);
    if (existingUser) {
      this.notify.show('error', this.transloco.translate('auth.alerts.email_exists'));
      return;
    }

    localStorage.setItem(`username_${email}`, JSON.stringify({ username, email, password}));
    this.notify.show('success', this.transloco.translate('auth.alerts.register_success'));

    this.isLogin = true;
    form.resetForm();
  }
}
