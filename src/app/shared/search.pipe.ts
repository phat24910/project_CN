import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
  transform(products: any[], keyword: string): any[] {
    if 
      (!keyword) return products;
    return products.filter(p =>
      p.title.toLowerCase().includes(keyword.toLowerCase())
    );
  }
}
