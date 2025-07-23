import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  onLogin(form: NgForm) {
    if (!form.valid) {
      alert('Vui lòng điền đầy đủ thông tin để đăng nhập');
      return;
    }
    console.log('Login', form.value);
    alert('Đăng nhập thành công');
  }

  onRegister(form: NgForm) {
    if (!form.valid) {
      alert('Vui lòng điền đầy đủ thông tin để đăng ký');
      return;
    }
    console.log('Register', form.value);
    alert('Đăng ký thành công');
  }
}
