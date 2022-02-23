import { Component, OnInit } from '@angular/core';
import {ConsumoService} from '../../services/consumo.service';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo = "";
  password = "";
  paswordEncriptado="";

  constructor(private consumir:ConsumoService, private router:Router) { }

  ngOnInit() {
    var user = localStorage.getItem('user');
    if(user != null){
      this.router.navigate(["home"]);
    }else{
      this.router.navigate(["login"]);
    } 
  }
  
  title = 'app-user';

  login:boolean = false;
  personType:boolean = false;
  name:String ="";

  logout(){
    this.login=false;
    this.name="";
  }

  loginUser() {
    if(this.correo == "" || this.password == ""){
      alert("El correo y contraseña son requeridos");
      return
    }
    
    this.consumir.findUserByCorreo(this.correo).subscribe(
      res=>{
        if(res !== undefined && res !== null){
          
          let bytes  = CryptoJS.AES.decrypt(res.password, 'secret key 123');
          let originalText = bytes.toString(CryptoJS.enc.Utf8);
          if(originalText == this.password){
            alert("login correcto , perfil:"+res.nombre);
            if("Empleado" === res.nombre){
              
              this.personType =true;
            }else{
              this.personType=false;
            }
            this.login=true;
            this.router.navigate(["home"]);
            localStorage.setItem('user', JSON.stringify(res));
          }else{
            alert("error en datos de acceso");
          }
        }else{
          alert("error en datos de acceso");
        }
      },
      err=>console.log("error->",err)
    )
  }
}
