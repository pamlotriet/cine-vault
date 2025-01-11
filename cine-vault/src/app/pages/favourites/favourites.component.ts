import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { MovieService } from '../../shared/services/movie.service';
import { catchError, forkJoin, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favourites',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './favourites.component.html',
})
export class FavouritesComponent implements OnInit {
  movieService = inject(MovieService);
  authService = inject(AuthenticationService);
  favouriteDetails: any[] = [];

  ngOnInit(): void {
    this.getFavourites();
  }

  getFavourites() {
    const userId = this.authService.getUserId();
    if (userId)
      this.movieService.getFavourites(userId).subscribe((x) => {
        console.log(x);
        this.getDetailsForFavourites(x);
      });
  }

  getDetailsForFavourites(favourites: any[]) {
    const detailRequests = favourites.map((favourite) =>
      this.movieService.getDetailsMock(favourite.movieId).pipe(
        catchError((error) => {
          console.error(
            `Error fetching details for movieId ${favourite.movieId}:`,
            error
          );
          return of(null);
        })
      )
    );

    forkJoin(detailRequests).subscribe((details) => {
      this.favouriteDetails = details.filter((detail) => detail !== null);
      console.log('Fetched Favourite Details:', this.favouriteDetails);
    });
  }

  removeFromFavouritesByMovieId(movieId: string) {
    const userId = this.authService.getUserId();
    if (userId)
      this.movieService.removeFromFavouritesByMovieId(userId, movieId);
  }
}
