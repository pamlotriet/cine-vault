import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Title } from '../models/movie.model';
import { Observable, of } from 'rxjs';
import { MOCK_TITLES, MOCK_MOVIE_DETAILS } from '../mock data/movies.mock';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  http = inject(HttpClient);
  apiKey = 'SSlxoOfEwfCe3kSdmvyDoQwwoGj3O41PzeYrWnoS';
  baseUrl = 'https://api.watchmode.com/v1';
  firestore = inject(Firestore);

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

  addToWatchlist(userId: string, movie: any) {
    const watchlistCollection = collection(
      this.firestore,
      `users/${userId}/watchlist`
    );
    return addDoc(watchlistCollection, movie);
  }

  addToWatchedlist(userId: string, movie: any) {
    const watchedlistCollection = collection(
      this.firestore,
      `users/${userId}/watchedlist`
    );
    return addDoc(watchedlistCollection, movie);
  }

  addToFavourites(userId: string, movieId: string) {
    const favouritesCollection = collection(
      this.firestore,
      `users/${userId}/favorites`
    );

    // Store both movieId and userId in the document
    return addDoc(favouritesCollection, {
      userId,
      movieId,
    });
  }

  getWatchlist(userId: string): Observable<any[]> {
    const watchlistCollection = collection(
      this.firestore,
      `users/${userId}/watchlist`
    );
    return collectionData(watchlistCollection, { idField: 'id' });
  }

  getWatchedlist(userId: string): Observable<any[]> {
    const watchedlistCollection = collection(
      this.firestore,
      `users/${userId}/watchedlist`
    );
    return collectionData(watchedlistCollection, { idField: 'id' });
  }

  getFavourites(userId: string): Observable<any[]> {
    const favouritesCollection = collection(
      this.firestore,
      `users/${userId}/favorites`
    );
    return collectionData(favouritesCollection, { idField: 'id' });
  }

  async removeFromFavouritesByMovieId(
    userId: string,
    movieId: string
  ): Promise<void> {
    const favouritesCollection = collection(
      this.firestore,
      `users/${userId}/favorites`
    );
    const q = query(favouritesCollection, where('movieId', '==', movieId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      const favouriteDoc = doc(
        this.firestore,
        `users/${userId}/favorites/${document.id}`
      );
      await deleteDoc(favouriteDoc);
    });
  }
}
