import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
declare var jQuery: any;
import { PreciosServiceService } from '../servicios/precios-service.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css'],
})
export class PreciosComponent implements OnInit {
  idBot: any; //ID del bot actual
  idList: any;

  clientesArr : any
  ProdArray : any
  prodJSONExample = {
    "id": 10,
    "precio": 20
  }
  cliJSONExample = {
    "id": 10,
    
  }
  constructor(
    private modalService: NgbModal,
    private pService: PreciosServiceService,
    private cd: ChangeDetectorRef
  ) {}

  get JSONPrecios() {
    return this.pService.getPreciosJSON();
  }
  get JSONClientes() {
    return this.pService.getClientesJSON();
  }
  get preciosLis() {
    //CLientes asociados a esta lista
    return this.pService.getPrecios();
  }
  get clientesLis() {
    //Productos y precios en esta lista
    return this.pService.getClientes();
  }

  ngOnInit(): void {
    this.idBot = localStorage.getItem('idBot');
    this.idList = localStorage.getItem('idList');
    console.log("idList: " + localStorage.getItem('idList'));
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
  }

  //---Subir el modelo JSON---
  subirJsonClientes() {
    this.pService.subirClientes(this.idBot);
   
  }

  subirJsonPrecios() {
    this.pService.subirPrecios(this.idBot);
    
  }

  //---Funciones set y get---
  //Guardar el JSON introducido por el usuario
  setJSONPre(MyJSON: any) {
    this.pService.setJSONPre(MyJSON);
  }
  setJSONCli(MyJSON: any) {
    this.pService.setJSONCli(MyJSON);
  }

  deleteProducto(idProducto: any){
    this.pService.deleteProducto(this.idList, idProducto);
  }
  deleteCliente(idCliente: any){
    this.pService.deleteCliente(this.idList, idCliente);
  }
}
