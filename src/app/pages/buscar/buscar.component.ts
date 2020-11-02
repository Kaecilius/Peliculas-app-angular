import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: []
})
export class BuscarComponent implements OnInit {

  public TerminoBusqueda: string;
  public movies:Movie[] = [];

  constructor( private activatedRoute:ActivatedRoute,
               private peliculasservice:PeliculasService ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {
      this.TerminoBusqueda = params.texto;
      //llamar el servicio..
      this.peliculasservice.buscarPeliculas( params.texto )
                            .subscribe( movies => {
                              //console.log( movies )
                              this.movies = movies;
                            });
    });

  }

}
