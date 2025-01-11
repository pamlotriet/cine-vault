import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Title } from '../models/movie.model';
import { forkJoin, Observable, of } from 'rxjs';
import { MOCK_TITLES, MOCK_MOVIE_DETAILS } from '../mock data/movies.mock';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  http = inject(HttpClient);
  apiKey = 'SSlxoOfEwfCe3kSdmvyDoQwwoGj3O41PzeYrWnoS';
  baseUrl = 'https://api.watchmode.com/v1';

  getList(page: number = 1): Observable<Title[]> {
    return this.http.get<Title[]>(
      `${this.baseUrl}/list-titles/?apiKey=${this.apiKey}&page=${page}&type=movie&limit=20`
    );
  }

  getDetails(movieId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/title/${movieId}/details/?apiKey=${this.apiKey}`
    );
  }

  getListMock(page: number): Observable<any> {
    const itemsPerPage = 20;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedTitles = MOCK_TITLES.slice(start, end);
    return of({ titles: paginatedTitles, total: MOCK_TITLES.length });
  }

  getDetailsMock(movieId: number): Observable<any> {
    const movieDetails = MOCK_MOVIE_DETAILS[movieId] || null;
    return of(movieDetails);
  }
}
