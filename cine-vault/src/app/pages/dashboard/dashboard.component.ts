import { Component, HostListener, OnInit, inject } from '@angular/core';
import { MovieService } from '../../shared/services/movie.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class DashboardComponent implements OnInit {
  movieService = inject(MovieService);
  authService = inject(AuthenticationService);
  titles: any[] = [];
  movieDetails: any[] = [];
  batchSize = 20;
  currentPage = 0;

  ngOnInit(): void {
    // this.getTitles();
    this.getTitlesMock();
  }

  addToFavourites(movieId: string) {
    console.log('clicked');
    const userId = this.authService.getUserId();
    console.log(movieId);
    if (userId && movieId) {
      this.movieService
        .addToFavourites(userId, movieId)
        .then(() => console.log('Movie added to favorites!'))
        .catch((error) =>
          console.error('Error adding movie to favorites:', error)
        );
    }
  }

  getTitles() {
    this.movieService.getList(1).subscribe((response: any) => {
      this.titles = response.titles;
      console.log('Fetched Titles:', this.titles);
      this.loadNextBatch();
    });
  }

  loadNextBatch() {
    forkJoin(
      this.titles.map((movie) =>
        this.movieService.getDetails(movie.id).pipe(
          catchError((error) => {
            console.error(`Error fetching details for ID ${movie.id}:`, error);
            return of(null);
          })
        )
      )
    ).subscribe((details) => {
      this.movieDetails.push(...details.filter((detail) => detail !== null));
    });
  }

  getTitlesMock() {
    this.movieService.getListMock(1).subscribe((response: any) => {
      this.titles = response.titles;
      console.log('Fetched Titles:', this.titles);
      this.loadNextBatchMock();
    });
  }

  loadNextBatchMock() {
    forkJoin(
      this.titles.map((movie) =>
        this.movieService.getDetailsMock(movie.id).pipe(
          catchError((error) => {
            console.error(`Error fetching details for ID ${movie.id}:`, error);
            return of(null);
          })
        )
      )
    ).subscribe((details) => {
      this.movieDetails.push(...details.filter((detail) => detail !== null));
      console.log('Fetched Movie Details:', this.movieDetails);
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const scrollPosition = window.scrollY + window.innerHeight;
    const bottomPosition = document.documentElement.scrollHeight;

    if (scrollPosition >= bottomPosition - 50) {
      console.log('Reached bottom. Loading more...');
      this.getTitlesMock();
    }
  }
}
