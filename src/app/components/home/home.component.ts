import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { SpotifyService } from 'src/app/services/spotify.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  paises : any[] = [];
   
  nuevasCanciones : any[] = [];

   loading : boolean ;
    error : boolean;
    mesajeerror : string;
  constructor(   private http: HttpClient, 
                private spotify: SpotifyService) { 
  
    this.loading= true;
    this.error = false;
    

    this.spotify.getNewReleases()
    .subscribe( data => {
       //console.log(data);
       this.nuevasCanciones = data;
       this.loading= false;
    }, (errorserv )=>{
       this.loading= false;
       this.error = true;
       console.log(errorserv.error.error.message);
       this.mesajeerror = errorserv.error.error.message;
    }   );
    /*
    this.http.get('https://restcountries.eu/rest/v2/lang/es')
    .subscribe( (resp : any) =>{
      this.paises = resp;
      console.log(resp)
    });*/
    

  }

  ngOnInit(): void {
  }

}
