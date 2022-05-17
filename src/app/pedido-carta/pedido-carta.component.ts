import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-pedido-carta',
  templateUrl: './pedido-carta.component.html',
  styleUrls: ['./pedido-carta.component.css']
})
export class PedidoCartaComponent implements OnInit {
  @Input() idPedido: any;
  @Input() idBot: any;
  @Input() idCustomer: any;
  @Input() date: any;
  @Input() file: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    document.body.classList.remove('nb-theme-default');
    jQuery('.botCard').ready(() => {
      jQuery(`.botCard${this.idPedido}`).on('click', () => {
        let loc =  this.file;
        console.log('loc', loc);
        //window.location.href = loc;
        this.router.navigate([loc]);
      });
    });
  }

}
