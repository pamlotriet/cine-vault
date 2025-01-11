import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WatchedlistComponent } from './pages/watchedlist/watchedlist.component';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';
import { FavouritesComponent } from './pages/favourites/favourites.component';
import { MenuComponent } from './pages/menu/menu.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'watchedlist', component: WatchedlistComponent },
  { path: 'favorites', component: FavouritesComponent },
  { path: 'menu', component: MenuComponent },
];
