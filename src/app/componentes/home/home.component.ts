import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tipoUsuario:boolean;
  constructor( private router:Router) { }
  usuario:String;
  ngOnInit() {
    var user = localStorage.getItem('user');
    if(user != null){
      console.log("home->",user);
      let userDetail =JSON.parse(user);
      if(userDetail.nombre == "Empleado"){
        this.tipoUsuario =true;
        console.log(userDetail);
        this.usuario=userDetail.correo;
      }else if(userDetail.nombre == "Jugador"){
        console.log(userDetail);
        this.usuario=userDetail.correo;
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
}
