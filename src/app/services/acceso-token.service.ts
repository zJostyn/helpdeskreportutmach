import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class AccesoTokenService {

  constructor(private router:Router) { }

  Info:Usuario [] = [];

  obtenerInfoToken() {
    this.Info = JSON.parse(localStorage.getItem('tokenusuario') || '{}');
    return this.Info;
  }
  
  verificarTokenLogin() {
    if(localStorage.getItem('tokenusuario')) {
      this.router.navigate(['principal/dashboard/inicio']);
    }
  }

  verificarLogeado() {
    if(!localStorage.getItem('tokenusuario')) {
      this.router.navigate(['login']);
    }
  }

  crearToken(data:any) {
    localStorage.setItem('tokenusuario', JSON.stringify(data));
    setTimeout(() => {
      this.router.navigate(['principal/dashboard/inicio']);
    }, 1100);
  }

  salirToken() {
    localStorage.removeItem('tokenusuario');
    this.router.navigate(['login'])
  }

}
