import { Injectable } from '@angular/core';
import axios from 'axios';
declare var jQuery: any;
@Injectable({
  providedIn: 'root',
})
export class botConfigService {
  constructor() {
    this.getBotData();
  }
  userData: any = {
    name: '',
    description: '',
    urlKey: '',
    address1: '',
    address2: '',
  };
  //Métodos Set 
  setName(name: any) {
    this.userData.name = name;
  }
  setDesc(desc: any) {
    this.userData.description = desc;
  }
  setURLKEY(urlKey: any) {
    this.userData.urlKey = urlKey;
  }
  setLoc1(dir1: any) {
    this.userData.address1 = dir1;
  }
  setLoc2(dir2: any) {
    this.userData.address2 = dir2;
  }
  //Métodos Get 
  getUserData() {
    return this.userData;
  }

  //Extraer datos de la base de datos
  getBotData() {
    //axios
    let apiUrl = 'botConfig/getInfo';
    let send = {
      idBot: localStorage.getItem('idBot'),
    };
    axios
      .post(apiUrl, send)
      .then((response) => {
        console.log(response.data);
        this.userData = response.data[0];
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  //Guardar la nueva configuración
  setConfig() {
    //axios
    let apiUrl = 'botConfig/updateBotInfo';
    let send = {
      idBot: localStorage.getItem('idBot'),
      name: this.userData.name,
      description: this.userData.description,
      urlKey: this.userData.urlKey,
      address1: this.userData.address1,
      address2: this.userData.address2,
    };
    axios
      .post(apiUrl, send)
      .then((response) => {
        // this.id = response.data.id;
        console.log(response.data);
        jQuery('.success').empty();
        jQuery('.success').append(
          'Se modificó la configuración del bot correctamente'
        );
        jQuery('.success').fadeIn().delay(3200).fadeOut(300);
      }).catch((error)=>{
        jQuery(".error").empty();
        jQuery(".error").append(error.response.data.error);
        jQuery(".error").fadeIn().delay(3200).fadeOut(300);
        return error;
      });
  }
}
