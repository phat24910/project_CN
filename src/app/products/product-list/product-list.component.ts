import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/product.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  searchText = '';

  categories: string[] = [];
  filteredProducts: any[] = [];
  selectedCategory: string ='';

  constructor(
    private service: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getProducts().subscribe((data: any[]) => {
      // this.products = data.products;
      this.products = data;
    });

    this.loadAllProducts();
    this.service.getCategories().subscribe(data => { this.categories =data;});
  }
    loadAllProducts(): void {
      this.service.getProducts().subscribe(data => { this.filteredProducts = data; });
    }

    loadProductsByCategory(category: string): void {
      if (!category) {
        this.loadAllProducts ();
      } else {
        this.service.getProductsByCategory(category).subscribe(data => {
          this.filteredProducts = data;
        });
      }
    }

    onCategoryChange(event: Event): void {
      const selectedCategory = (event.target as HTMLSelectElement).value;
      this.loadProductsByCategory(selectedCategory);
    }

    goToDetail(id: number): void {
      this.router.navigate(['/products', id]);
    }

    addToCart(product: any):void {
      this.cartService.addToCart(product);
      alert('Đã thêm vào giỏ hàng');
    }

    getStars (rate: number): number [] {
      return[1,2,3,4,5];
    }
}


