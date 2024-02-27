import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {

  servidor = "https://api-proyweb.onrender.com";

  constructor(private servicio:HttpClient) { }

  mostrarUbicaciones(): Observable<any> {
    return this.servicio.get(`${this.servidor}/api/ubicaciones`);
  }

}
