import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsumoService {

  private readonly URI = 'https://apiban.herokuapp.com/user/';
  private readonly URI2 = 'https://empresarialappdemo.herokuapp.com/';
  constructor(private httpClient: HttpClient) { }

  findUserByCorreo(correo:String){
    return this.httpClient.get<userInterface>(this.URI+'find/'+correo);
  }
  ///////////////////////////////////////////////////////////////////////////
  getUsers(){
    return this.httpClient.get<userInterface2>(this.URI2+'user/list');
  }

  addUser(user:userInterface2){
    console.log("service->",user);
    return this.httpClient.post<userInterface2>(this.URI2+'user/create',user);
  }
  
  deleteUser(id:number){
    return this.httpClient.delete(this.URI2+'user/delete/'+id);
  }

  getDetailById(id:number){
    return this.httpClient.get<userInterface2>(this.URI2+'user/detail/'+id);
  }

  udpateUser(id:number,user:userInterface2){
    return this.httpClient.put(this.URI2+'user/update/'+id,user);
  }

}

export interface userInterface{
  nombre?:String;
  correo: String;
  password: String;
}

export interface userInterface2{
 
  brm?: String,
  foto?: String,
  nombre?: String,
  puesto?: String,
  id?: number,
}
