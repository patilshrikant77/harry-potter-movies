import { Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

export const routes: Routes = [
    { path: 'movies', component: MovieListComponent },
    { path: 'movies/:movieId', component: MovieDetailsComponent },
    { path: '**', redirectTo: 'movies' },
];
