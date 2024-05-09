import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie, MovieDetails } from '../interface/movie';


@Injectable({
    providedIn: 'root'
})
export class MovieService {

    constructor(private http: HttpClient) { }

    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'An unknown error occurred';
        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }

    getMoviesList(): Observable<Movie[]> {
        return this.http.get<Movie[]>('/movies').pipe(
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }

    getMovieById(movieId: string): Observable<MovieDetails> {
        return this.http.get<MovieDetails>('/movies/' + movieId).pipe(
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }
}
