import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsRoutingModule } from './products-routing.module';
import { SearchPipe } from '../shared/search.pipe';
import { HighlightDirective } from '../shared/highlight.directive';
import { ProductFormComponent } from '../product-form/product-form.component';
import { CartComponent } from './cart/cart.component';
import { RouterModule } from '@angular/router';
import { ProductItemComponent } from "../components/product-item/product-item.component";

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    SearchPipe,
    HighlightDirective,
    ProductFormComponent,
    CartComponent
  ],
  // providers: [CartService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    RouterModule,
    ProductItemComponent
]
})
export class ProductsModule {}
