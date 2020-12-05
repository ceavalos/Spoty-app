import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tajetas',
  templateUrl: './tajetas.component.html'
})
export class TajetasComponent  {

  constructor(private router: Router) { }

  @Input()  items: any[] = [];
 
  verartista( item: any){
    //console.log(item);

    let artistaId ;
     
    if (item.type === 'artist' ){
      artistaId = item.id;      
    } else{
      artistaId = item.artists[0].id;
    }
    //console.log(artistaId);

    this.router.navigate(['/artist', artistaId]);
  }
  
}
