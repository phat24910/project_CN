import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProductService } from '../../core/product.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslocoService } from '@jsverse/transloco';
import { Subscription } from 'rxjs';

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }>;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
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
  private subscriptions = new Subscription();

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
      this.searchText = text ? text.toLowerCase() : '';
      this.filterProducts();
      this.updatePagination();
    });

    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchText = params['search'].toLowerCase();
        this.sharedService.setSearchText(params['search']);
        this.filterProducts();
        this.updatePagination();
      } else {
        
        this.searchText = '';
        this.sharedService.clearSearchText();
        this.filterProducts();
        this.updatePagination();
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
        this.filterProducts();
        this.updatePagination();
      }
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    this.service.getAllProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.filterProducts();
        this.updatePagination();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      }
    });
  }

  filterProducts(): void {
    let filtered = this.products;

    // Filter by category
    if (this.selectedCategory && this.selectedCategory.trim() !== '') {
      filtered = filtered.filter(product =>
        (product.category || '').toLowerCase() === this.selectedCategory.toLowerCase()
      );
    }

    // Filter by search text
    if (this.searchText && this.searchText.trim() !== '') {
      const searchLower = this.searchText.toLowerCase();
      filtered = filtered.filter(product =>
        (product.title || '').toLowerCase().includes(searchLower) ||
        (product.description || '').toLowerCase().includes(searchLower) ||
        (product.category || '').toLowerCase().includes(searchLower) ||
        (product.brand || '').toLowerCase().includes(searchLower)
      );
    }

    this.filteredProducts = filtered;
    this.total = filtered.length;
    this.pageIndex = 1; // Reset page
  }

  updatePagination(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  onCategoryChange(): void {
    this.pageIndex = 1; // Reset to first page
    this.filterProducts();
    this.updatePagination();
  }

  onSearchChange(): void {
    this.pageIndex = 1; // Reset to first page
    this.filterProducts();
    this.updatePagination();
  }

  onPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.updatePagination();
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    this.notification.success(
      this.transloco.translate('productList.notification.successTitle'),
      this.transloco.translate('productList.notification.successMsg')
    );
  }

  loadCategories(): void {
    this.isLoadingCategories = true;
    this.service.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.isLoadingCategories = false;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.isLoadingCategories = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
