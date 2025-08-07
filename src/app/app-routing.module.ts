import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AuthComponent } from './auth/auth.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { CartComponent } from './products/cart/cart.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then(m => m.ProductsModule)
  },

  { path:'', component: ProductListComponent},
  { path:'product-form', component:ProductFormComponent},
  { path:'auth', component: AuthComponent},
  { path: 'cart', component: CartComponent},
  { path: 'profile', component: ProfileComponent},
  { path: ':id', component: ProductDetailComponent},
  // { path: '', redirectTo: 'products', pathMatch: 'full' },
  // { path: 'profile', component: ProfileComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
