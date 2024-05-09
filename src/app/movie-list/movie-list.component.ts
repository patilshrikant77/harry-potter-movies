import { Component, OnInit } from '@angular/core';
import { Movie } from '../interface/movie';
import { MovieService } from '../services/movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-movie-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterModule,
        FormsModule,
        HttpClientModule
    ],
    templateUrl: './movie-list.component.html',
    styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {
    movies: Movie[] = [];
    filteredMovies: Movie[] = [];
    query: string = '';
    releaseYear: number | undefined;

    constructor(private movieService: MovieService) { }

    ngOnInit(): void {
        this.loadMovies();
    }

    loadMovies() {
        this.movieService.getMoviesList().subscribe(movies => {
            this.movies = movies;
            this.filteredMovies = [...this.movies]; // Copy all movies to filteredMovies initially
        });
    }

    search() {
        this.filteredMovies = this.movies.filter(movie => {
            const titleMatch = movie.title.toLowerCase().includes(this.query.toLowerCase());
            const releaseYearMatch = !this.releaseYear || movie.release_date.includes(String(this.releaseYear));
            return titleMatch && releaseYearMatch;
        });
        // If neither title nor release year matches, show all movies
        if (this.filteredMovies.length === 0) {
            this.filteredMovies = [...this.movies];
        }
    }
}