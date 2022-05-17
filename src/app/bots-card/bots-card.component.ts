import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import { AppServiceService } from '../app-service.service';
import { AppComponent } from '../app.component';
declare var jQuery: any;

@Component({
  selector: 'app-bots-card',
  templateUrl: './bots-card.component.html',
  styleUrls: ['./bots-card.component.css']
})
export class BotsCardComponent implements OnInit {
@Input() id: any;
@Input() name: any;
@Input() desc: any;
@Input() key: any;
@Input() date: any;
@Input() loc1: any;
@Input() loc2: any;
currentUrl=window.location.host;
  constructor(private router: Router, public  appService: AppServiceService) { }


  ngOnInit(): void {
    jQuery('.botButton').ready(()=>{
      jQuery(`.botButton${this.id}`).on('click', ()=> {
        localStorage.setItem('idBot', this.id);
        this.appService.setNavRoute(true);
        this.appService.setIdBot(this.id);
        //window.location.href = '/metricas';
        console.log("?")
        this.router.navigate(['/metricas']);
    });
  });
  }


}
