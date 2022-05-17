import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import axios from 'axios';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
declare var jQuery: any
@Component({
  selector: 'app-lista-bot',
  templateUrl: './lista-bot.component.html',
  styleUrls: ['./lista-bot.component.css'],
})

export class ListaBotComponent implements OnInit {
  name="";
  description="";
  urlKey="";
  closeResult = '';
  direccion1 = '';
  direccion2 = '';

  constructor(private modalService: NgbModal, private cd: ChangeDetectorRef, private router: Router) {  

  }
  Hero: any[] = [];
  displayTitle = false;
  ngOnInit(): void {
    document.body.classList.remove('nb-theme-default');
    if(localStorage.getItem('token') !== null){
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      jQuery(".mainMenu").hide();
      jQuery(".botMenu").css("display","flex"); 
    }

    let apiUrl = "user/getbots"
    axios.post(apiUrl).then((response)=>{
        this.Hero = [];
        if(response.data.bots.length > 0){
          this.displayTitle = true;
        }
        for (let i = 0; i < response.data.bots.length; i++) {
          this.Hero.push(response.data.bots[i]);
        }
        this.cd.detectChanges();
      console.log(response);
      return response;
    }).catch((error)=>{
      console.log(error);
      return error;
    }); 
  }
  
  setName(name: any){
    this.name = name.value;
  }
  setURLKEY(urlKey: any){
    this.urlKey = urlKey.value;
  }
  setDescripcion(descripcion: any){
    this.description = descripcion.value;
  }
  setDireccion1(direccion1: any){
    this.direccion1 = direccion1.value;
  }
  setDireccion2(direccion2: any){
    this.direccion2 = direccion2.value;
  }

  newBot(){
    let apiUrl = '/botconfig/createBot';

    let json = {
      "name":  this.name,
      "description": this.description,
      "urlKey": this.urlKey,
      "address1": this.direccion1,
      "address2": this.direccion2,
  }
    axios.post(apiUrl, json).then((response)=>{
      console.log(response);
      localStorage.setItem('idBot', response.data.idBot);
      //window.location.href = '/metricas';
      this.router.navigate(['/metricas']);
      return response;
    }).catch((error)=>{
      jQuery(".error").empty();
      jQuery(".error").append(error.response.data.error);
      jQuery(".error").fadeIn().delay(3200).fadeOut(300);
      return error;
    });
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


