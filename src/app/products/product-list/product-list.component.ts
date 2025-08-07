// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../../core/product.service';
// import { CartService } from '../../services/cart.service';
// import { Router } from '@angular/router';
// import { SharedService } from '../../services/shared.service';

// @Component({
//   selector: 'app-product-list',
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.css']
// })
// export class ProductListComponent implements OnInit {
//   products: any[] = [];

//   searchText = '';

//   categories: string[] = [];
//   filteredProducts: any[] = [];
//   selectedCategory: string ='';

//   isLoading: boolean = true;
//   isLoadingCategories: boolean = true;

//   constructor(
//     private service: ProductService,
//     private cartService: CartService,
//     private router: Router,
//     private sharedService: SharedService
//   ) {}

//   ngOnInit(): void {
//     this.service.getProducts().subscribe((data: any[]) => {
//       this.products = data.products;
//       this.loadAllProducts();

//       this.service.getCategories().subscribe(data => {
//         this.categories =data;
//         this.isLoadingCategories = false;
//     });
//       this.products = data;
//       this.isLoading = false;
//       this.filteredProducts = data;
//     });



//     this.sharedService.searchText$.subscribe((text) => {
//       this.searchText = text.toLowerCase();
//       this.filteredProducts = this.products.filter(product =>
//         product.title.toLowerCase().includes(this.searchText)
//       );
//     });
//   }

//     loadAllProducts(): void {
//       this.service.getProducts().subscribe(data => { this.filteredProducts = data; });
//     }

//     loadProductsByCategory(category: string): void {
//   if (!category) {
//     this.loadAllProducts();
//   } else {
//     this.isLoading = true;
//     this.service.getProductsByCategory(category).subscribe(data => {
//       this.filteredProducts = data;
//       this.isLoading = false;
//     });
//   }
// }


//     onCategoryChange(event: string): void {

//       const selectedCategory = event;
//       this.loadProductsByCategory(selectedCategory);

//     }

//     goToDetail(id: number): void {
//       this.router.navigate(['/products', id]);
//     }

//     addToCart(product: any):void {
//       this.cartService.addToCart(product);
//       alert('Đã thêm vào giỏ hàng');
//     }

//     getStars (rate: number): number [] {
//       return[1,2,3,4,5];
//     }
// }




// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../../core/product.service';
// import { CartService } from '../../services/cart.service';
// import { Router } from '@angular/router';
// import { SharedService } from '../../services/shared.service';

// @Component({
//   selector: 'app-product-list',
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.css']
// })
// export class ProductListComponent implements OnInit {
//   products: any[] = [];
//   filteredProducts: any[] = [];

//   categories: string[] = [];
//   selectedCategory: string = '';
//   searchText: string = '';

//   isLoading: boolean = true;
//   isLoadingCategories: boolean = true;
//   isCategoryLoading: boolean = false;

//   constructor(
//     private service: ProductService,
//     private cartService: CartService,
//     private router: Router,
//     private sharedService: SharedService
//   ) {}

//   ngOnInit(): void {
//     this.loadAllProducts();
//     this.loadCategories();

//     this.sharedService.searchText$.subscribe((text) => {
//       this.searchText = text.toLowerCase();
//       this.applySearchFilter();
//     });
//   }

//   loadAllProducts(): void {
//     this.isLoading = true;
//     this.service.getProducts().subscribe((data: any[]) => {
//       this.products = data;
//       this.filteredProducts = data;
//       this.isLoading = false;
//       this.applySearchFilter();
//     });
//   }

//   loadCategories(): void {
//     this.isLoadingCategories = true;
//     this.service.getCategories().subscribe(data => {
//       this.categories = data;
//       this.isLoadingCategories = false;
//     });
//   }

//   loadProductsByCategory(category: string): void {
//     this.selectedCategory = category;
//     this.isCategoryLoading = true;

//     const observable = category
//       ? this.service.getProductsByCategory(category)
//       : this.service.getProducts();

//     observable.subscribe((data: any[]) => {
//       this.products = data;
//       this.filteredProducts = data;
//       this.isCategoryLoading = false;
//       this.applySearchFilter();
//     });
//   }

//   onCategoryChange(category: string): void {
//     this.loadProductsByCategory(category);
//   }

//   addToCart(product: any): void {
//     this.cartService.addToCart(product);
//     alert('Đã thêm vào giỏ hàng');
//   }

//   goToDetail(id: number): void {
//     this.router.navigate(['/products', id]);
//   }

//   getStars(rate: number): number[] {
//     return [1, 2, 3, 4, 5];
//   }

//   applySearchFilter(): void {
//     this.filteredProducts = this.products.filter(product =>
//       product.title.toLowerCase().includes(this.searchText)
//     );
//   }
// }




import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProductService } from '../../core/product.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  categories: string[] = [];
  selectedCategory: string = '';
  searchText: string = '';

  isLoading: boolean = true;
  isLoadingCategories: boolean = true;
  isCategoryLoading: boolean = false;

  constructor(
    private service: ProductService,
    private cartService: CartService,
    private router: Router,
    private sharedService: SharedService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.loadCategories();

    this.sharedService.searchText$.subscribe((text) => {
      this.searchText = text.toLowerCase();
      this.loadProducts();
    });

    this.loadProducts();

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event) => {
      if (this.router.url === '/') {
        this.searchText = '';
        this.selectedCategory = '';
        this.loadProducts();
      }
    });

  this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    const isAll = !this.selectedCategory || this.selectedCategory === '' || this.selectedCategory === 'Tất cả';
    const observable = isAll
      ? this.service.getProducts(this.searchText)
      : this.service.getProductsByCategory(this.selectedCategory, this.searchText);
    observable.subscribe((data: any[]) => {
      this.products = data;
      this.isLoading = false;
    });
  }

  loadCategories(): void {
  this.isLoadingCategories = true;
  this.service.getCategories().subscribe((data: any[]) => {
    this.categories = data.map(cat => typeof cat === 'string' ? cat : cat.name);
    this.isLoadingCategories = false;
  });
}


  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.isCategoryLoading = true;

    this.loadProducts();

    setTimeout(() => {
      this.isCategoryLoading = false;
    }, 300);
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    this.notification.success('Thành công', 'Đã thêm sản phẩm vào giỏ hàng!');
  }

  goToDetail(id: number): void {
    this.router.navigate(['/products', id]);
  }

  getStars(rate: number): number[] {
    return [1, 2, 3, 4, 5];
  }
}
