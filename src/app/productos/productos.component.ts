import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
declare var jQuery: any;
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  name: any; //Nombre del atributo
  type = 'int'; //Tipo del atributo
  special: any; // Categoría especial del atributo
  idBot: any; //ID del bot actual
  displayTitle = false;
  specialAtt: any[] = []; //Lista de atributos especiales
  JSONProd: any; //Objeto que se desea subir
  jsonObj: any; //JSON validado
  attList: any[] = []; //Lista de atributos
  jsonObjAtt: any; //JSON que despliega el modelo de atributos
  currentStep: any; //Current step for the bot
  currentInstances: any[] = []; //Current clients or products

  constructor(private modalService: NgbModal, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    document.body.classList.remove('nb-theme-default');
    if (localStorage.getItem('token') !== null) {
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${localStorage.getItem('token')}`;
      jQuery('.mainMenu').hide();
      jQuery('.botMenu').css('display', 'flex');
    }
    if (localStorage.getItem('idBot') === null) {
      jQuery('.botBtn').prop('disabled', true);
    }
    this.getCurrentStep();
    this.getAttributes();
    this.getSpecials();
    this.getCurrentInstances();
  }

  //Comprobar que el JSON que se desea subir sea valido antes de subirlo
  isJsonValid() {
    try {
      this.jsonObj = JSON.parse(this.JSONProd);
    } catch (e) {
      return false;
    }
    return true;
  }

  /*

   _____       _     _      
  / ____|     | |   (_)     
 | (___  _   _| |__  _ _ __ 
  \___ \| | | | '_ \| | '__|
  ____) | |_| | |_) | | |   
 |_____/ \__,_|_.__/|_|_|   
                            
                            
*/

  //---Subir el modelo JSON---
  subirJson() {
    if (this.isJsonValid()) {
      let apiUrl = 'instance/uploadInstances';
      let send = {
        body: this.jsonObj,
        addsTo: 1,
        idBot: this.idBot,
      };
      axios
        .post(apiUrl, send)
        .then((response) => {
          jQuery('.success').empty();
          jQuery('.success').append('Instancias subidas correctamente');
          jQuery('.success').fadeIn().delay(3200).fadeOut(300);
          this.getCurrentInstances();
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

  //---Subir un atributo al modelo---
  subir() {
    let apiUrl = 'model/addAttribute';

    let json = {
      name: this.name,
      type: this.type,
      addsTo: 1,
      idSpecial: this.special,
      idBot: this.idBot,
    };

    axios
      .post(apiUrl, json)
      .then((response) => {
        this.getAttributes();
        this.cd.detectChanges();
        jQuery('.success').empty();
        jQuery('.success').append(
          'Se agregó el atributo ' + this.name + ' al modelo'
        );
        jQuery('.success').fadeIn().delay(3200).fadeOut(300);
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
  ____                            
 |  _ \                           
 | |_) | ___  _ __ _ __ __ _ _ __ 
 |  _ < / _ \| '__| '__/ _` | '__|
 | |_) | (_) | |  | | | (_| | |   
 |____/ \___/|_|  |_|  \__,_|_|   
                                  
                                  
*/
  //---Borrar un atributo del modelo---
  deleteAtt(id: any) {
    //llama a delete
    let apiUrl = 'model/deleteAttribute';
    let json = {
      idAttribute: id,
    };
    let delAttName = '';
    axios
      .post(apiUrl, json)
      .then((response) => {
        for (let i = 0; i < this.attList.length; i++) {
          if (this.attList[i].id === id) {
            delAttName = this.attList[i].name;
            this.attList.splice(i, 1);
          }
        }
        jQuery('.success').empty();
        jQuery('.success').append('Se eliminó el atributo ' + delAttName);
        jQuery('.success').fadeIn().delay(3200).fadeOut(300);
        this.setModel();
        this.cd.detectChanges();
        return response;
      })
      .catch((error) => {
        jQuery('.error').empty();
        jQuery('.error').append(error.response.data.error);
        jQuery('.error').fadeIn().delay(3200).fadeOut(300);
        return error;
      });
  }
  deleteInstance(id: any) {
    //llama a delete
    let apiUrl = 'instance/disableInstance';

    let json = {
      getsFrom: 1,
      idBot: this.idBot,
      IdInstance: id,
    };
    axios
      .post(apiUrl, json)
      .then((response) => {
        jQuery('.success').empty();
        jQuery('.success').append('Se eliminó el producto');
        jQuery('.success').fadeIn().delay(3200).fadeOut(300);
        this.getCurrentInstances();
        this.cd.detectChanges();
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
  __  __                  _             _        _____                    
 |  \/  |                (_)           | |      |  __ \                   
 | \  / | __ _ _ __   ___ _  ___     __| | ___  | |__) |_ _ ___  ___  ___ 
 | |\/| |/ _` | '_ \ / _ \ |/ _ \   / _` |/ _ \ |  ___/ _` / __|/ _ \/ __|
 | |  | | (_| | | | |  __/ | (_) | | (_| |  __/ | |  | (_| \__ \ (_) \__ \
 |_|  |_|\__,_|_| |_|\___| |\___/   \__,_|\___| |_|   \__,_|___/\___/|___/
                        _/ |                                              
                       |__/                                               
 */
  //LLamar al paso actual
  getCurrentStep() {
    let apiUrl = 'model/getCurrentStep';
    this.idBot = localStorage.getItem('idBot');
    let json = {
      idBot: this.idBot,
      getFrom: 1,
    };
    axios
      .post(apiUrl, json)
      .then((response) => {
        this.currentStep = response.data.currentStep;
        this.cd.detectChanges();
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  //Mover al siguiente paso
  moveToNextStep() {
    let apiUrl = 'model/moveStep';
    this.idBot = localStorage.getItem('idBot');
    let json = {
      idBot: this.idBot,
      addsTo: 1,
    };
    axios
      .post(apiUrl, json)
      .then((response) => {
        this.currentStep = 1;
        this.cd.detectChanges();
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
 | (___   ___| |_| |_ ___ _ __ ___ 
  \___ \ / _ \ __| __/ _ \ '__/ __|
  ____) |  __/ |_| ||  __/ |  \__ \
 |_____/ \___|\__|\__\___|_|  |___/
                                                                    
*/

  //LLamar al modelo JSON que se muestra en pantalla
  setModel() {
    let apiUrl = 'model/getModelJson';
    this.idBot = localStorage.getItem('idBot');
    let json = {
      idBot: this.idBot,
      getFrom: 1,
    };
    axios.post(apiUrl, json).then((response) => {
      this.jsonObjAtt = response.data;
    });
  }
  //Guardar el nombre del atributo
  setName(name: any) {
    this.name = name.value;
  }

  //Guardar el JSON introducido por el usuario
  setJSONProd(JSONProd: any) {
    this.JSONProd = JSONProd.value;
  }

  //Guardar attributo especial seleccionado
  setSpecial(special: any) {
    this.special = special.value;
  }

  /*
   _____      _   _                
  / ____|    | | | |               
 | |  __  ___| |_| |_ ___ _ __ ___ 
 | | |_ |/ _ \ __| __/ _ \ '__/ __|
 | |__| |  __/ |_| ||  __/ |  \__ \
  \_____|\___|\__|\__\___|_|  |___/
                                                                    
*/

  //LLamar a lista de atributos especiales para este modelo
  getSpecials() {
    let apiUrl = 'model/getspecialattributes';
    this.idBot = localStorage.getItem('idBot');
    let json = {
      idBot: this.idBot,
      getFrom: 1, //1 para productos
    };
    axios
      .post(apiUrl, json)
      .then((response) => {
        this.specialAtt = [];

        for (let i = 0; i < response.data.attributes.length; i++) {
          this.specialAtt.push(response.data.attributes[i]);
        }
        this.special = this.specialAtt[0].specialId;
        this.cd.detectChanges();
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  //LLamar a la lista de atributos de este modelo
  getAttributes() {
    let apiUrl = 'model/getAttributes';
    this.idBot = localStorage.getItem('idBot');
    let json = {
      idBot: this.idBot,
      getFrom: 1, //1 para productos
    };
    axios
      .post(apiUrl, json)
      .then((response) => {
        this.attList = [];
        if (response.data.attributes.length > 0) {
          this.displayTitle = true;
        }
        this.setModel();
        for (let i = 0; i < response.data.attributes.length; i++) {
          this.attList.push(response.data.attributes[i]);
        }
        this.cd.detectChanges();
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  //LLamar a la lista de instancias de este modelo
  getCurrentInstances() {
    let apiUrl = 'instance/getAllInstances';
    this.idBot = localStorage.getItem('idBot');
    let json = {
      idBot: this.idBot,
      getsFrom: 1,
    };
    axios
      .post(apiUrl, json)
      .then((response) => {
        this.currentInstances = response.data;
        console.log(response.data);
        this.cd.detectChanges();
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
}
