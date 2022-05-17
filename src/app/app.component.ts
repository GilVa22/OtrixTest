import { Component } from '@angular/core';
import axios from 'axios';

//axios.defaults.baseURL ="http://localhost:4000";
axios.defaults.baseURL ="https://otrixapi.depatrix.com";
axios.defaults.headers.common["access-control-allow-origin"] = "*";
declare var jQuery: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Heroes';
  
  constructor() {
    let token = localStorage.getItem('token');
    if(token){
      jQuery(".mainMenu").hide();
      jQuery(".botMenu").css("display","flex"); 
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
    }
  }
  ngOnInit() {

  }

}