import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AuthComponent } from './auth/auth.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { CartComponent } from './products/cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PromotionsComponent } from './components/promotions/promotions.component';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then(m => m.ProductsModule)
  },

  { path:'', component: HomeComponent},
  { path:'products', component: ProductListComponent},
  { path:'product-form', component:ProductFormComponent},
  { path:'auth', component: AuthComponent},
  { path: 'cart', component: CartComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'promo', component: PromotionsComponent},
  { path: ':id', component: ProductDetailComponent},
  // { path: '', redirectTo: 'products', pathMatch: 'full' },
  // { path: 'profile', component: ProfileComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  })
],
  exports: [RouterModule]
})
export class AppRoutingModule {}
