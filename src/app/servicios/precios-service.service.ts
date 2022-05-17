import { Injectable } from '@angular/core';
import axios from 'axios';
declare var jQuery: any;
@Injectable({
  providedIn: 'root',
})
export class PreciosServiceService {
  preciosLis: any; //CLientes asociados a esta lista
  clientesLis: any; //Productos y precios en esta lista

  JSONPrecios: any = []; //Objeto que se desea subir (Precios)
  JSONClientes: any = []; //Objeto que se desea subir (Clientes)

  constructor() {
    this.setClientes();
    this.setProductos();
  }
  //Determina si un JSON es válido antes de subirlo  
  isJsonValid(MyJSON: any) {
    try {
      let jsonObj = JSON.parse(MyJSON);
    } catch (e) {
      return false;
    }
    return true;
  }

  /*
   _____       _     _     _       
  / ____|     | |   (_)   | |      
 | (___  _   _| |__  _  __| | __ _ 
  \___ \| | | | '_ \| |/ _` |/ _` |
  ____) | |_| | |_) | | (_| | (_| |
 |_____/ \__,_|_.__/|_|\__,_|\__,_|
                                   
                                   
*/
  subirPrecios(idbot: any) {
    console.log(this.JSONPrecios);
    if (this.isJsonValid(this.JSONPrecios)) {
      let apiUrl = 'list/registerProducts';

      let jsonObj = JSON.parse(this.JSONPrecios);
      let send = {
        body: jsonObj,
        idList: localStorage.getItem('idList'),
        idBot: idbot,
      };
      console.log(send);
      axios
        .post(apiUrl, send)
        .then((response) => {
          jQuery('.success').empty();
          jQuery('.success').append('Precios subidos correctamente');
          jQuery('.success').fadeIn().delay(3200).fadeOut(300);
          this.setProductos();
          return response;
        })
        .catch((error) => {
          console.log(error);
          jQuery('.error').empty();
          jQuery('.error').append(error.response.data.error);
          jQuery('.error').fadeIn().delay(3200).fadeOut(300);
          return error;
        });
    } else {
      jQuery('.error').empty();
      jQuery('.error').append('El formato del JSON no es valido');
      jQuery('.error').fadeIn().delay(3200).fadeOut(300);
    }
  }
  //------------------------------------------------------
  subirClientes(idbot: any) {
    console.log(this.JSONClientes);
    if (this.isJsonValid(this.JSONClientes)) {
      let apiUrl = 'list/linkPrices';
      let jsonObj = JSON.parse(this.JSONClientes);

      let send = {
        idList: localStorage.getItem('idList'),
        idBot: idbot,
        body: jsonObj,
      };
      axios
        .post(apiUrl, send)
        .then((response) => {
          jQuery('.success').empty();
          jQuery('.success').append('Clientes subidos correctamente');
          jQuery('.success').fadeIn().delay(3200).fadeOut(300);
          this.setClientes();
          return response;
        })
        .catch((error) => {
          jQuery('.error').empty();
          jQuery('.error').append(error.response.data.error);
          jQuery('.error').fadeIn().delay(3200).fadeOut(300);
          return error;
        });
    } else {
      jQuery('.error').empty();
      jQuery('.error').append('El formato del JSON no es valido');
      jQuery('.error').fadeIn().delay(3200).fadeOut(300);
    }
  }

  /*
  ______      _                             _       _            
 |  ____|    | |                           | |     | |           
 | |__  __  _| |_ _ __ __ _  ___ _ __    __| | __ _| |_ ___  ___ 
 |  __| \ \/ / __| '__/ _` |/ _ \ '__|  / _` |/ _` | __/ _ \/ __|
 | |____ >  <| |_| | | (_| |  __/ |    | (_| | (_| | || (_) \__ \
 |______/_/\_\\__|_|  \__,_|\___|_|     \__,_|\__,_|\__\___/|___/
                                                                 
                                                                 
*/

  setClientes() {
    let apiUrl = 'list/getPersonsOfList';

    let json = {
      idList: localStorage.getItem('idList'),
    };
    axios
      .post(apiUrl, json)
      .then((response) => {
        this.clientesLis = response.data;

        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //------------------------------------------------------
  setProductos() {
    let apiUrl = 'list/getProductsOfList';

    let json = {
      idList: localStorage.getItem('idList'),
    };
    axios
      .post(apiUrl, json)
      .then((response) => {
        this.preciosLis = response.data;

        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /*
  ____                              _____        _            
 |  _ \                            |  __ \      | |           
 | |_) | ___  _ __ _ __ __ _ _ __  | |  | | __ _| |_ ___  ___ 
 |  _ < / _ \| '__| '__/ _` | '__| | |  | |/ _` | __/ _ \/ __|
 | |_) | (_) | |  | | | (_| | |    | |__| | (_| | || (_) \__ \
 |____/ \___/|_|  |_|  \__,_|_|    |_____/ \__,_|\__\___/|___/
                                                              
                                                              
*/

  deleteProducto(idList: any, idProd: any) {
    let apiUrl = 'list/deleteProductOfList';
    let send = {
      idList: idList,
      idProduct: idProd,
    };
    axios
      .post(apiUrl, send)
      .then((response) => {
        jQuery('.success').empty();
        jQuery('.success').append('Clientes eliminados correctamente');
        jQuery('.success').fadeIn().delay(3200).fadeOut(300);
        this.setProductos();
        return response;
      })
      .catch((error) => {
        jQuery('.error').empty();
        jQuery('.error').append(error.response.data.error);
        jQuery('.error').fadeIn().delay(3200).fadeOut(300);
        return error;
      });
  }
  //------------------------------------------------------
  deleteCliente(idList: any, idCliente: any) {
    let apiUrl = 'list/deletePersonOfList';
    let send = {
      idList: idList,
      idPerson: idCliente,
    };
    axios
      .post(apiUrl, send)
      .then((response) => {
        jQuery('.success').empty();
        jQuery('.success').append('Clientes eliminados correctamente');
        jQuery('.success').fadeIn().delay(3200).fadeOut(300);
        this.setClientes();
        return response;
      })
      .catch((error) => {
        jQuery('.error').empty();
        jQuery('.error').append(error.response.data.error);
        jQuery('.error').fadeIn().delay(3200).fadeOut(300);
        return error;
      });
  }

  /*
   _____      _   _                
  / ____|    | | | |               
 | |  __  ___| |_| |_ ___ _ __ ___ 
 | | |_ |/ _ \ __| __/ _ \ '__/ __|
 | |__| |  __/ |_| ||  __/ |  \__ \
  \_____|\___|\__|\__\___|_|  |___/
                                   
                                   
*/
  getPrecios() {
    return this.preciosLis;
  }
  getClientes() {
    return this.clientesLis;
  }
  getPreciosJSON() {
    return this.JSONPrecios;
  }
  getClientesJSON() {
    return this.JSONClientes;
  }

  /*
   _____      _   _                
  / ____|    | | | |               
 | (___   ___| |_| |_ ___ _ __ ___ 
  \___ \ / _ \ __| __/ _ \ '__/ __|
  ____) |  __/ |_| ||  __/ |  \__ \
 |_____/ \___|\__|\__\___|_|  |___/
                                   
                                   
*/
  setJSONPre(MyJSON: any) {
    this.JSONPrecios = MyJSON.value;
  }
  setJSONCli(MyJSON: any) {
    this.JSONClientes = MyJSON.value;
  }
}
