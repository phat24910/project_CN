// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// export type AlertType = 'success' | 'info' | 'warning' | 'error';

// @Injectable({
//   providedIn: 'root'
// })
// export class NotificationService {
//   private alertSubject = new BehaviorSubject<{ type: AlertType, message: string } | null>(null);
//   alert$ = this.alertSubject.asObservable();

//   private timeoutHandle: any;

//   show(type: AlertType, message: string, duration: number = 3000) {
//     this.alertSubject.next({ type, message });

//     if (this.timeoutHandle) clearTimeout(this.timeoutHandle);

//     this.timeoutHandle = setTimeout(() => {
//       this.clear();
//     }, duration);
//   }

//   clear() {
//     this.alertSubject.next(null);
//   }
// }








import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AlertType = 'success' | 'info' | 'warning' | 'error';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private alertSubject = new BehaviorSubject<{ type: AlertType, message: string } | null>(null);
  alert$ = this.alertSubject.asObservable();

  constructor(private zone: NgZone) {}

  show(type: AlertType, message: string) {
    this.alertSubject.next({ type, message });
    setTimeout(() => this.clear(), 2000);
  }

  clear() {
    this.alertSubject.next(null);
  }
}

