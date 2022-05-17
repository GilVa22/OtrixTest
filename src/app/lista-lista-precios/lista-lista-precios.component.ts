import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
import { ListaPreciosService } from '../servicios/lista-precios.service';
declare var jQuery: any
@Component({
  selector: 'app-lista-lista-precios',
  templateUrl: './lista-lista-precios.component.html',
  styleUrls: ['./lista-lista-precios.component.css']
})
export class ListaListaPreciosComponent implements OnInit {
  closeResult!: string;
  
  constructor(private listaService: ListaPreciosService, private modalService: NgbModal) { }
  idBot: any;
  displayTitle = false;
  name: any;
  desc: any;
  get listas() {
    return this.listaService.getListas();
  }
  setName(name: any) {
    this.name = name.value;
  }
  setDesc(desc: any) {
    this.desc = desc.value;
  }
  newList(){
    this.listaService.newLista(this.name, this.desc, this.idBot);
    //close modal
    this.modalService.dismissAll();
  }
  ngOnInit(): void {
    this.idBot = localStorage.getItem('idBot');
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

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    jQuery("#name").focus();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
