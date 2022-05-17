import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PedidosService } from '../servicios/pedidos.service';
import axios from 'axios';
declare var jQuery: any
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})

export class PedidosComponent implements OnInit {
    pedidos: any = [];
  constructor( private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    document.body.classList.remove('nb-theme-default');
    if(localStorage.getItem('token') !== null){
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      jQuery(".mainMenu").hide();
      jQuery(".botMenu").css("display","flex"); 
    }
    if(localStorage.getItem('idBot') === null){
      jQuery('.botBtn').prop('disabled', true);
    }
    let json = {
      idBot: localStorage.getItem('idBot')
    }
    let apiUrl = "sales/getBotSales" 
    axios.post(apiUrl, json).then((response)=>{
      console.log(response.data)
        this.pedidos = [];      
        for (let i = 0; i <response.data.length ; i++){
          this.pedidos.push(response.data[i]);
        }
        this.cd.detectChanges();       
      return response;
    }).catch((error)=>{    
      console.log(error);
      return error;
    });
  }

}
