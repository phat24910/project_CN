import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent {
  setLang(lang: string) {
    // Gọi hàm setLang của AppComponent thông qua window hoặc sự kiện toàn cục
    // Đơn giản nhất: phát sự kiện hoặc reload, hoặc dùng shared service
    // Ở đây sẽ gọi window để demo
    const w = window as any;
    if (w && typeof w.setLang === 'function') {
      w.setLang(lang);
    } else {
      // fallback: reload để AppComponent bắt lại lang
      localStorage.setItem('lang', lang);
      window.location.reload();
    }
  }
}


