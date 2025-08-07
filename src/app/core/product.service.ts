import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = 'https://dummyjson.com/products';

  // private api = 'https://fakestoreapi.com/products';

  // private api = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(keyword?: string, skip: number = 0, limit: number = 30): Observable<any[]> {
    let url = '';
    if (keyword && keyword.trim() !== '') {
      url = `https://dummyjson.com/products/search?q=${encodeURIComponent(keyword)}&skip=${skip}&limit=${limit}`;
    } else {
      url = `${this.api}?skip=${skip}&limit=${limit}`;
    }
    return this.http.get<any>(url).pipe(
      map((response: any) => response.products)
    );
  }


  getProduct(id: number) {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  addProduct (product: any) {
    return this.http.post(this.api + '/add', product);
  }

  // getCategories(): Observable<string[]> {
  //   return this.http.get<string[]>('https://fakestoreapi.com/products/categories');
  // }

  getCategories(): Observable<string[]> {
  return this.http.get<any>('https://dummyjson.com/products/categories')
    .pipe(map((categories: any) => Array.isArray(categories) ? categories : []));
}


  // getProductsByCategory(category: string, keyword?: string): Observable<any[]> {
  //   return this.http.get<any[]>(`https://fakestoreapi.com/products/category/${category}`).pipe(
  //     map((products: any[]) => {
  //       if (!keyword) return products;
  //       return products.filter(p =>
  //         p.title.toLowerCase().includes(keyword.toLowerCase())
  //       );
  //     })
  //   );
  // }

  getProductsByCategory(category: string, keyword?: string, skip: number = 0, limit: number = 30): Observable<any[]> {
    if (keyword && keyword.trim() !== '') {
      const url = `https://dummyjson.com/products/search?q=${encodeURIComponent(keyword)}&skip=${skip}&limit=${limit}`;
      return this.http.get<any>(url).pipe(
        map((response: any) => {
          let products = response.products.filter((p: any) => p.category === category);
          return products.slice(0, limit);
        })
      );
    } else {
      let url = `https://dummyjson.com/products/category/${encodeURIComponent(category)}?skip=${skip}&limit=${limit}`;
      return this.http.get<any>(url).pipe(
        map((response: any) => response.products)
      );
    }
  }

}

