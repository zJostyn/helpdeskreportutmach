import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  servidor = "https://api-proyweb.onrender.com";

  constructor(private servicio:HttpClient) { }

  mostrarReportesAbiertos(): Observable<any> {
    return this.servicio.get(`${this.servidor}/api/reportesab`);
  }

  mostrarReportesAbiertosPorLab(ubicacion:any): Observable<any> {
    return this.servicio.get(`${this.servidor}/api/reportsabpl/` + ubicacion);
  }

  ultimosReportes(usuario:any): Observable<any> {
    return this.servicio.get(`${this.servidor}/api/ultimosreportes/` + usuario);
  }

  mostrarReportes(usuario:any): Observable<any> {
    return this.servicio.get(`${this.servidor}/api/reportesusuario/` + usuario);
  }

  cantidadReportesAbiertos(usuario:any): Observable<any> {
    return this.servicio.get(`${this.servidor}/api/reportesabiertosusuarioc/` + usuario);
  }

  cantidadReportesCerrados(usuario:any): Observable<any> {
    return this.servicio.get(`${this.servidor}/api/reportescerradosusuarioc/` + usuario);
  }

  detallesReporteU(idreporte:any, idusuario:string): Observable<any> {
    return this.servicio.post(`${this.servidor}/api/detallesreporteusuario/` + idreporte, {idusuario});
  }
  
  detallesReporteUSolu(idreporte:any, idusuario:string): Observable<any> {
    return this.servicio.post(`${this.servidor}/api/detallesreporteusuariosolu/` + idreporte, {idusuario});
  }

  detallesReporte(idreporte:string): Observable<any> {
    return this.servicio.post(`${this.servidor}/api/detallesreporte`, {idreporte});
  }

  obtenerNumeroNuevoReporte(): Observable<any> {
    return this.servicio.get(`${this.servidor}/api/numeroreportenuevo`);
  }

  crearReporte(nuevoreporte:any): Observable<any> {
    return this.servicio.post(`${this.servidor}/api/crearreporte`, nuevoreporte);

  }
}
