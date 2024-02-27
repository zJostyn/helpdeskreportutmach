import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Reporte } from 'src/app/interface/reporte';
import { Solucione } from 'src/app/interface/solucione';
import { Ubicacion } from 'src/app/interface/ubicacion';
import { Usuario } from 'src/app/interface/usuario';
import { AccesoTokenService } from 'src/app/services/acceso-token.service';
import { ReportesService } from 'src/app/services/reportes.service';
import { SolucionesService } from 'src/app/services/soluciones.service';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.css']
})
export class SolutionsComponent implements OnInit {

  solutionForm = new FormGroup({
    idreporte : new FormControl('', Validators.required),
    estudiante : new FormControl('', Validators.required),
    estadosolucion : new FormControl('', Validators.required),
    encargado : new FormControl('', Validators.required),
    fecha : new FormControl('', Validators.required),
    descripcion : new FormControl('', Validators.required),
  })

  reportesUsuario:Reporte[] = [];
  infoUsuario:Usuario[] = [];
  reporteDetalle:Reporte[] = [];
  lugarLaboratorios:Ubicacion[] = [];


  constructor(private accesoToken:AccesoTokenService, private reportes:ReportesService, private ubicaciones:UbicacionesService, private soluciones:SolucionesService,private formBuilder:FormBuilder){
    this.infoUsuario = this.accesoToken.obtenerInfoToken();
    this.llenarLaboratorios();
    this.solutionForm = this.formBuilder.group({
      idreporte: ['#', Validators.required],
      estudiante: ['', Validators.required],
      estadosolucion: ['seleccione', Validators.required], // Establece 'seleccione' como valor predeterminado
      encargado: ['', Validators.required],
      fecha: [this.obtenerFecha(), Validators.required],
      descripcion: ['', Validators.required],
    });
    
  }ngOnInit(): void {
    setTimeout(() => {
      this.mostrarUbicaciones();
      this.mostrarReportesAbiertos();
    }, 120);
  }
  
  obtenerFecha() {
    const fechaActual = new Date();
    // Para obtener solo la fecha actual en formato ISO (YYYY-MM-DD)
    const fechaSolo = fechaActual.toISOString().split('T')[0];
    return fechaSolo;
  }

  mostrarReportesAbiertos():any {
    this.reportes.mostrarReportesAbiertos().subscribe(
      data => this.reportesUsuario = data,
      error => console.log(error)
    )
  }

  mostrarReportesAbiertosPorLab(ubicacion:any):any {
    this.reportes.mostrarReportesAbiertosPorLab(ubicacion).subscribe(
      data => this.reportesUsuario = data,
      error => console.log(error)
    )
  }

  verReporte(idreporte:any) {
    this.reportes.detallesReporte(idreporte).subscribe(
      data => this.reporteDetalle = data,
      error => console.log(error)
      )
      setTimeout(() => 
        console.log(this.reporteDetalle), 200);
  }

  darSolucion(idreport:string, estudiant:string, estadosolu:string, encarg:string, fech:string, desc:string){
    this.solutionForm.setValue({
      idreporte: idreport,
      estudiante: estudiant,
      estadosolucion: estadosolu,
      encargado: encarg,
      fecha: fech,
      descripcion: desc,
  })
  }

  crearSolucion(nuevaSolucion:any) {
    this.soluciones.crearSolucion(nuevaSolucion).subscribe(
    (data) => {
        this.mostrarMensajeExitoso();
        console.log(data.message);
      }, 
      (error) => {
        this.mostrarMensajeError();
        console.log(error.error.message)
      } 
    )
  }

  recargarPagina() {
    location.reload();
}

mostrarMensajeExitoso() {
  const mensajeExito = document.getElementById("mensajeExito") as HTMLElement;

  mensajeExito.style.display = "block";

  setTimeout(function() {
    mensajeExito.style.display = "none";
  }, 1300);
}

mostrarMensajeError() {
  const mensajeError = document.getElementById("mensajeError") as HTMLElement;

  mensajeError.style.display = "block";

  setTimeout(function() {
    mensajeError.style.display = "none";
  }, 1300);
}

solucionar(form:any){
    const solucion:Solucione = {
        idreporte: form.idreporte,
        idencargado: this.infoUsuario[0].idusuario,
        idestadosolucion: form.estadosolucion,
        fecha: form.fecha,
        descripcions: form.descripcion
      };
    if(solucion.idreporte != '' && solucion.idencargado != '' && solucion.idestadosolucion != '' && solucion.fecha != '' && solucion.descripcions != '') {
      this.crearSolucion(solucion);
      setTimeout(() => {
        this.recargarPagina();
      }, 800);
    } else {
      this.mostrarMensajeError();
    }
  }

  llenarLaboratorios() {
    this.ubicaciones.mostrarUbicaciones().subscribe(
      data => this.lugarLaboratorios = data,
      error => console.log(error)
    )
  }

  mostrarUbicaciones() {
    const ubicacion = document.getElementById('ubicacion') as HTMLInputElement;
      let elementos = ubicacion.innerHTML;
      for (let i = 0; i < this.lugarLaboratorios.length; i++) {
        elementos += '<option value = "' + this.lugarLaboratorios[i].idubicacion+ '">' + this.lugarLaboratorios[i].lugarubi + '</option>';
    }
    ubicacion.innerHTML = elementos;
    ubicacion.addEventListener('change', (event) => {
      if (ubicacion.value == 'seleccione') {
        this.mostrarReportesAbiertos();
      } else {
        this.mostrarReportesAbiertosPorLab(ubicacion.value);
      }
    });
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
              .reportesgrid {
                width: 680px;
            }
            
            .titulo-main {
                position: relative;
                color: black;
                left: 290px;
                top: -10px;
                font-size: 30px;
            }

              .reports-main {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                width: 1200px;
                margin-left: 70px;
            }
            
            .card {
                position: relative;
                width: 310px;
                height: 200px;
                margin-right: 20px;
                top: -116px;
                margin-top: 110px;
            }
            
            .card .reporte .titulo {
                position: relative;
                margin-top: 5px;
                left: 45px;
                font-weight: bold;
            }
            
            .card .reporte .estado {
                position: relative;
                margin-bottom: 4px;
                font-style: italic;
                top: 20px;
                left: -135px;
            }
            
            .card .reporte .abierto {
                position: relative;
                top: -18px;
                left: 310px;
                font-size: 16px;
                color: green;
            }
            
            .card .reporte .fecha {
                position: relative;
                margin-bottom: 4px;
                font-style: italic;
                left: -10px;
                top: 20px;
            }
            
            .card .reporte img {
                width: 270px;
                left: 20px;
                align-content: center;
                height: 150px;
                margin-top: 35px;
                margin-bottom: 5px;
            }

            .darsolu { 
              display: none;
            }

            .detalles {
              display: none;
            }
            
            .filtrado {
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

