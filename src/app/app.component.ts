import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  GithubService,
  SEARCH_HISTORY_STORAGE_KEY,
} from './services/github.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  subscription: Subscription | null = null;
  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    const storeData = localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY);
    if (storeData) {
      const data = JSON.parse(storeData);
      this.githubService.setSearchResults(data);
    }
  }
}
