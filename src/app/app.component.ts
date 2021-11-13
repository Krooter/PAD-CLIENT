import { MovieService } from './_services/movie.service';
import { MovieModel } from './_models/movie';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Movie app from TI-182';

  showForm = 0;

  movies!: MovieModel[];

  movieForm!: FormGroup;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    // this.movies = [
    //   {
    //     actors: ['Ricahrd Loxevski'],
    //     name: 'Lox is kota',
    //     budget: '20000',
    //     description: 'Lorem lipsum aalala',
    //   },
    //   {
    //     actors: ['Ricahrd Loxevski'],
    //     name: 'Lox is kota 2',
    //     budget: '30000',
    //     description: 'Lorem lipsum aalala',
    //   },
    //   {
    //     actors: ['Ricahrd Loxevski'],
    //     name: 'Lox is kota 3',
    //     budget: '40000',
    //     description: 'Lorem lipsum aalala',
    //   },
    // ];
    this.getMovies();
    this.initForm();
  }

  initForm() {
    this.movieForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      actors: new FormControl([''], [Validators.required]),
      budget: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    })
  }

  getMovies() {
    this.movieService.getMovies().subscribe(
      (response) => {
        this.movies = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteMovie(id: string, item: MovieModel) {
    this.movieService.deleteMovie(id, item).subscribe(
      () => {
        console.log('Succes');
      },
      () => {
        console.log('Something went wrong');
      }
    );
  }

  goToCreate() {
    this.showForm = 1;
    this.initForm();
  }

  goToUpdate(item: MovieModel) {
    this.showForm = 2;
    this.movieForm = new FormGroup({
      id: new FormControl(item.id),
      name: new FormControl(item.name, [Validators.required]),
      actors: new FormControl(item.actors, [Validators.required]),
      budget: new FormControl(item.budget, [Validators.required]),
      description: new FormControl(item.description, [Validators.required]),
    })
  }

  submit() {
    if (this.showForm === 1) {
      var item = new MovieModel();
      item.name = this.movieForm.get('name')?.value;
      item.description = this.movieForm.get('description')?.value;
      item.actors = this.movieForm.get('actors')?.value;
      item.budget = this.movieForm.get('budget')?.value;
      this.movieService.addMovie(item).subscribe(() => {
        console.log('Movie added!');
        this.getMovies();
        this.showForm = 0;
      }, () => {
        console.log('Something went wrong!');
      })
    }
    if (this.showForm === 2) {
      var item = new MovieModel();
      item.name = this.movieForm.get('name')?.value;
      item.id = this.movieForm.get('id')?.value;
      item.description = this.movieForm.get('description')?.value;
      item.actors = this.movieForm.get('actors')?.value;
      item.budget = this.movieForm.get('budget')?.value;
      this.movieService.updateMovie(item).subscribe(() => {
        console.log('Movie updated!');
        this.getMovies();
        this.showForm = 0;
      }, () => {
        console.log('Something went wrong!');
      })
    }
  }

  goHome() {
    this.showForm = 0;
  }
}
