import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root',
})
export class MetricasService {
  idBot: any;
  private data = [
    {
      name: 'Iteracciones',
      series: [
        {
          name: '2022-04-01T06:00:00.000Z',
          value: '5000',
        },
        {
          name: '2022-04-02T06:00:00.000Z',
          value: '2000',
        },
        {
          name: '2022-04-06T05:00:00.000Z',
          value: '2100',
        },
      ],
    },
  ];
  private XAxisLabel: any="Fecha";
  private YAxisLabel: any="Interacciones totales";
  private single = [  ];
  private nClientes = 10;
  private nProductos = 155;
  private nListas = 5;
  private interacciones: number = 150;
  private calif: number = 4.5;
  private ventasT: number = 0;
  private ventasH: number = 0;
  private Comments: any = [];

  constructor() {
    // this.setInteracciones();
    this.idBot = localStorage.getItem('idBot');
    this.setInteracciones();
    this.setComments();
    this.setSingle();
    this.setDatos();
  }

  //Cambiar la gráfica principal que se muestra
  cambiarGraf(opSelec: any) {
    console.log('Service', opSelec);
    let num = parseInt(opSelec, 10);
    if (num === 0) {
      this.setInteracciones();
      this.YAxisLabel = "Interacciones totales"
    } else if (num === 1) {
      this.setCalificaciones();
      this.YAxisLabel = "Calificaciones promedio"
    } else if (num === 2) {
      this.setVentas();
      this.YAxisLabel = "Ventas totales"
    }
  }
  /*
   _____      _   _                
  / ____|    | | | |               
 | (___   ___| |_| |_ ___ _ __ ___ 
  \___ \ / _ \ __| __/ _ \ '__/ __|
  ____) |  __/ |_| ||  __/ |  \__ \
 |_____/ \___|\__|\__\___|_|  |___/
                                                                    
*/
  //Set Interacciones del backend
  setInteracciones() {
    console.log('Interacciones');
    //botconfig/getInteractionsForGraph
    let apiUrl = 'botconfig/getInteractionsForGraph';
    let json = { idBot: this.idBot };
    axios.post(apiUrl, json).then((res) => {
      console.log(res.data);
      this.data = res.data;
    });
  }

  //Set Ventas del backend
  setVentas() {
    console.log('Ventas');
    let apiUrl = 'botconfig/getSalesForGraph';
    let json = { idBot: this.idBot };
    axios.post(apiUrl, json).then((res) => {
      console.log(res.data);
      this.data = res.data;
    });
  }

  //Set Calificaciones del backend
  setCalificaciones() {
    console.log('Calificaciones');
    //botconfig/getRatingsForGraph
    let apiUrl = 'botconfig/getRatingsForGraph';
    let json = { idBot: this.idBot };
    axios.post(apiUrl, json).then((res) => {
      console.log(res.data);
      this.data = res.data;
    });
  }
  //Set Comentarios del backend
  setComments() {
    let apiUrl = 'botconfig/getRatings';
    let json = { idBot: this.idBot };
    axios.post(apiUrl, json).then((res) => {
      console.log('Coments', res.data);
      let arr = [];
      for (let i = res.data.length - 1; i >= 0; i--) {
        arr.push(res.data[i]);
      }
      this.Comments = arr;
    });
  }
  //Set Calificaciones de la gráfica de pastel del backend
  setSingle() {
    //botconfig/getRatingsPie
    let apiUrl = 'botconfig/getRatingForPie';
    let json = { idBot: this.idBot };
    axios.post(apiUrl, json).then((res) => {
      console.log(res.data);
      this.single = res.data.series;
    });
  }

  //Set Datos varios del backend
  setDatos() {
    //botconfig/getBotData
    let apiUrl = 'botconfig/getGlobalBotData';
    let json = { idBot: this.idBot };
    axios.post(apiUrl, json).then((res) => {
      console.log(res.data);
      this.nClientes = res.data.totalCostumers;
      this.nProductos = res.data.totalProducts;
      this.nListas = 0;
      this.interacciones = res.data.totalInteractions;
      this.calif = res.data.ratingAverage;
      this.ventasT = res.data.totalSales;
      this.ventasH = res.data.salesToday;
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
  getData() {
    return this.data;
  }
  getXAxisLabel() {
    return this.XAxisLabel;
  }
  getYAxisLabel() {
    return this.YAxisLabel;
  }
  getSingle() {
    return this.single;
  }
  getComments() {
    return this.Comments;
  }
  getnClientes() {
    return this.nClientes;
  }
  getnProductos() {
    return this.nProductos;
  }
  getnListas() {
    return this.nListas;
  }
  getInteracciones() {
    return this.interacciones;
  }
  getCalif() {
    return this.calif;
  }
  getVentasT() {
    return this.ventasT;
  }
  getVentasH() {
    return this.ventasH;
  }
}
