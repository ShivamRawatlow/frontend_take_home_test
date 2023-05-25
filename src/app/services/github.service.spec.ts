import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GithubService, ISearchHistory, IUser } from './github.service';

fdescribe('GithubService', () => {
  let service: GithubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GithubService);
  });

  it('should emit given values when behaviour subject change testing updateSearchResults', () => {
    const emitter = service.data$;
    let emmitedValue: ISearchHistory[] = [];
    emitter.subscribe((data) => (emmitedValue = data));

    const search: ISearchHistory = {
      searchTerm: '$$2',
      searchResult: null,
    };
    const expectedValue = [search];
    service.updateSearchResults(search);
    expect(emmitedValue).toEqual(expectedValue);
  });

  it('should emit given values when behaviour subject change testing updateCurrentSearch', () => {
    const emitter = service.currentData$;
    let emmitedValue: IUser | null = null;
    emitter.subscribe((data) => (emmitedValue = data));

    const user: IUser = {
      username: 'ABCD',
      avatar: 'abcd',
      githubProfile: 'abcd',
    };
    service.updateCurrentSearch(user);
    expect(emmitedValue).toEqual(user as any);
  });

  it('testing getCurrentSearch', () => {
    const expectedValue = service.currentData$;
    const value = service.getCurrentSearch();
    expect(value).toEqual(expectedValue);
  });

  it('testing clearSearchHistory', () => {
    const emitter = service.data$;
    let emmitedValue: ISearchHistory[] = [];
    emitter.subscribe((data) => (emmitedValue = data));

    const expectedValue: ISearchHistory[] = [];
    service.clearSeachHistory();
    expect(emmitedValue).toEqual(expectedValue);
  });
});
