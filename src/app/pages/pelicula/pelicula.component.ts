import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieDetails } from '../../interfaces/movies-response';
import { Location } from '@angular/common';
import { Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styles: [
  ]
})
export class PeliculaComponent implements OnInit {

  public pelicula:MovieDetails;
  public cast:Cast[] = [];

  constructor( private activatedroute:ActivatedRoute,
               private peliculasservice:PeliculasService,
               private location:Location,
               private router:Router ) { }

  ngOnInit(): void {
    const { id }  = this.activatedroute.snapshot.params;


    combineLatest([

      this.peliculasservice.getPeliculaDetalle( id ),
      this.peliculasservice.getCast( id )

    ]).subscribe( ( [pelicula, cast] ) => {
      //console.log(pelicula,cast);
        if( !pelicula ){
          this.router.navigateByUrl('/home');
          return;
        }
        this.pelicula = pelicula;

        this.cast = cast.filter(actor => actor.profile_path !== null );

    });
    
  /*   this.peliculasservice.getPeliculaDetalle( id ).subscribe( movie =>{
      //console.log(movie);
      if( !movie ){
        this.router.navigateByUrl('/home');
        return;
      }
      this.pelicula = movie;
    });

    this.peliculasservice.getCast( id ).subscribe( cast => {
      //.log(cast);
      this.cast = cast.filter(actor => actor.profile_path !== null );
    }); */
  }

  onRegresar(){
    this.location.back();
  }

}
