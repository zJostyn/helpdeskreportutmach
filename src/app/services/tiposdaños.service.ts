import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiposdañosService {

  servidor = "https://api-proyweb.onrender.com";

  constructor(private servicio:HttpClient) { }

  mostrarTiposDaños(): Observable<any> {
    return this.servicio.get(`${this.servidor}/api/tiposdanio`);
  }

  mostrarDetallesDaño(idtipodanio:any): Observable<any> {
    return this.servicio.get(`${this.servidor}/api/detallesdanio/` + idtipodanio);
  }
}
