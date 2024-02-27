import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Detalledaño } from 'src/app/interface/detalledaño';
import { Reporte } from 'src/app/interface/reporte';
import { Solucion } from 'src/app/interface/solucion';
import { Tipodaño } from 'src/app/interface/tipodaño';
import { Ubicacion } from 'src/app/interface/ubicacion';
import { Usuario } from 'src/app/interface/usuario';
import { AccesoTokenService } from 'src/app/services/acceso-token.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { ReportesService } from 'src/app/services/reportes.service';
import { SolucionesService } from 'src/app/services/soluciones.service';
import { TiposdañosService } from 'src/app/services/tiposdaños.service';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit{
  
  sidenav!: MatSidenav;
  
  reportesUsuario:Reporte[] = [];
  infoUsuario:Usuario[] = [];

  solucionesEncargado:Solucion[] = [];

  reporteDetalle:Reporte[] = [];

  tipoDanios:Tipodaño[] = [];
  detallesDanios:Detalledaño[] = [];
  detallesDaniosVacio:Detalledaño[] = [];
  lugarLaboratorios:Ubicacion[] = [];
  tiempoDanio:any;
  
  btnAnteriorVisible: boolean = false;


  selectedFile: File | null = null;

  numeroNuevoReporte:string = "";

  nuevoReporteForm = new FormGroup({
    idusuario : new FormControl(this.accesoToken.obtenerInfoToken()[0].idusuario, Validators.required),
    idequipo : new FormControl('', Validators.required),
    idubicacion : new FormControl('', Validators.required),
    iddetalledanio : new FormControl('', Validators.required),
    idestadoreporte : new FormControl('1', Validators.required),
    fecha : new FormControl(this.obtenerFecha(), Validators.required),
    descripcion : new FormControl('', Validators.required),
    evidencia : new FormControl('', Validators.required),
  });

  constructor(private accesoToken:AccesoTokenService, private reportes:ReportesService, private soluciones:SolucionesService, private tipodaño:TiposdañosService, private ubicaciones:UbicacionesService, private imagenes:ImagenesService){
    this.infoUsuario = this.accesoToken.obtenerInfoToken();
  }
  
  ngOnInit(): void {
    this.mostrarCosas();
    this.mostrarImagen();
    this.llenarTiposDaños();
    this.llenarLaboratorios();
    this.llenarNumeroReporteNuevo();
    this.funcionarImagenRadioButtons();
    this.tiempoAprox();
  }

  mostrarCosas() {
    if(this.infoUsuario[0].idtipousu == '1') {
      this.mostrarReportesU();
    } else {
      this.mostrarSolucionesE();
    }
  }

  mostrarReportesU():any {
    this.reportes.mostrarReportes(this.infoUsuario[0].idusuario).subscribe(
      data => this.reportesUsuario = data,
      error => console.log(error)
    )
  }

  mostrarSolucionesE():any {
    this.soluciones.mostrarReportesSolucionadosEncargado(this.infoUsuario[0].idusuario).subscribe(
      data => this.solucionesEncargado = data,
      error => console.log(error)
    )
  }

  mostrarotroboton(valor:any) {
    if(valor == "btnsiguiente") {
      this.btnAnteriorVisible = true;
    } else {
      setTimeout(() => {
        this.btnAnteriorVisible = false;
      }, 10);
    }
  }

  obtenerFecha() {
    const fechaActual = new Date();
    // Para obtener solo la fecha actual en formato ISO (YYYY-MM-DD)
    const fechaSolo = fechaActual.toISOString().split('T')[0];
    return fechaSolo;
  }

  llenarNumeroReporteNuevo() {
    this.reportes.obtenerNumeroNuevoReporte().subscribe(
      data => this.numeroNuevoReporte = data[0].idreporte,
      error => console.log(error)
    )
  }

  obtenerNumero() {
    const numero = this.numeroNuevoReporte;
    return numero;
  }

  funcionarImagenRadioButtons(){
    const imgMonitor = document.getElementById('imgMonitor') as HTMLInputElement;
    const imgTeclado = document.getElementById('imgTeclado') as HTMLInputElement;
    const imgMouse = document.getElementById('imgMouse') as HTMLInputElement;
    const imgCPU = document.getElementById('imgCPU') as HTMLInputElement;

    const radioMonitor = document.getElementById('radioMonitor') as HTMLInputElement;
    const radioTeclado = document.getElementById('radioTeclado') as HTMLInputElement;
    const radioMouse = document.getElementById('radioMouse') as HTMLInputElement;
    const radioCPU = document.getElementById('radioCPU') as HTMLInputElement;

    imgMonitor.addEventListener('click', () => {
        radioMonitor.checked = true;
        this.nuevoReporteForm.get('idequipo')?.setValue(radioMonitor.value);
    });

    imgTeclado.addEventListener('click', () => {
        radioTeclado.checked = true;
        this.nuevoReporteForm.get('idequipo')?.setValue(radioTeclado.value);
    });

    imgMouse.addEventListener('click', () => {
        radioMouse.checked = true;
        this.nuevoReporteForm.get('idequipo')?.setValue(radioMouse.value);
    });

    imgCPU.addEventListener('click', () => {
        radioCPU.checked = true;
        this.nuevoReporteForm.get('idequipo')?.setValue(radioCPU.value);
    });
  }

  llenarLaboratorios() {
    this.ubicaciones.mostrarUbicaciones().subscribe(
      data => this.lugarLaboratorios = data,
      error => console.log(error)
    )
  }

  llenarTiposDaños() {
    this.tipodaño.mostrarTiposDaños().subscribe(
      data => this.tipoDanios = data,
      error => console.log(error)
    )
  }

  llenarDetallesDaño(idtipodanio:any) {
    this.tipodaño.mostrarDetallesDaño(idtipodanio).subscribe(
      data => this.detallesDanios = data,
      error => this.detallesDanios = this.detallesDaniosVacio
    )
  }

  mostrarUbicaciones() {
    const ubicacion = document.getElementById('ubicacion') as HTMLInputElement;
      let elementos = '<option selected disables> Seleccione una opción</option>'
      for (let i = 0; i < this.lugarLaboratorios.length; i++) {
        elementos += '<option value = "' + this.lugarLaboratorios[i].idubicacion+ '">' + this.lugarLaboratorios[i].lugarubi + '</option>';
    }
    ubicacion.innerHTML = elementos;
    ubicacion.addEventListener('change', (event) => {
      console.log(ubicacion.value);
      const imgMonitor = document.getElementById('imgMonitor') as HTMLInputElement;
      const imgTeclado = document.getElementById('imgTeclado') as HTMLInputElement;
      const imgMouse = document.getElementById('imgMouse') as HTMLInputElement;
      const imgCPU = document.getElementById('imgCPU') as HTMLInputElement;
      if(ubicacion.value == '7') {
        let imgmon = 'assets/img/Impresora 3D.jpg';
        imgMonitor.src = imgmon;
        imgMonitor.value = '5';
        let imgtecla = 'assets/img/IDL-800.jpg';
        imgTeclado.src = imgtecla;
        imgTeclado.value = '6';
        let imgmous = 'assets/img/Digital Trainer.jpg';
        imgMouse.src = imgmous;
        imgMouse.value = '7';
        let imgcp = 'assets/img/Proyector Electronica.jpg';
        imgCPU.src = imgcp;
        imgCPU.value = '8';
      } else {
        let imgmon = 'assets/img/Monitor Global.jpeg';
        imgMonitor.src = imgmon;
        imgMonitor.value = '1';
        let imgtecla = 'assets/img/Teclado Global.jpeg';
        imgTeclado.src = imgtecla;
        imgMonitor.value = '2';
        let imgmous = 'assets/img/Mouse Global.jpeg';
        imgMouse.src = imgmous;
        imgMonitor.value = '3';
        let imgcp = 'assets/img/CPU Global.jpeg';
        imgCPU.src = imgcp;
        imgCPU.value = '4';
      }
    });
  }

  mostrarTipos() {
    const tipodaño = document.getElementById('tipodaño') as HTMLInputElement;
    const subtipodaño = document.getElementById('subtipodaño') as HTMLInputElement;
      let elementos = '<option selected disables> Seleccione una opción</option>'
      for (let i = 0; i < this.tipoDanios.length; i++) {
        elementos += '<option value = "' + this.tipoDanios[i].idtipodanio + '">' + this.tipoDanios[i].tipodanio + '</option>';
    }

    let elemento = '<option selected disables> Seleccione una opción</option>'
      tipodaño.innerHTML = elementos;
      subtipodaño.innerHTML = elemento;
  }

  mostrarDetalles() {
    const tipodaño = document.getElementById('tipodaño') as HTMLInputElement;
    const subtipodaño = document.getElementById('subtipodaño') as HTMLInputElement;    
    tipodaño.addEventListener('change', (event) => {
      this.llenarDetallesDaño(tipodaño.value);
      setTimeout(() => {
        let elementos = '<option selected disables> Seleccione una opción</option>'
        for (let i = 0; i < this.detallesDanios.length; i++) {
          elementos += '<option value = "' + this.detallesDanios[i].iddetalledanio + '">' + this.detallesDanios[i].detalledanio + '</option>';
      }  
          subtipodaño.innerHTML = elementos;
        }, 100);
    });
  }

  recargarPagina() {
    location.reload();
}

  mostrarPopUp() {
    const showPopupBtn = document.getElementById('informacion') as HTMLInputElement;
    const popup = document.getElementById('popup') as HTMLInputElement;
    const closeBtn = document.getElementById('closeBtn') as HTMLInputElement;
  
      showPopupBtn.addEventListener('click', function () {
          popup.style.display = 'block';
      });
  
      closeBtn.addEventListener('click', function () {
          popup.style.display = 'none';
      });
      const prevBtn = document.getElementById('prevBtn') as HTMLInputElement;
      const nextBtn = document.getElementById('nextBtn') as HTMLInputElement;
      const carousel = document.querySelector('.carousel') as HTMLInputElement;
      const images = carousel.querySelectorAll('img');
      let currentImageIndex = 0;
  
      closeBtn.addEventListener('click', function () {
          popup.style.display = 'none';
      });
  
      function showImage(index:any) {
          images.forEach((img, i) => {
              img.style.display = i === index ? 'block' : 'none';
          });
      }
  
      function prevImage() {
          currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
          showImage(currentImageIndex);
      }
  
      function nextImage() {
          currentImageIndex = (currentImageIndex + 1) % images.length;
          showImage(currentImageIndex);
      }
  
      prevBtn.addEventListener('click', prevImage);
      nextBtn.addEventListener('click', nextImage);
    }

  mostrarImagen() {
    const seleccionArchivos = document.getElementById('seleccionArchivos') as HTMLInputElement;
    const imagenPrevisualizacion = document.getElementById('imagenPrevisualizacion') as HTMLImageElement;
    const videoPrevisualizacion = document.getElementById('videoPrevisualizacion') as HTMLVideoElement;
    
    seleccionArchivos.addEventListener('change', (event) => {
      const archivo = (event.target as HTMLInputElement | any).files[0];
    
      if (archivo) {
        if (archivo.type.startsWith('image/')) {
          const objetoURL = URL.createObjectURL(archivo);
          imagenPrevisualizacion.src = objetoURL;
          imagenPrevisualizacion.style.display = 'block';
          videoPrevisualizacion.style.display = 'none'; // Oculta el elemento de video si se muestra actualmente
          videoPrevisualizacion.pause(); // Pausa el video actual si existe
        } else if (archivo.type.startsWith('video/')) {
          const objetoURL = URL.createObjectURL(archivo);
          videoPrevisualizacion.src = objetoURL;
          videoPrevisualizacion.style.display = 'block';
          imagenPrevisualizacion.style.display = 'none'; // Oculta el elemento de imagen si se muestra actualmente
          videoPrevisualizacion.controls = true; // Habilita los controles de reproducción del video
        } else {
          alert('Por favor, selecciona una imagen o video válido.');
          imagenPrevisualizacion.style.display = 'none'; // Oculta la imagen si se muestra actualmente
          videoPrevisualizacion.style.display = 'none'; // Oculta el video si se muestra actualmente
          videoPrevisualizacion.pause(); // Pausa el video actual si existe
        }
      } else {
        imagenPrevisualizacion.style.display = 'none'; // Oculta la imagen si se muestra actualmente
        videoPrevisualizacion.style.display = 'none'; // Oculta el video si se muestra actualmente
        videoPrevisualizacion.pause(); // Pausa el video actual si existe
      }
    });
  }

  limpiarReporteNuevo() {
    this.nuevoReporteForm.reset();
    this.nuevoReporteForm.get('idusuario')?.setValue(this.accesoToken.obtenerInfoToken()[0].idusuario);
    this.nuevoReporteForm.get('idestadoreporte')?.setValue('1');
    this.nuevoReporteForm.get('fecha')?.setValue(this.obtenerFecha());
    const imagenPrevisualizacion = document.getElementById('imagenPrevisualizacion') as HTMLImageElement;
    const videoPrevisualizacion = document.getElementById('videoPrevisualizacion') as HTMLVideoElement;
      imagenPrevisualizacion.src = "";
      videoPrevisualizacion.src = "";
      imagenPrevisualizacion.style.display = 'none';
      videoPrevisualizacion.style.display = 'none';
  }

  enviarNuevoReporte(form:any) {
    console.log(form);
    if(form.idusuario != '' && form.idequipo != '' && form.idubicacion != '' && form.iddetalledanio != '' && form.idestadoreporte != '' && form.fecha != '' && form.descripcion != '') {
      this.crearReporte(form);
    } else {
      this.mostrarMensajeError();
      this.limpiarReporteNuevo();
    }
  }
  
  tiempoAprox() {
    const tipoDanio = document.getElementById('tipodaño') as HTMLSelectElement;
    const tiempotipo = document.getElementById('tiempotipo') as HTMLElement;
    tipoDanio.addEventListener('change', () => {
      const valortipo = parseInt(tipoDanio.value);
      const numeroAleatorio = Math.floor(Math.random() * 50) + 1 + 10;
      const numeroAleatorio2 = Math.floor(Math.random() * 5) + 2;
      if(valortipo > 3) {
        const tiempodef = valortipo * 1 + numeroAleatorio2;
        tiempotipo.innerText = "Tiempo aprox. " + tiempodef + ":" + numeroAleatorio +"h"
      } else {
          const tiempodef = valortipo + numeroAleatorio2 * 9;
          tiempotipo.innerText = "Tiempo aprox. " + tiempodef + ":" + numeroAleatorio +"h"
      }
    });
  }

  mostrarMensajeExitoso() {
    const mensajeExito = document.getElementById("mensajeExito") as HTMLElement;
  
    mensajeExito.style.display = "block";
  
    setTimeout(function() {
      mensajeExito.style.display = "none";
    }, 1000);
  }

  mostrarMensajeError() {
    const mensajeError = document.getElementById("mensajeError") as HTMLElement;

    mensajeError.style.display = "block";
  
    setTimeout(function() {
      mensajeError.style.display = "none";
    }, 1000);
  }

  crearReporte(nuevoreporte:any) {
    if (this.selectedFile) {
          this.imagenes.uploadImage(this.selectedFile).subscribe(response => {
            let ruta = 'https://api-proyweb.onrender.com/get-image';
            ruta += response;
            nuevoreporte.evidencia = ruta;
            console.log(nuevoreporte);
            this.reportes.crearReporte(nuevoreporte).subscribe
            ((data) => {
              this.mostrarMensajeExitoso();
              setTimeout(() => {
                this.recargarPagina();
              }, 600);
              console.log(data.message);
            }, 
            (error) => {
              console.log(error.error.message)
            } 
          )
       });
    } else {
      this.mostrarMensajeError();
      this.limpiarReporteNuevo();
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  
  
}
