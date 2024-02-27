import { Router } from '@angular/router';

import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {BreakpointObserver} from '@angular/cdk/layout'
import { AccesoTokenService } from '../services/acceso-token.service';
import { Usuario } from '../interface/usuario';
import { RetroalimentacionesService } from '../services/retroalimentaciones.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  infoUsuario:Usuario[] = [];

  mostrarVentana: boolean = false;
  puntuacionSeleccionada: number = 0;

  constructor(private accesoToken:AccesoTokenService, private router:Router, private observer: BreakpointObserver, private cd:ChangeDetectorRef, private puntuaciones:RetroalimentacionesService ) {
  }
  ngOnInit(): void {
    this.accesoToken.verificarLogeado();
    this.infoUsuario = this.accesoToken.obtenerInfoToken();
  }

  ngAfterViewInit(){
    this.observer.observe(['(max-width: 800px)']).subscribe((resp: any) => {
      if(resp.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    })
    this.cd.detectChanges();
  } 

  Salir(){
    this.accesoToken.salirToken();
  }

  mostrarModal() {
    this.mostrarVentana = true;
    setTimeout(() => {
      this.cambiarColor();
    }, 200);
  }

  cerrarModal() {
    this.mostrarVentana = false;
  }

  cambiarColor() {
    const estrellas = document.querySelectorAll(".puntuacion");

    estrellas.forEach((estrella, index) => {
      estrella.addEventListener("click", () => {
        for (let i = 0; i <= index; i++) {
          const estrellaElement = estrellas[i] as HTMLElement; // Aseguramos el tipo
          estrellaElement.style.backgroundColor = "gold";
        }

        for (let i = index + 1; i < estrellas.length; i++) {
          const estrellaElement = estrellas[i] as HTMLElement; // Aseguramos el tipo
          estrellaElement.style.backgroundColor = "transparent";
        }
      });
    });

  }

  guardarPuntuacion() {
    this.puntuaciones.CrearPuntuacion(this.puntuacionSeleccionada).subscribe(
      data => {
        this.cerrarModal();
        setTimeout(() => {
          this.Salir();
        }, 300);
      },
      error => console.log(error)
    );
  }
}
