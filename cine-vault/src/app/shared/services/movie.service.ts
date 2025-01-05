import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Title } from '../models/movie.model';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  http = inject(HttpClient);
  apiKey = 'SSlxoOfEwfCe3kSdmvyDoQwwoGj3O41PzeYrWnoS';
  baseUrl = 'https://api.watchmode.com/v1';

  getList(page: number = 1): Observable<Title[]> {
    return this.http.get<Title[]>(
      `${this.baseUrl}/list-titles/?apiKey=${this.apiKey}&page=${page}`
    );
  }

  getDetails(movieId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/title/${movieId}/details/?apiKey=${this.apiKey}`
    );
  }
}
