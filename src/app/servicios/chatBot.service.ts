import { Injectable } from '@angular/core';
import axios from 'axios';
import { local } from 'd3-selection';
declare var jQuery: any;
@Injectable({
  providedIn: 'root',
})
export class chatBotService {
  messages: any = [];
  isLogin: any = false;
  jwt: any = null;
  products: any = []; // Lista completa del cliente
  split: any = [];
  prodActual = '';
  isPedido = false;
  avatar: any ='https://c.tenor.com/8XhmtJUvS0cAAAAS/baile-del-despliegue-robot.gif';

  loadMessages() {}
  /* 
  User input
*/


  userReply(message: string) {
    console.log('User: ', message);
    this.messages.push({
      text: message,
      date: new Date(),
      reply: true,
      type: 'text',
      files: [],
      user: {
        name: 'Yo',
        avatar:
          this.avatar,
      },
      customMessageData: '',
    });
  }

  //Respuesta del Bot
  reply(message: any, fil: any, Intent: any, type: any) {
    console.log('Bot: ', message);
    console.log('Bot saw intent: ', Intent);
    localStorage.setItem('Intent', Intent);
    console.log('type: ', type);
    const files = type !== 'file' ? [] : fil;
    console.log(files);
    this.messages.push({
      text: message,
      date: new Date(),
      reply: false,
      type: type,
      files: files,
      user: {
        name: 'Bot',
        avatar:
          this.avatar,
      },
      customMessageData: ' ',
    });
  }
  /* 
  __  __                  _             _        __  __                      _           
 |  \/  |                (_)           | |      |  \/  |                    (_)          
 | \  / | __ _ _ __   ___ _  ___     __| | ___  | \  / | ___ _ __  ___  __ _ _  ___  ___ 
 | |\/| |/ _` | '_ \ / _ \ |/ _ \   / _` |/ _ \ | |\/| |/ _ \ '_ \/ __|/ _` | |/ _ \/ __|
 | |  | | (_| | | | |  __/ | (_) | | (_| |  __/ | |  | |  __/ | | \__ \ (_| | |  __/\__ \
 |_|  |_|\__,_|_| |_|\___| |\___/   \__,_|\___| |_|  |_|\___|_| |_|___/\__,_| |\___||___/
                        _/ |                                               _/ |          
                       |__/                                               |__/           
*/

