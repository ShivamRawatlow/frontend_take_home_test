import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
  GithubService,
  ISearchHistory,
  IUser,
} from 'src/app/services/github.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput: ElementRef | null = null;
  getUserSubscription: Subscription | null;
  constructor(private githubService: GithubService) {
    this.getUserSubscription = null;
  }

  ngOnInit(): void {}
  onSearchClick(value: string) {
    this.getUserSubscription = this.githubService.getUser(value).subscribe({
      next: (data: any) => {
        console.log(data);
        const user: IUser = {
          username: data.login,
          githubProfile: data.html_url,
          avatar: data.avatar_url,
        };
        const searchResult: ISearchHistory = {
          searchTerm: value,
          searchResult: user,
        };
        this.githubService.updateSearchResults(searchResult);
        this.githubService.updateCurrentSearch(user);
      },
      error: (error) => {
        console.log('API Fetching Error : ', error);
        const searchResult: ISearchHistory = {
          searchTerm: value,
          searchResult: null,
        };
        this.githubService.updateSearchResults(searchResult);
        this.githubService.clearCurrentSearch();
      },
    });
    if(this.searchInput){
       this.searchInput.nativeElement.value = '';
    }    
  }

  ngOnDestroy(): void {
    this.getUserSubscription?.unsubscribe();
  }
}
