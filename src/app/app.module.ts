import { PrimaryOrangeDirective } from './shared/primary-orange.directive';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProductsModule } from './products/products.module';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { ProfileComponent } from './profile/profile.component';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EnvironmentOutline, FacebookOutline, InstagramOutline, LinkedinOutline, MailOutline, PhoneOutline, UserOutline } from '@ant-design/icons-angular/icons';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ShoppingCartOutline } from '@ant-design/icons-angular/icons';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  providers: [NzNotificationService, { provide: NZ_I18N, useValue: vi_VN }],
  declarations: [AppComponent, AuthComponent, ProfileComponent, PrimaryOrangeDirective, FooterComponent],

  imports: [
    NzNotificationModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ProductsModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzDropDownModule,
    NzModalModule,
    NzMenuModule,
    NzIconModule.forRoot([UserOutline, ShoppingCartOutline, MailOutline, PhoneOutline, EnvironmentOutline, FacebookOutline, LinkedinOutline, InstagramOutline]),
    NzCardModule,
    NzDescriptionsModule,
    NzAvatarModule,
    NzAlertModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
