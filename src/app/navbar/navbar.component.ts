import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { AppServiceService } from '../app-service.service';
import { MetricasComponent } from '../metricas/metricas.component';
declare var jQuery: any;
@Component({
  selector: 'default-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  idBot : any= "Ningún bot seleccionado";
  //navRoute = false;
  //navRoute = false;
  navRoute: boolean = false;

  constructor( private router: Router, public  appService: AppServiceService, private cd: ChangeDetectorRef) { 
    this.appService.navRoute.subscribe( value => {
      this.navRoute = value;
  });
  this.appService.navRoute.subscribe( str => {
    this.idBot = str;
});
  }
  


  ngOnInit(): void {
    //this.navRoute = false;
    /*this.router.events.subscribe((event) => {
      this.navRoute = this.appService.isLog;
    });*/
    document.body.classList.remove('nb-theme-default');
    if(localStorage.getItem('idBot')){
      this.appService.setIdBot(localStorage.getItem('idBot'));
      //this.idBot = localStorage.getItem('idBot');
      //jQuery('.text').css("color", "white");
      this.appService.setNavRoute(true);
  
      //this.
    }
    else{
     // this.idBot = "Ningún bot seleccionado";
      this.appService.setIdBot("Ningún bot seleccionado");
      //jQuery('.text').css("color", "rgb(223, 216, 15)");
      this.appService.setNavRoute(false);
   
      //this.appService.logOut();
    }
  }
  
  cerrarSesion(){
    localStorage.clear();
    jQuery(".botMenu").css("display","none");
    jQuery(".mainMenu").css("display","flex"); 

    axios.defaults.headers.common['Authorization'] = `Bearer ${" "}`;
    this.appService.setNavRoute(false) ;
    this.appService.setIdBot("Ningún bot seleccionado");
    /*this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>*/
    this.router.navigate(['/login']);
  }
  ngOnDestroy(): void {
   
  }

btnStatus(){
  return "disabled";
}
}
