import { Component, OnDestroy, OnInit } from '@angular/core';
import { GithubService, IUser } from '../services/github.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  getCurrentSearchSubscription: Subscription | null;
  constructor(private gitHubService: GithubService) {
    this.getCurrentSearchSubscription = null;
  }
  currentUser: IUser | null = null;
  ngOnInit(): void {
    this.getCurrentSearchSubscription = this.gitHubService
      .getCurrentSearch()
      .subscribe({
        next: (data) => {
          this.currentUser = data;
        },
      });
  }

  ngOnDestroy(): void {
    this.getCurrentSearchSubscription?.unsubscribe();
  }
}
