import { Component, OnInit, inject } from '@angular/core';
import { MovieService } from '../../shared/services/movie.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../shared/components/button/button.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
})
export class DashboardComponent implements OnInit {
  movieService = inject(MovieService);
  titles: any[] = [];
  movieDetails: any[] = [];
  batchSize = 20;
  currentPage = 0;

  ngOnInit(): void {
    this.getTitles();
  }

  getTitles() {
    this.movieService.getList(1).subscribe((response: any) => {
      this.titles = response.titles;
      console.log('Fetched Titles:', this.titles);
      this.loadNextBatch();
    });
  }

  loadNextBatch() {
    const start = this.currentPage * this.batchSize;
    const end = start + this.batchSize;

    const batch = this.titles.slice(start, end);

    forkJoin(
      batch.map((movie) =>
        this.movieService.getDetails(movie.id).pipe(
          catchError((error) => {
            console.error(`Error fetching details for ID ${movie.id}:`, error);
            return of(null); 
          })
        )
      )
    ).subscribe((details) => {
      this.movieDetails.push(...details.filter((detail) => detail !== null));
      console.log(`Loaded batch ${this.currentPage + 1} details:`, details);
      this.currentPage++;
    });
  }
}
