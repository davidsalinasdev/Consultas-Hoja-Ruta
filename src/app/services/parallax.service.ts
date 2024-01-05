import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParallaxService {

  public datos$ = new EventEmitter<any>(); // Emiten datos de tipo array

  constructor() {
    console.log(this.datos$);

  }
}
