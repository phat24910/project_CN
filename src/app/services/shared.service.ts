import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private searchTextSource = new BehaviorSubject<string>('');
  searchText$ = this.searchTextSource.asObservable();

  setSearchText(text: string) {
    this.searchTextSource.next(text);
  }
}
