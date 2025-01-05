export interface Title {
  id: number;
  title: string;
  year: number;
  imdb_id: string;
  tmdb_id: number;
  tmdb_type: string;
  type: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  original_title: string;
  plot_overview: string;
  type: string;
  runtime_minutes: number;
  year: number;
  end_year: number | null;
  release_date: string;
  imdb_id: string;
  tmdb_id: number;
  tmdb_type: string;
  genres: number[];
  genre_names: string[];
  user_rating: number;
  critic_score: number;
  us_rating: string;
  poster: string;
  posterMedium: string;
  posterLarge: string;
  backdrop: string | null;
  original_language: string;
  similar_titles: number[];
  networks: string[] | null;
  network_names: string[] | null;
  relevance_percentile: number;
  popularity_percentile: number;
  trailer: string;
  trailer_thumbnail: string;
}

export interface SeriesDetail {
  id: number;
  title: string;
  original_title: string;
  plot_overview: string;
  type: 'movie' | 'tv_series';
  runtime_minutes: number | null;
  year: number;
  end_year: number | null;
  release_date: string;
  imdb_id: string;
  tmdb_id: number;
  tmdb_type: string;
  genres: number[];
  genre_names: string[];
  user_rating: number;
  critic_score: number;
  us_rating: string;
  poster: string;
  posterMedium: string;
  posterLarge: string;
  backdrop: string | null;
  original_language: string;
  similar_titles: number[];
  networks: number[] | null;
  network_names: string[] | null;
  relevance_percentile: number;
  popularity_percentile: number | null;
  trailer: string | null;
  trailer_thumbnail: string | null;
}
