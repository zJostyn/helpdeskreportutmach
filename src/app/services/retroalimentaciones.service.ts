import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Retroalimentacion } from '../interface/retroalimentacion';

@Injectable({
  providedIn: 'root'
})
export class RetroalimentacionesService {

  servidor = "https://api-proyweb.onrender.com";

  constructor(private servicio:HttpClient) { }

  MostrarPuntuaciones():Observable<any> {
    return this.servicio.get(`${this.servidor}/api/puntuaciones`);
  }

  CrearPuntuacion(numero:any): Observable<any> {
    let puntuacion2: Retroalimentacion = { puntuacion: 0 };
    puntuacion2.puntuacion = numero;
    return this.servicio.post(`${this.servidor}/api/puntuacion`, puntuacion2);
  }
}
