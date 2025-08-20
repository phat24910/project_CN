import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

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

interface ApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getProducts(keyword?: string, skip: number = 0, limit: number = 100): Observable<Product[]> {
    let url = '';
    if (keyword && keyword.trim() !== '') {
      url = `https://dummyjson.com/products/search?q=${encodeURIComponent(keyword)}&skip=${skip}&limit=${limit}`;
    } else {
      url = `${this.api}?skip=${skip}&limit=${limit}`;
    }
    return this.http.get<ApiResponse>(url).pipe(
      map((response: ApiResponse) => response.products)
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<ApiResponse>(`${this.api}?limit=100`).pipe(
      map((response: ApiResponse) => {
        const categories = [...new Set(response.products.map((product: Product) => product.category))];
        return categories.sort();
      })
    );
  }

  getProductsByCategory(category: string, keyword?: string): Observable<Product[]> {
    let url = `${this.api}?limit=100`;
    if (keyword && keyword.trim() !== '') {
      url = `https://dummyjson.com/products/search?q=${encodeURIComponent(keyword)}&limit=100`;
    }
    
    return this.http.get<ApiResponse>(url).pipe(
      map((response: ApiResponse) => {
        let products = response.products;
        if (category && category.trim() !== '') {
          products = products.filter((product: Product) => 
            product.category.toLowerCase() === category.toLowerCase()
          );
        }
        return products;
      })
    );
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<ApiResponse>(`${this.api}?limit=100`).pipe(
      map((response: ApiResponse) => response.products)
    );
  }
}

