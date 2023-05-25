import { Component, OnDestroy, OnInit } from '@angular/core';
import { GithubService, ISearchHistory } from '../services/github.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  getSearchHistorySubscription: Subscription | null = null;
  searchHistory: ISearchHistory[] = [];
  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.getSearchHistorySubscription = this.githubService
      .getSearchResults()
      .subscribe({
        next: (data) => {
          console.log('Search History Data : ', data);
          this.searchHistory = data;
        },
      });
  }

  clearSearchHistory() {
    this.githubService.clearSeachHistory();
  }

  ngOnDestroy(): void {
    this.getSearchHistorySubscription?.unsubscribe();
  }
}