  //Mensaje del usuario
  sendMessage(event: any) {
    console.log('intent', localStorage.getItem('Intent'));

    if (localStorage.getItem('Intent') === 'Calificar_Bot') {
      this.sendCalif(event.message);
    } else if (
      localStorage.getItem('Intent') === 'Levantar_Pedido' &&
      this.isLogin
    ) {
      console.log('Entro en isLogin de Levantar pedido');
      this.sendLogin(event.message);
    } else if (
      localStorage.getItem('Intent') === 'Ver_Pedidos' &&
      this.isLogin
    ) {
      console.log('Entro en isLogin de Ver pedido');
      this.sendLogin(event.message);
    } else {
      const files = !event.files
        ? []
        : event.files.map((file: any) => {
            return {
              url: file.src,
              type: file.type,
              icon: 'file-text-outline',
            };
          });

      this.userReply(event.message);
      console.log('intEstado Libre: ', localStorage.getItem('Intent'));
      let json = {
        messageUser: event.message,
        sessionId: localStorage.getItem('sessionIdBot'),
        pastIntent: localStorage.getItem('Intent'),
        botSlug: localStorage.getItem('botSlug'),
        jwt:
          localStorage.getItem('jwt') === null
            ? ''
            : localStorage.getItem('jwt'),
      };
      console.log(json);
      axios
        .post('watson/chat', json)
        .then((res) => {
          console.log(res.data);
          console.log(res);
          let fil = [];
          if (res.data.type === 'file') {
            fil = res.data.file;
          }
          if (res.data.pastIntent === 'Calificar_Bot') {
            this.reply("Seleccione un puntaje", [], res.data.pastIntent, 'button');
          } else if (res.data.pastIntent === 'Levantar_Pedido') {
            console.log('res.data.req', res.data);
            if (res.data.requieresLogin) {
              this.reply(res.data.message, fil, res.data.pastIntent, 'text');
              this.isLogin = true;
            } else {
              this.products = res.data.productos;
              this.orderBy(this.products);
              console.log('Productos Seteados con JWT Aceptado');        
              this.reply(res.data.message, fil, 'welcome', 'Lista Prod');
              this.isPedido = true;
              localStorage.setItem('Intent', 'welcome');
            }
          } else if (res.data.pastIntent === 'Ver_Pedidos') {
            console.log('res.data.req', res.data.requieresLogin);
            if (res.data.requieresLogin) {
              this.reply(res.data.message, fil, res.data.pastIntent, 'text');
              this.isLogin = true;
            } else {
              this.reply(res.data.message, res.data.files, 'welcome', 'file');
            }
          }     
          else if (res.data.pastIntent === 'Modificar_Cantidad') { this.handleCambiarCantidad(); }

          else if (res.data.pastIntent === 'Mostrar_Subtotal') { this.mostrarSubtotal();}

          //else if(res.data.pastIntent ==="Enviar_Pedido"){this.enviarPedido();}

          else {
            this.reply(res.data.message, fil, res.data.pastIntent, 'text'); 
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }

  //Enviar mensajes al front
  getMessages() {
    return this.messages;
  }

  //----------------------------------------------------------------------------------

  /*

  _                 _       
 | |               (_)      
 | |     ___   __ _ _ _ __  
 | |    / _ \ / _` | | '_ \ 
 | |___| (_) | (_| | | | | |
 |______\___/ \__, |_|_| |_|
               __/ |        
              |___/         

*/
  sendLogin(message: string) {
    this.userReply(message);

    let json = {
      messageUser: '',
      sessionId: localStorage.getItem('sessionIdBot'),
      pastIntent: localStorage.getItem('Intent'),
      botSlug: localStorage.getItem('botSlug'),
      jwt: '',
      userId: message,
      isLogin: true,
    };
    axios
      .post('watson/chat', json)
      .then((res) => {
        let fil = [];
        if (res.data.type === 'file') {
          fil = res.data.file;
        }
        console.log(res.data);
        // "No pudimos encontrar ese número de usuario -> No login instance welcome"
        if (res.data.pastIntent === 'trash') {

          this.isLogin = false;
          this.reply(res.data.message, fil, 'welcome', 'text');
          return;
        } else if (res.data.pastIntent === 'Ver_Pedidos') {
          this.jwt = res.data.jwt;
          console.log('JWT', res.data);
          localStorage.setItem('jwt', res.data.jwt);
          this.isLogin = false; //? -----------------------------------------------------------------------------------------------------------------------------------------
          console.log(res.data);
          this.reply(res.data.message, res.data.files, 'welcome', 'file');
        } 
        else if (res.data.pastIntent === 'Levantar_Pedido') {
          console.log('JWT', res.data);
          localStorage.setItem('jwt', res.data.jwt);
          this.jwt = res.data.jwt;
          this.products = res.data.productos;
          this.orderBy(this.products);
          this.reply(res.data.message, fil, 'welcome', 'Lista Prod');
          this.isPedido = true;
          this.isLogin = false; //? -----------------------------------------------------------------------------------------------------------------------------------------
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getJwt() {
    return this.jwt;
  }

  //----------------------------------------------------------------------------------

  /*

  _____       _      _       _ _               _   __              _      _   ____        _   
 |_   _|     (_)    (_)     | (_)             (_) /_/             | |    | | |  _ \      | |  
   | |  _ __  _  ___ _  __ _| |_ ______ _  ___ _  ___  _ __     __| | ___| | | |_) | ___ | |_ 
   | | | '_ \| |/ __| |/ _` | | |_  / _` |/ __| |/ _ \| '_ \   / _` |/ _ \ | |  _ < / _ \| __|
  _| |_| | | | | (__| | (_| | | |/ / (_| | (__| | (_) | | | | | (_| |  __/ | | |_) | (_) | |_ 
 |_____|_| |_|_|\___|_|\__,_|_|_/___\__,_|\___|_|\___/|_| |_|  \__,_|\___|_| |____/ \___/ \__|
                                                                                              
                                                                                              
*/
  botInit() {
    let path = window.location.pathname;
    let id = path.split('/')[2];
    let json = {
      botSlug: id,
    };
    localStorage.setItem('botSlug', id);
    axios
      .post('watson/startChat', json)
      .then((res) => {
        console.log(res.data);
        console.log(res.data.message);
        const files =
          res.data.type != 'file'
            ? []
            : res.data.file.map((file: any) => {
                return {
                  url: file.src,
                  type: file.type,
                  icon: 'file-text-outline',
                };
              });
        let text = res.data.message;
        let msg = {
          text: text,
          date: new Date(),
          reply: false,
          type: files.length ? 'file' : 'text',
          files: files,
          user: {
            name: 'Bot',
            avatar:
              'https://c.tenor.com/8XhmtJUvS0cAAAAS/baile-del-despliegue-robot.gif',
          },
          customMessageData: 'Califica este bot',
        };
        this.messages.push(msg);
        //SessionID
        localStorage.setItem('sessionIdBot', res.data.sessionId);
        localStorage.setItem('Intent', res.data.pastIntent);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //----------------------------------------------------------------------------------

  /*
   _____      _ _  __ _                  ____        _   
  / ____|    | (_)/ _(_)                |  _ \      | |  
 | |     __ _| |_| |_ _  ___ __ _ _ __  | |_) | ___ | |_ 
 | |    / _` | | |  _| |/ __/ _` | '__| |  _ < / _ \| __|
 | |___| (_| | | | | | | (_| (_| | |    | |_) | (_) | |_ 
  \_____\__,_|_|_|_| |_|\___\__,_|_|    |____/ \___/ \__|      

*/

  //Acción de calificar el bot
  handleCalif(event: any) {
    localStorage.setItem('calificacion', event);
    let inte = localStorage.getItem('Intent');
    this.reply('Deje un comentario de su experiencia', [], inte, 'text');
  }

  //Envió de la calificación a la Base de datos
  sendCalif(message: any) {
    this.userReply(message);
    console.log("el comentario", message);
    let json = {
      messageUser: '',
      rating: localStorage.getItem('calificacion'),
      sessionId: localStorage.getItem('sessionIdBot'),
      pastIntent: localStorage.getItem('Intent'),
      botSlug: localStorage.getItem('botSlug'),
      comment: message,
    };

    axios
      .post('watson/chat', json)
      .then((res) => {
        let fil = [];
        if (res.data.type === 'file') {
          fil = res.data.file;
        }
        console.log(res.data);
        if(res.data.message === 'Gracias por tu calificación'){
          this.reply(res.data.message, fil, 'welcome', 'text'); 
        }
        else if(res.data.message === 'Tienes que seleccionar un número para calificarme'){
          this.reply(res.data.message, fil, 'Calificar_Bot', 'button');   
        }

      })
      .catch((err) => {
        console.log(err);
      });
      localStorage.removeItem('calificacion');
  }
  //----------------------------------------------------------------------------------

  /*
  _____            _ _                                              _ _     _       
 |  __ \          | (_)                                            | (_)   | |      
 | |__) |___  __ _| |_ ______ _ _ __   _   _ _ __    _ __   ___  __| |_  __| | ___  
 |  _  // _ \/ _` | | |_  / _` | '__| | | | | '_ \  | '_ \ / _ \/ _` | |/ _` |/ _ \ 
 | | \ \  __/ (_| | | |/ / (_| | |    | |_| | | | | | |_) |  __/ (_| | | (_| | (_) |
 |_|  \_\___|\__,_|_|_/___\__,_|_|     \__,_|_| |_| | .__/ \___|\__,_|_|\__,_|\___/ 
                                                    | |                             
                                                    |_|                             
*/
  //Comenzar un pedido
  startOrder() {}
  //Ordenar productos por categoría
  orderBy(products: any[]) {
    let productsByCategory: any[] = [];
    let categoires: any[] = [];
    products.forEach((product: any) => {
      if (!categoires.includes(product.category)) {
        categoires.push(product.category);
      }
    });
    products.forEach((product: any) => {
      if (!productsByCategory[categoires.indexOf(product.category)]) {
        productsByCategory[categoires.indexOf(product.category)] = [];
      }
      productsByCategory[categoires.indexOf(product.category)].push(product);
    });
    console.log('productsByCategory');
    console.log(productsByCategory);
    this.split = productsByCategory;
  }
  getSplit() {
    return this.split;
  }

  //Enviar productos al front
  sendProducts() {
    return this.products;
  }
  setProduct(id: any) {
    let product = this.products.find((product: any) => product.id === id);
    console.log(product.selected, !product.selected);
    product.selected = !product.selected;
    console.log(product);
  }
  setCantidad(id: any, cantidad: any) {
    let product = this.products.find(
      (product: any) => product.instanceId === id
    );
    product.cantidad = cantidad.value;
    console.log(product.instanceId + ' ' + product.cantidad);
  }
  clearCarrito() {
    this.products.forEach((product: any) => {
      product.selected = false;
      product.cantidad = 0;
    });
    this.isPedido = false;
  }

  getSelectedProducts() {
    let products: any[] = [];
    this.products.forEach((product: any) => {
      if (product.selected && product.cantidad > 0) {
        products.push(product);
      }
    });
    return products;
  }
  //Acción de realizar un pedido
  handleHacerPedido() {
   // if(localStorage.getItem('pastIntent') !== 'Enviar_Pedido'){
      this.userReply('Hacer pedido');
   // }
   let prod = this.getSelectedProducts();
   if(prod.length > 0){
    let json = {
      sessionId: localStorage.getItem('sessionIdBot'),
      pastIntent: 'Enviar_Pedido',
      botSlug: localStorage.getItem('botSlug'),
      jwt: localStorage.getItem('jwt'),
      products: prod,
    };
    console.log(json);
    console.log('Voy por el axios');
    axios
      .post('watson/chat', json)
      .then((res) => {
        console.log('Res login');
        console.log(res.data);
        this.sendPedido(res.data.files);
      })
      .catch((err) => {
        console.log(err);
      });
   }else{
    this.reply('No hay productos seleccionados', [], 'welcome', 'text');
   }

  }
  sendPedido(files: any[]) {
    //-> set PDF
    const F = files.map((file: any) => {
      return {
        url: file.url,
        type: file.type,
        icon: 'file-text-outline',
      };
    });
    this.clearCarrito(); //-------------------------------------------------------------------
    localStorage.setItem('pastIntent', 'welcome');
    //TODO: llamar a calif
    //this.reply("Porfavor califique el bot seleccionando un puntaje", [], "Calificar_Bot", 'button');
    this.reply('Archivo del pedido', F, 'welcome', 'file');
  }
  //-----------------------------------------------------------------------


  /*


  ______                _                             _                       _ _     _       
 |  ____|              (_)                           | |                     | (_)   | |      
 | |__ _   _ _ __   ___ _  ___  _ __   ___  ___    __| | ___   _ __   ___  __| |_  __| | ___  
 |  __| | | | '_ \ / __| |/ _ \| '_ \ / _ \/ __|  / _` |/ _ \ | '_ \ / _ \/ _` | |/ _` |/ _ \ 
 | |  | |_| | | | | (__| | (_) | | | |  __/\__ \ | (_| |  __/ | |_) |  __/ (_| | | (_| | (_) |
 |_|   \__,_|_| |_|\___|_|\___/|_| |_|\___||___/  \__,_|\___| | .__/ \___|\__,_|_|\__,_|\___/ 
                                                              | |                             
                                                              |_|                             
                                          
*/

  //Cambiar cantidad de productos
  handleCambiarCantidad() {
    if (this.isPedido) {
      this.reply(
        'También puede modificar los productos desde el carrito, en la parte superior de la pantalla',
        [],
        'welcome',
        'Lista Prod'
      );
    } else {
      this.reply('Primero debes comenzar un pedido', [], 'welcome', 'text');
    }
  }

  //Mostrar subtotal
  mostrarSubtotal() {
    let subtotal = 0;
    if (this.isPedido) {
      let prod = this.getSelectedProducts();
      if(prod.length > 0){
        prod.forEach((product: any) => {
          subtotal += product.cantidad * product.price;
        });
        this.reply(`Subtotal: ${subtotal.toFixed(2)}`, [], 'welcome', 'text');
      }
      else{
        this.reply('No hay productos seleccionados', [], 'welcome', 'text');
      }
    } else {
      this.reply('Primero debes comenzar un pedido', [], 'welcome', 'text');
    }
  }
  /*enviarPedido(){
    if(this.isPedido){
      this.handleHacerPedido();
    }
    else{
      this.reply('Primero debes comenzar un pedido', [], 'welcome', 'text');
    }
  }*/
  
  //---------------------------------------------------------------------------
  constructor() {
    // this.setInteracciones();
    this.botInit();
    //localStorage.clear();
    localStorage.removeItem('calificacion');
    localStorage.setItem('jwt', '');
  }
}

//----CSS----
//TODO: float el numero en la lista de prod

//TODO: Cambios al CSS chat

//TODO: No hay acción cuando termina una sesión desde watson
