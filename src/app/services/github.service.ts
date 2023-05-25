import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface IUser {
  username: string;
  avatar: string;
  githubProfile: string;
}

export interface ISearchHistory {
  searchTerm: string;
  searchResult: IUser | null;
}

export const SEARCH_HISTORY_STORAGE_KEY = 'Search History';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private searchHistory = new BehaviorSubject<ISearchHistory[]>([]);
  data$ = this.searchHistory.asObservable();
  private currentSearch = new BehaviorSubject<IUser | null>(null);
  currentData$ = this.currentSearch.asObservable();

  url = 'https://api.github.com/users/';

  constructor(private http: HttpClient) {}

  getUser(username: string) {
    return this.http.get(this.url + username);
  }

  setSearchResults(searchResults: ISearchHistory[]) {
    this.searchHistory.next(searchResults);
  }

  updateSearchResults(searchResult: ISearchHistory) {
    const searchResults = this.searchHistory.getValue();
    searchResults.push(searchResult);
    this.searchHistory.next(searchResults);
    localStorage.setItem(
      SEARCH_HISTORY_STORAGE_KEY,
      JSON.stringify(searchResults)
    );
  }

  updateCurrentSearch(currentUser: IUser) {
    this.currentSearch.next(currentUser);
  }
  getCurrentSearch() {
    return this.currentData$;
  }
  getSearchResults() {
    return this.data$;
  }
  clearCurrentSearch() {
    this.currentSearch.next(null);
  }
  clearSeachHistory() {
    this.searchHistory.next([]);
    this.clearCurrentSearch();
    localStorage.removeItem(SEARCH_HISTORY_STORAGE_KEY);
  }
}
