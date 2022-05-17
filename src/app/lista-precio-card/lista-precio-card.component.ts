import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var jQuery: any;
@Component({
  selector: 'app-lista-precio-card',
  templateUrl: './lista-precio-card.component.html',
  styleUrls: ['./lista-precio-card.component.css'],
})
export class ListaPrecioCardComponent implements OnInit {
  @Input() id: any;
  @Input() name: any;
  @Input() desc: any;
  @Input() createdAt: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    document.body.classList.remove('nb-theme-default');
    jQuery('.botCard').ready(() => {
      jQuery(`.botCard${this.id}`).on('click', () => {
        localStorage.setItem('idList', this.id);
        
        let loc = '/precios/' + this.id;
        //window.location.href = loc;
        this.router.navigate([loc]);
      });
    });
  }
}
