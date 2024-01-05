import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

// Variables globales
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CorrespondenciaService {

  constructor(
    private http: HttpClient
  ) { }

  // Servicio para crear un usuario
  listaSeguimiento(formData: any) {
    // console.log(formData);
    let headers = new HttpHeaders();
    return this.http.post<any>(base_url + '/Restserver/test', formData, { headers: headers });
  }
}
