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
import { ProfileComponent } from './profile/profile.component';
import { ThemeColorsComponent } from './shared/theme-colors/theme-colors.component';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { 
  EnvironmentOutline, 
  FacebookOutline, 
  InstagramOutline, 
  LinkedinOutline, 
  MailOutline, 
  PhoneOutline, 
  UserOutline,
  SearchOutline,
  HeartOutline,
  MenuOutline,
  CloseOutline,
  DownOutline,
  LockOutline,
  LogoutOutline,
  HomeOutline,
  ShoppingOutline,
  InfoCircleOutline,
  GiftOutline,
  GlobalOutline,
  DollarOutline
} from '@ant-design/icons-angular/icons';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ShoppingCartOutline } from '@ant-design/icons-angular/icons';
import { FooterComponent } from './footer/footer.component';
import { CdkDragPlaceholder } from "@angular/cdk/drag-drop";
import { TranslocoRootModule } from './transloco-root.modules';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
@NgModule({
  providers: [NzNotificationService, { provide: NZ_I18N, useValue: vi_VN }],
  declarations: [AppComponent, AuthComponent, ProfileComponent, PrimaryOrangeDirective, FooterComponent, ThemeColorsComponent],

  imports: [
    NzNotificationModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ProductsModule,
    FormsModule,
    TranslocoRootModule,

    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzDropDownModule,
    NzSelectModule,
    NzModalModule,
    NzMenuModule,
    NzIconModule.forRoot([
      UserOutline, 
      ShoppingCartOutline, 
      MailOutline, 
      PhoneOutline, 
      EnvironmentOutline, 
      FacebookOutline, 
      LinkedinOutline, 
      InstagramOutline,
      SearchOutline,
      HeartOutline,
      MenuOutline,
      CloseOutline,
      DownOutline,
      LockOutline,
      LogoutOutline,
      HomeOutline,
      ShoppingOutline,
      InfoCircleOutline,
      GiftOutline,
      GlobalOutline,
      DollarOutline
    ]),
    NzCardModule,
    NzDescriptionsModule,
    NzAvatarModule,
    NzAlertModule,
    CdkDragPlaceholder,
    NzBadgeModule,
    NzOverlayModule,
    NzNoAnimationModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
