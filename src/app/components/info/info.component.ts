import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {

  informacion:informacioni[] = [
    {
      nombre: "Manuel Medardo Pacheco Gonzalez",
      github: "https://github.com/mpacheco5",
      frase: "No es cafe, ni tequila, es tu codigo que no compila.",
      img: "assets/img/manuelpacheco.jpeg",
    },
    {
      nombre: "Gabriel Alexander Carangui Nagua",
      github: "https://github.com/Natsuki62342",
      frase: "El arte de programar puede volver tus sueños en realidad.",
      img: "assets/img/gabrielcarangui.jpeg",
    },
    {
      nombre: "Elkin Alexander Morocho Belduma",
      github: "https://github.com/ElkinMorocho",
      frase: "Un programador al nacer no llora, dice Hola Mundo.",
      img: "assets/img/elkinmorocho.jpeg",
    },
    {
      nombre: "Jostyn Juan Cruz Quito",
      github: "https://github.com/zJostyn",
      frase: "Incluso cuando te tomas unas vacaciones de la tecnología, la tecnología no se toma un descanso de ti.",
      img: "assets/img/jostyncruz.png",
    },
    {
      nombre: "Blade Steven Masache Carrera",
      github: "https://github.com/Blaster1001",
      frase: "Compila y no se por qué, no compila y no se por qué.",
      img: "assets/img/blademasache.jpeg",
    }
  ]

}

export interface informacioni {
  nombre: string;
  github: string;
  frase: string;
  img: string;
}