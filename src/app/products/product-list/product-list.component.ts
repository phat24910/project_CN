import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProductService } from '../../core/product.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslocoService } from '@jsverse/transloco';

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

  // Phân trang
  pageSize = 8;
  pageIndex = 1;
  total = 0;
  pagedProducts: any[] = [];

  constructor(
    private service: ProductService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private notification: NzNotificationService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.loadCategories();

    // Subscribe to search text changes
    this.sharedService.searchText$.subscribe((text) => {
      this.searchText = text.toLowerCase();
      this.loadProducts();
    });

    // Handle query params for search
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchText = params['search'].toLowerCase();
        this.sharedService.setSearchText(params['search']);
        this.loadProducts();
      } else {
        // Clear search if no query params
        this.searchText = '';
        this.sharedService.clearSearchText();
        this.loadProducts();
      }
    });

    this.loadProducts();

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event) => {
      if (this.router.url === '/') {
        this.searchText = '';
        this.selectedCategory = '';
        this.sharedService.clearSearchText();
        this.loadProducts();
      }
    });
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
      this.total = data.length;
      this.pageIndex = 1;
      this.updatePagedProducts();
      // ensure view returns to top after content update
      try {
        window.scrollTo({ top: 0, behavior: 'auto' });
      } catch {}
    });
  }

  updatePagedProducts(): void {
    const start = (this.pageIndex - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedProducts = this.products.slice(start, end);
  }

  onPageChange(page: number): void {
    this.pageIndex = page;
    this.updatePagedProducts();
    window.scrollTo({ top: 0, behavior: 'auto' });
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
    this.notification.success(
      this.transloco.translate('productList.notification.successTitle'),
      this.transloco.translate('productList.notification.successMsg')
    );
  }

  goToDetail(id: number): void {
    this.router.navigate(['/products', id]);
  }

  getStars(rate: number): number[] {
    return [1, 2, 3, 4, 5];
  }
}
