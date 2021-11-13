import { environment } from './../../environments/environment';
import { MovieModel } from './../_models/movie';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'movie');
  }

  getMovie(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'movie');
  }

  deleteMovie(id: string, movie: MovieModel): Observable<any> {
    return this.http.delete<any>(this.apiUrl + 'movie/' + id);
  }

  updateMovie(movie: MovieModel): Observable<any> {
    return this.http.put<any>(this.apiUrl + 'movie/', movie);
  }

  addMovie(movie: MovieModel): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'movie/', movie);
  }
}
