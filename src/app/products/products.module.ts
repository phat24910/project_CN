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
import { CartItemComponent } from '../components/cart-item/cart-item.component';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzEmptyModule} from 'ng-zorro-antd/empty';
import { NzFormModule} from 'ng-zorro-antd/form';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzInputNumberModule} from 'ng-zorro-antd/input-number';
import { NzImageModule } from 'ng-zorro-antd/image';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    SearchPipe,
    HighlightDirective,
    ProductFormComponent,
    CartComponent,
    ProductItemComponent,
    CartItemComponent,
  ],

  // providers: [CartService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    RouterModule,

    NzInputModule,
    NzSelectModule,
    NzGridModule,
    NzButtonModule,
    NzCardModule,
    NzRateModule,
    NzIconModule,
    NzEmptyModule,
    NzFormModule,
    NzDescriptionsModule,
    NzTagModule,
    NzTypographyModule,
    ReactiveFormsModule,
    NzInputNumberModule,
    NzImageModule
]
})
export class ProductsModule {}
