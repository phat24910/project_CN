import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  // private api = 'https://dummyjson.com/products';

  private api = 'https://fakestoreapi.com/products'

  // private api = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any>(this.api);
  }

  getProduct(id: number) {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  addProduct (product: any) {
    return this.http.post(this.api, product);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>('https://fakestoreapi.com/products/categories');
  }

  getProductsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`https://fakestoreapi.com/products/category/${category}`);
  }
}


