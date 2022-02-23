import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  tipoUsuario:boolean;
  constructor( private router:Router) { }

  ngOnInit() {
    var user = localStorage.getItem('user');
    if(user != null){
      let userDetail =JSON.parse(user);
      if(userDetail.nombre == "Empleado"){
        this.tipoUsuario =true;
      }else{
        this.tipoUsuario= false;
      }
    }else{
      this.router.navigate(["login"]);
    } 
  }

  logout(){
    this.router.navigate(["login"]);
    localStorage.removeItem('user');
  }


  jugador: boolean= true;
  empezarJuego: boolean = true;
  mensaje:String= "Precione el boton para iniciar un juego.";
  jugarNuevamente:boolean = false;
  jugadorX: number[] = [];
  jugadorO: number[] = [];
  posiblesJuegos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];


  disableBtn1:boolean = true;
  disableBtn2:boolean = true;
  disableBtn3:boolean = true;
  disableBtn4:boolean = true;
  disableBtn5:boolean = true;
  disableBtn6:boolean = true;
  disableBtn7:boolean = true;
  disableBtn8:boolean = true;
  disableBtn9:boolean = true;


  IniciarJuego(){
    this.mensaje="Mucha Suerte!!";
    this.empezarJuego = false;
    this.desbloquearBotones();
  }

  getResp(e,id){
    console.log("event:",e);
    let Clicked = document.getElementById(e.target.getAttribute('id')) as HTMLButtonElement;
    let letra;
    if (this.jugador) {
      letra = "X";
      this.jugadorX.push(id);
      this.coprobrarJuego(this.jugadorX, letra);
    }
    else {
      letra = "O";
      this.jugadorO.push(id);
      this.coprobrarJuego(this.jugadorO, letra);
    }
    Clicked.innerText = letra;
    Clicked.disabled = true;
    this.jugador = !this.jugador;
  }
  

  coprobrarJuego(combinacionJugador: any, letra) {
   
    if (combinacionJugador.length >= 5) {
      this.jugarNuevamente = true;
      this.mensaje="El juego resulto ser un Empate , ¿Deseas jugar nuevamente?"
      this.bloquearBotones();
    }else {
      
      this.posiblesJuegos.map((combinacion) => {
        if ((combinacionJugador.includes(combinacion[0])) && (combinacionJugador.includes(combinacion[1])) && (combinacionJugador.includes(combinacion[2]))) {
          this.mensaje= 'El juego a terminado ganó el jugador ' + letra + "', ¿Deseas jugar nuevamente?";
          this.jugarNuevamente = true;
          this.bloquearBotones();
        }
      })
    }
  }

  jugarDenuevo(){
    this.jugadorO = [];
    this.jugadorX = [];
    this.jugarNuevamente=false;
    this.mensaje="Mucha Suerte!!"
    this.empezarJuego = false;
    this.desbloquearBotones();
    this.limpiar();
  }

  noJugarDenuevo(){
    this.jugarNuevamente=false;
    this.mensaje="Precione el boton para iniciar un juego."
    this.empezarJuego =true;
    this.bloquearBotones();
    this.limpiar();
    this.jugadorO = [];
    this.jugadorX = [];

  }

  limpiar(){
    for (let i = 1; i <= 9; i++) {
      let btn = document.getElementById('' + i) as HTMLButtonElement
      btn.innerText = "";
    }
  }

  bloquearBotones(){
    for (let i = 1; i <= 9; i++) {
      let btn = document.getElementById('' + i) as HTMLButtonElement
      btn.disabled = true;
    }
  }

  desbloquearBotones(){
    for (let i = 1; i <= 9; i++) {
      let btn = document.getElementById('' + i) as HTMLButtonElement
      btn.innerText = "";
      btn.disabled = false;
    }
  }
 

}
