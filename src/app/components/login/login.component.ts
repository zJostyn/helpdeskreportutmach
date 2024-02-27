import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/services/usuarios.service';
import { AccesoTokenService } from 'src/app/services/acceso-token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm = new FormGroup({
    email : new FormControl('', Validators.required),
    pass : new FormControl('', Validators.required)
  })

  constructor(private accesoToken:AccesoTokenService, private servicioUsuario:Usuarios, private router:Router, private toastr: ToastrService) {}
  
  ngOnInit(): void {
    this.accesoToken.verificarTokenLogin();
  }


  ingresar(form:any){
    if(form.email != '' && form.pass != '') {
      this.servicioUsuario.verificarUsuario(form).subscribe
      ((data) => {
        this.mostrarMensajeExitoso();
        this.accesoToken.crearToken(data);
      }, 
      (error) => {
        console.log(error.error.message)
      } 
    )
    } else {
      this.mostrarMensajeError();
    }
}

  mostrarMensajeExitoso() {
    const mensajeExito = document.getElementById("mensajeExito") as HTMLElement;
  
    mensajeExito.style.display = "block";
  
    setTimeout(function() {
      mensajeExito.style.display = "none";
    }, 1500);
  }

  mostrarMensajeError() {
    const mensajeError = document.getElementById("mensajeError") as HTMLElement;

    mensajeError.style.display = "block";
  
    setTimeout(function() {
      mensajeError.style.display = "none";
    }, 1500);
  }
}