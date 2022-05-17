import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  hide = true;
  user="";
  password="";
  name="";
  clave="";

  constructor(private service : AppServiceService) { }

  ngOnInit(): void {

  }
  setUsuario(user: any){
    this.user=user.value;
  }
  setPassword(password: any){
    this.password=password.value;
  }
  setClave(clave: any){
    this.clave=clave.value;
  }
  setNombre(name: any){
    this.name=name.value;
  }

  handleSubmit(){
    if(this.user.length>0 && this.password.length>0){
      var json = {
        "email": this.user,
        "password": this.password,
        "secretPassword": this.clave,
        "friendlyName": this.name,
      }
      console.warn(json);
      var apiUrl = '/user/register';
      axios.post(apiUrl, json).then((response) =>{
        console.log(response);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        return response;
      }).catch((error)=>{
        console.log(error);
        return error;
      });
    }
    else{
      console.warn("Campos Vacios");
    }
  }
}
