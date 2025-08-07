import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/Notify.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(private router: Router,
    private userService: UserService,
    private notify: NotificationService
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
      this.notify.show('warning', 'Vui lòng điền đầy đủ thông tin để đăng nhập');
      return;
    }

    const {email, password} = form.value;
    console.log('Thông tin đăng nhập:', {email, password});

    const savedUsername = localStorage.getItem(`username_${email}`);
    if(!savedUsername) {
      this.notify.show('error', 'Email chưa được đăng ký');
      return;
    }

    const parseUser = JSON.parse(savedUsername);
    if(parseUser.password !== password) {
      this.notify.show('error', 'Mật khẩu không đúng');
      return;
    }

    localStorage.setItem('username',parseUser.username);
    localStorage.setItem('email', parseUser.email);

    this.userService.setUserName(parseUser.username);
    this.notify.show ('success', 'Đăng nhập thành công');

    this.router.navigate(['/']);
    form.resetForm();
  }

  onRegister(form: NgForm) {
    if (!form.valid) {
      this.notify.show('warning', 'Vui lòng điền đầy đủ thông tin để đăng ký');
      return;
    }

    const {username, email, password} = form.value;
    console.log('Thông tin đăng ký', { username, email, password});

    const existingUser = localStorage.getItem(`username_${email}`);
    if (existingUser) {
      this.notify.show('error', 'Email đã được đăng ký. Vui lòng sử dụng email khác');
      return;
    }

    localStorage.setItem(`username_${email}`, JSON.stringify({ username, email, password}));
    this.notify.show('success', 'Đăng ký thành công');

    this.isLogin = true;
    form.resetForm();
  }
}
