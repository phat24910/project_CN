import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from './Notify.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userNameSubject = new BehaviorSubject<string | null>(null);

  userName$ = this.userNameSubject.asObservable();

  constructor(private notificationService: NotificationService) {}

  setUserName(name: string) {
    this.userNameSubject.next(name);
    localStorage.setItem('username', name);
  }

  getUserName(): string | null {
    return this.userNameSubject.getValue();
  }

  loadUserFromLocalStorage() {
    const name = localStorage.getItem('username');
    if (name) {
      this.userNameSubject.next(name);
    }
  }

  logout() {
    this.userNameSubject.next(null);
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    this.notificationService.show('success', 'Đăng xuất thành công!');
  }
}
