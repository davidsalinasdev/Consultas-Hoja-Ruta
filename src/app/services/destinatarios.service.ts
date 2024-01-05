import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DestinatariosService {

  // propiedad observable
  public datos$ = new EventEmitter<any>(); // Emiten datos de tipo array
  public datosDos$ = new EventEmitter<any>(); // Emiten datos de tipo array
  public datosTres$ = new EventEmitter<any>(); // Emiten datos de tipo array
  public datosCuatro$ = new EventEmitter<any>(); // Emiten datos de tipo array
  public datosCinco$ = new EventEmitter<any>(); // Emiten datos de tipo array

  constructor() { }
}
