import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http : HttpClient) { 
    console.log("Servicio SpotiFy Listo!!")
  }

  getQuery(query: string){
    const url = `https://api.spotify.com/v1/${ query }`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer QDW1DfdKNEv6H_xog6AHBj7cg_RRAlWqaJ1hmuOMh8APXiMfGivcjRNFQjfJQhrHf7fXAfos7rdKL8MNcU'
    });
      return this.http.get(url,{ headers });      
  }

  getNewReleases(){
    return this.getQuery ('browse/new-releases?limit=20') 
    .pipe( map( data =>{
      return data['albums'].items;
    }) );
  }


  getArtistas( termino: string){    
    return this.getQuery(`search?q=${ termino }&type=artist`)
      .pipe( map( (data: any)=>{
      return data.artists.items;
     }  ));

  }

  getArtista( id: string){    
    return this.getQuery(`artists/${ id }`);
  }

  getTopTrack( id: string){    
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
    .pipe( map( (data: any)=>{
      return data.tracks;
     }  ));
  }
  

}
