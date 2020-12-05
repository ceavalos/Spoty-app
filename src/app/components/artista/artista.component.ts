import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';


@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html'
})
export class ArtistaComponent  {

  artista: any = {};
  topTracks: any = [];

  loading: boolean;

  constructor(private router: ActivatedRoute,
              private spotify: SpotifyService) {
    
    this.router.params.subscribe(data =>{      
      //console.log(data['id']);   
      this.getartista(data['id'])  ; 
      this.getTopTracks(data['id']);
    })
   }

 getartista( id: string){
    this.loading = true;
    this.spotify.getArtista(id)
    .subscribe(data=>{
      //console.log("xxxx");
      //console.log(data);
      this.artista = data;
      this.loading = false;
    })
 }

 getTopTracks(id: string){
   this.spotify.getTopTrack(id)
   .subscribe( data=> { 
       console.log(data);
       this.topTracks = data;
   });
 }

}
