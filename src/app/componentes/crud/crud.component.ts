import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumoService ,userInterface2 } from 'src/app/services/consumo.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  tipoUsuario:boolean;
  option:boolean =true;
  constructor(private consumir:ConsumoService , private router:Router) { }

  ngOnInit() {
    this.listarUsuarios();
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

  list: userInterface2[] = [];
  foto = [];
  userData : userInterface2={
    brm: "",
    puesto: "",
    id: 0,
    nombre: "",
    foto: ""
  }
  end:number=5;
  init:number=0;
  max:number=0;
  display:String="none";


  listarUsuarios(){
    this.consumir.getUsers().subscribe(
      res=>{
        this.list=<any>res;
        //console.log("lista",this.list);
        this.max= this.list.length;
        console.log(this.max);
        if(this.max>5){
          this.display="block";
        }else{
          this.display="none";
        }
      },
      err=>console.log("error->",err)
    )
  }

  registrarUsuario(){
    let user= {
      brm:this.userData.brm,
      foto:this.userData.puesto,
      nombre:this.userData.nombre,
      puesto:this.userData.foto
    }

    this.consumir.addUser(user).subscribe(
      res=>{
        this.userData={
          brm:"",
          foto:"",
          nombre:"",
          puesto:""
        }
        this.listarUsuarios();
      },
      err=>console.log("error->",err)
    )
  }


  eliminar(id:any){
    this.consumir.deleteUser(id).subscribe(
      res=>{
        this.listarUsuarios();
      },
      err=>console.log("error->",err)
    )
  }

  cargandoImagen(event:any){
    this.userData.foto=event.target.files[0].name;
	}

  clickNextPage(){
    if(this.end < this.max){
      this.init= this.init +5;
      this.end= this.end+5;
    }
  }

  clickAfterPage(){
    if(this.init > 0){
      this.init= this.init -5;
      this.end= this.end-5;
    }
  }


  
  editar(id:any){
    //console.log(id);
    this.option=false;
    this.consumir.getDetailById(id).subscribe(
      res=>{
        //console.log(res);
      
        this.userData=res;
      
      },
      err=>console.log("error->",err)
    )
  }

  actualizar(){
    this.consumir.udpateUser(this.userData.id,this.userData).subscribe(
      res=>{
        this.userData={
          brm:"",
          foto:"",
          nombre:"",
          puesto:""
        }
        setTimeout(() => {
          this.option=true;
          this.listarUsuarios()
        }, 1000);
      
      },
      err=>console.log("error->",err)
    )
  }
}
