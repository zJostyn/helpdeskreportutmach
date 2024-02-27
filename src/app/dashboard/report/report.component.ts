import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reporte } from 'src/app/interface/reporte';
import { Solucion } from 'src/app/interface/solucion';
import { Usuario } from 'src/app/interface/usuario';
import { AccesoTokenService } from 'src/app/services/acceso-token.service';
import { ReportesService } from 'src/app/services/reportes.service';
import { SolucionesService } from 'src/app/services/soluciones.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  id: string | null;

  infoUsuario:Usuario[] = [];
  solucionDetalle:Solucion[] = [];
  reporteDetalle:Reporte[] = [];
  estadoReporte:Reporte[] = [];


  constructor(private accesoToken:AccesoTokenService, private arouter:ActivatedRoute,private reportes:ReportesService, private soluciones:SolucionesService){
    this.infoUsuario = this.accesoToken.obtenerInfoToken();
    this.id = this.arouter.snapshot.paramMap.get('id');

  }
ngOnInit(): void {
    this.mostrarDatos();
  }

  mostrarDatos(){
    if(this.infoUsuario[0].idtipousu == '1') {
      this.getReporte();
    } else {
      this.getSolucion();
    }
  }

  getReporte(){
    if(this.id !== null){
      this.reportes.detallesReporte(this.id).subscribe(
        data => this.estadoReporte = data,
        error => console.log(error));
        setTimeout(() => {
          if(this.estadoReporte[0].estadoreporte == 'Abierto') {
            this.reportes.detallesReporteU(this.id, this.infoUsuario[0].idusuario).subscribe(
              data => this.reporteDetalle = data,
              error => console.log(error));
          } else {
            this.reportes.detallesReporteUSolu(this.id, this.infoUsuario[0].idusuario).subscribe(
              data => this.reporteDetalle = data,
              error => console.log(error));
          }
        }, 200);
    }
  }

  getSolucion(){
    if(this.id !== null){
      this.soluciones.detallesSolucion(this.id, this.infoUsuario[0].idusuario).subscribe(
        data => this.solucionDetalle = data,
        error => console.log(error));
    }
  }

  imprimirContenido() {
    const contenidoDiv = document.getElementById('miDiv');

    if (contenidoDiv) {

      const contenidoCopia = contenidoDiv.cloneNode(true) as HTMLElement;

      const ventanaImpresion = window.open('', '_blank');

      if (ventanaImpresion) {
        const fechaActual = new Date().toLocaleString();

        ventanaImpresion.document.write(`
          <html>
            <head>
              <title>Reporte Generado - ${fechaActual}</title>
              <style>
                body {
                  font-size: 23px;
                }
  
                .reports-main {
                  position: relative;
                  top: -20px;
                  left: 600px;
                  width: 700px;
                  height: 520px;
                  background-color: white;
                }
              
                .numeroreporte {
                    position: relative;
                    left: 380px;
                }
                
                .fechareporte {
                    position: relative;
                    left: 20px;
                }
                
                .estadoreporte {
                    position: relative;
                    left: 20px;
                }
                
                .estudiantereporte {
                    position: relative;
                    left: 20px;
                }
                
                .ldescripcion {
                    position: relative;
                    left: 20px;
                }
                
                .descripcion {
                    position: relative;
                    left: 20px;
                }
                
                .levidencia {
                    position: relative;
                    left: 20px;
                }
                
                .evidencia {
                    position: relative;
                    width: 600px;
                    height: 350px;
                    left: 210px;
                    margin-top: 50px;
                }
                
                .descripcion {
                    position: relative;
                    text-align: justify;
                }
                .imprimir {
                  display: none;
                }
                .regresarhome {
                  display: none;
                }

                @page {
                  size: A4 portrait;
                }
              </style>
            </head>
            <body onafterprint="window.close()" onload="window.print()">
        `);
        ventanaImpresion.document.write(contenidoCopia.innerHTML);
        ventanaImpresion.document.write('</body></html>');
        ventanaImpresion.document.close();
      } else {
        console.error('No se pudo abrir la ventana de impresión.');
      }
    }
  }
}
