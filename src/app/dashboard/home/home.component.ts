import { Component, OnInit } from '@angular/core';
import { Reporte } from 'src/app/interface/reporte';
import { Solucion } from 'src/app/interface/solucion';
import { Usuario } from 'src/app/interface/usuario';
import { AccesoTokenService } from 'src/app/services/acceso-token.service';
import { ReportesService } from 'src/app/services/reportes.service';
import { SolucionesService } from 'src/app/services/soluciones.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  infoUsuario:Usuario[] = [];

  cantidadReportesA:Object = "";
  cantidadReportesC:Object = "";
  reportesUsuario:Reporte[] = [];
  reporteDetalle:Reporte[] = [];

  cantidadSolucionesL:Object = "";
  cantidadSolucionesNL:Object = "";
  solucionesEncargado:Solucion[] = [];

  constructor(private accesoToken:AccesoTokenService, private reportes:ReportesService, private soluciones:SolucionesService){
    this.infoUsuario = this.accesoToken.obtenerInfoToken();
  }ngOnInit(): void {
    this.mostrarCosas();
  }

  obtenerFecha() {
    const fechaActual = new Date();

    const anioMes = `${fechaActual.toLocaleString('default', { month: 'short' })}-${fechaActual.getFullYear()}`;
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const hora = fechaActual.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

    return [anioMes, dia, hora];
  }

  mostrarCosas() {
    if(this.infoUsuario[0].idtipousu == '1') {
      this.contarReportesAbiertos();
      this.contarReportesCerrados();
      this.mostrarUltimosReportesU();
    } else {
      this.contarSolucionesNoLogradas();
      this.contarSolucionesLogradas();
      this.mostrarUltimasSolucionesE();
    }
  }

  mostrarUltimosReportesU():any {
    this.reportes.ultimosReportes(this.infoUsuario[0].idusuario).subscribe(
      data => this.reportesUsuario = data,
      error => console.log(error)
    )
  }

  mostrarUltimasSolucionesE():any {
    this.soluciones.ultimasSoluciones(this.infoUsuario[0].idusuario).subscribe(
      data => this.solucionesEncargado = data,
      error => console.log(error)
    )
  }

  contarReportesAbiertos() {
    this.reportes.cantidadReportesAbiertos(this.infoUsuario[0].idusuario).subscribe(
      data => this.cantidadReportesA = data[0].count,
      error => console.log(error)
      );
  }

  contarReportesCerrados() {
    this.reportes.cantidadReportesCerrados(this.infoUsuario[0].idusuario).subscribe(
      data => this.cantidadReportesC = data[0].count,
      error => console.log(error)
      );
  }

  contarSolucionesLogradas() {
    this.soluciones.cantidadSolucionesLogradas(this.infoUsuario[0].idusuario).subscribe(
      data => this.cantidadSolucionesL = data[0].count,
      error => console.log(error)
      );
  }

  contarSolucionesNoLogradas() {
    this.soluciones.cantidadSolucionesNoLogradas(this.infoUsuario[0].idusuario).subscribe(
      data => this.cantidadSolucionesNL = data[0].count,
      error => console.log(error)
      );
  }

  verReporte(idreporte:any) {
    this.reportes.detallesReporteU(idreporte, this.infoUsuario[0].idusuario).subscribe(
      data => this.reporteDetalle = data,
      error => console.log(error)
      )
      setTimeout(() => 
        console.log(this.reporteDetalle), 200);
  }

  verSolucion(idsolucion:any, idreporte:any) {
    this.soluciones.detallesSolucion(idsolucion, idreporte).subscribe(
      data => this.reporteDetalle = data,
      error => console.log(error)
      )
      setTimeout(() => 
        console.log(this.reporteDetalle), 200);
  }
    
}
