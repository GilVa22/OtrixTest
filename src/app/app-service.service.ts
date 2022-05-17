import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
declare var jQuery: any;

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  //authenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  constructor() {

   }

   public navRoute: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
   public idBot: BehaviorSubject<string | null> = new BehaviorSubject<string | null>("Ningún bot seleccionado");

   
    setNavRoute(value: boolean){
      console.log("setNavRoute", value);
      this.navRoute.next(value);
    }

    setIdBot(str: string | null){
      console.log("setIdBot", str);
      if(str !== "Ningún bot seleccionado"){
       // let id = localStorage.getItem('idBot'); 
        this.idBot.next(str);
        jQuery('.text').css("color", "white"); 
      }
      else{
        this.idBot.next("Ningún bot seleccionado");
        jQuery('.text').css("color", "rgb(223, 216, 15)");
      }
    }
  /* public authenticate() {
     this.authenticated$.next(true);
   }
 
   public deauthenticate() {
     this.authenticated$.next(false);
   }*/

  }