import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  
   token : any;

  constructor(private http : HttpClient) { 
    console.log("Servicio SpotiFy Listo!!")
    //const url = "http://localhost:8090/spotify-response";
    const url = "https://spotyfy-serv-token.herokuapp.com/spotify-response";
    this.http.get(url).pipe(
      map(datos => {
         this.token = datos.access_token;
         this.sleep(3000)
      })
    );
  }

   sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
     if ((new Date().getTime() - start) > milliseconds) {
      break;
     }
    }
   }

  getToken(){
    // Servidor que se creo para solicitar tocken
    console.log("obteniendo nuevo tocken ");
    const url = "https://spotyfy-serv-token.herokuapp.com/spotify-response";
    //const url = "http://localhost:8090/spotify-response";
    
     return this.http.get(url).pipe( map(data => { 
      return data; 
       }));
  

  }

    getQuery(query: string){
    const url = `https://api.spotify.com/v1/${ query }`;
   
     this.getToken().subscribe(data=> { 
     this.token= data.access_token; 
     console.log( "token desde funcion " + this.token) 
    ;
    
    } ) ;
   
    console.log( "token fuera--> " + this.token) 
    
   const headers = new HttpHeaders({
     // 'Authorization': 'Bearer BQCWJ7fB1dsfx3vetM-nbyqzQZ37vSomsytblmkZsxVf_hEGwrt7rq33mGfbkL4u66zEy1fKGgbJGoqtn6k'
     'Authorization': 'Bearer '+ this.token
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
