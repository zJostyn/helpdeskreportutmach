import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SolucionesService {

  servidor = "https://api-proyweb.onrender.com";

  constructor(private servicio:HttpClient) { }

  mostrarReportesSolucionadosEncargado(encargado:any): Observable<any> {
    return this.servicio.get(`${this.servidor}/api/solucionesen/` + encargado);
  }

  ultimasSoluciones(encargado:any): Observable<any> {
    return this.servicio.get(`${this.servidor}/api/ultimassolucionesen/` + encargado);
  }

  cantidadSolucionesLogradas(encargado:any): Observable<any> {
    return this.servicio.get(`${this.servidor}/api/solucioneslogradasen/` + encargado);
  }

  cantidadSolucionesNoLogradas(encargado:any): Observable<any> {
    return this.servicio.get(`${this.servidor}/api/solucionesnologradasen/` + encargado);
  }

  detallesSolucion(idreporte:string, idencargado:string): Observable<any> {
    return this.servicio.post(`${this.servidor}/api/detallessolucionencargado/` + idreporte, {idencargado});
  }

  crearSolucion(solucion:any): Observable<any> {
    return this.servicio.post(`${this.servidor}/api/crearsolucion`, solucion);
  }
}