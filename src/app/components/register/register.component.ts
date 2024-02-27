import { Component, OnInit } from '@angular/core';
import { UserModule } from 'src/app/models/user/user.module';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from 'src/app/services/usuarios.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerForm = new FormGroup({
    nombres : new FormControl('', Validators.required),
    apellidos : new FormControl('', Validators.required),
    idtipousu : new FormControl('1', Validators.required),
    email : new FormControl('', Validators.required),
    pass : new FormControl('', Validators.required),
    avatar : new FormControl('', Validators.required)
  })
  selectedFile: File | null = null;

  constructor(private servicioUsuario:Usuarios,private router:Router, private imagenes:ImagenesService) {
  }

  ngOnInit(): void {
  }

  registrar(form:any) {
    if(form.nombres != '' && form.apellidos != '' && form.email != '' && form.pass != '') {
      const email = {
        email: form.email
      }
      this.servicioUsuario.verificarCorreo(email).subscribe
      ((data) => {
        if (this.selectedFile) {
          this.imagenes.uploadImage(this.selectedFile).subscribe(response => {
            let ruta = 'https://api-proyweb.onrender.com/get-image';
            ruta += response;
            form.avatar = ruta;
            this.servicioUsuario.CrearUsuario(form).subscribe
            ((data) => {
              console.log(data.message);
              this.mostrarMensajeExitoso();
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 1500);
            }, 
            (error) => {
              console.log(error.error.message)
            } 
          )
          });
        } else {
            let ruta = 'https://api-proyweb.onrender.com/get-image/usuario.png';
            form.avatar = ruta;
            this.servicioUsuario.CrearUsuario(form).subscribe
            ((data) => {
              console.log(data.message);
              this.mostrarMensajeExitoso();
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 1500);
            }, 
            (error) => {
              console.log(error.error.message)
            } 
          )
        }
      }, 
      (error) => {
        this.mostrarMensajeErrorCorreo();
      } 
    )

    } else {
      this.mostrarMensajeError();
      this.mostrarDatosVacios();
    }

}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
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

  mostrarMensajeErrorCorreo() {
    const mensajeError = document.getElementById("mensajeErrorCorreo") as HTMLElement;

    mensajeError.style.display = "block";
  
    setTimeout(function() {
      mensajeError.style.display = "none";
    }, 1000);
  }

  mostrarDatosVacios() {
    const datovacio = document.getElementById("datosvacios") as HTMLElement;

    const nombres = document.getElementById("nombres") as HTMLInputElement;
    const nombresvacios = document.getElementById("nombresvacios") as HTMLElement;
    
    const apellidos = document.getElementById("apellidos") as HTMLInputElement;
    const apellidosvacios = document.getElementById("apellidosvacios") as HTMLElement;

    const email = document.getElementById("email") as HTMLInputElement;
    const emailvacio = document.getElementById("emailvacio") as HTMLElement;

    const pass = document.getElementById("pass") as HTMLInputElement;
    const passvacia =  document.getElementById("passvacia") as HTMLElement;
        datovacio.style.display = "block";

    if(nombres.value == '') {
      nombresvacios.style.display = "block";
    } else {
      nombresvacios.style.display = "none";
    }
    
    if(apellidos.value == '') {
      apellidosvacios.style.display = "block";
    } else {
      apellidosvacios.style.display = "none";
    }

    if(email.value == '') {
      emailvacio.style.display = "block";
    } else {
      emailvacio.style.display = "none";
    }

    if(pass.value == '') {
      passvacia.style.display = "block";
    } else {
      passvacia.style.display = "none";
    }

    nombres.addEventListener("input", function(event) {
      nombresvacios.style.display = "none";
    });

    apellidos.addEventListener("input", function(event) {
      apellidosvacios.style.display = "none";
    });

    email.addEventListener("input", function(event) {
      emailvacio.style.display = "none";
    });

    pass.addEventListener("input", function(event) {
      passvacia.style.display = "none";
    });
  }

}
