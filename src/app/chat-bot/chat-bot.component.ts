import { ChangeDetectionStrategy, Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { chatBotService } from '../servicios/chatBot.service';
import {
  NbChatComponent,
  NbChatMessageComponent,
  NbChatFormComponent,
  NbChatCustomMessageDirective,
} from '@nebular/theme';
import axios from 'axios';
import { json } from 'd3';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
declare var jQuery: any;

export class Product {
  constructor(
    public name: any,
    public price: any,
    public selected: any,
    public category: any,
  ) {}
}
@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styles: [
    `
      ::ng-deep nb-layout-column {
        justify-content: center;
        display: flex;
      }
      nb-chat {
        width: 500px;
      }
      ::ng-deep .mat-checkbox-checked .mat-checkbox-background, 
.mat-checkbox-indeterminate .mat-checkbox-background {
  background-color: #3366ff !important;
}
    `,
  ],
})
export class ChatBotComponent {

  closeResult = '';
  public searchText: any;

  get messages() {
    return this.chatBotService.getMessages();
  }
  get jwt(){
    return this.chatBotService.getJwt();
  }
  get split(){
    return this.chatBotService.getSplit();
  }
  get products() {
    return this.chatBotService.sendProducts();
  }
  /*get selected() {
    return this.chatBotService.getSelectedProducts();
  }*/
  setProduct(id: any) {
    this.chatBotService.setProduct(id);
  }
  
  handleRealizarPedido(){
    let products = this.chatBotService.getSelectedProducts();
    let suma = 0;
    for(let i = 0; i < products.length; i++){
      suma += products[i].cantidad * products[i].price;
    }
    return suma;
  }
  setCantidad(id: any, cantidad: any) {
    this.chatBotService.setCantidad(id, cantidad);
  }
  constructor(
    protected chatBotService: chatBotService,
    private modalService: NgbModal,
    private dialogo: MatDialog,
  ) {
    jQuery('.mainMenu').hide();
    jQuery('.botMenu').hide();
  }
  handleCalif(event: any) {
    this.chatBotService.handleCalif(event);
  }
  handleProd(content: any) {
    //Mostrar Modal
    this.open(content);
  }
  sendMessage(event: any) {
    this.chatBotService.sendMessage(event);
    //Modificar color
  }

  ngOnInit() {
    jQuery('.input-full-width').attr('placeholder', 'Escribe aquí');
    jQuery(".padding-top").css("padding-top","0px !important")
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result: any) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason: any) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    jQuery('#SB').focus();
  }
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
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
  mostrarDialogo(): void {
    this.dialogo
      .open(DialogConfirmComponent, {
        data: `¿Desea realizar el pedido? 
        Monto Total: ${this.handleRealizarPedido().toFixed(2)}`,
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.chatBotService.handleHacerPedido();
        } 
      });
  }

}
